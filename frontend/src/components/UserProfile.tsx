import { FormEvent, useEffect, useState } from "react";
import '../assets/css/UserProfile.css'

import { User } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import YearlyProgressChart from "./YearlyProgressChart";
import useShelfBooks from "../hooks/useShelfBooks";
import LibraryShelfList from "./LibraryShelfList";
import axios from "../../axiosConfig";



function UserProfile() {
    const nav = useNavigate();
    const [goal, setGoal] = useState(0);
    const token = sessionStorage.getItem("access_token");
    const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}");

    var {user} = useParams(); // get which user's profile is loaded
    let year = new Date().getFullYear();
    // get the user's list of favorite books 
    const {shelfBooksList:readBooksList, loadingBookshelf, bookshelfError} = useShelfBooks(user!, "Books I've Read");

    const isCurrentUserProfile = (user === currentUser.username);
    console.log(isCurrentUserProfile)
    let title = 'My';
    if (!isCurrentUserProfile) {
      title= user + "'s"
    };
    // get the user's reading goal and update graph on page reload
    useEffect(() => {
        axios.get(`${user}/goals`
        ).then((response) => {
            console.log("GOAL ", response.data);
            response.data === -1 ? setGoal(0) : setGoal(response.data);
    }).catch((error) => console.log(error));

    }, [])

    
    const submitGoal = async (event:FormEvent) => {
        event.preventDefault();

        try { axios.put(
            "/goals",
            goal ,
            {
                headers: {
                  "Authorization": `Bearer ${token}`, 
                  "Content-Type": "application/json",
                },
              }
          ).then((response) => {
                console.log(response.data.goal);
                setGoal(response.data.goal);
                
                const updatedUser:User = {
                    username: currentUser.username,
                    first_name: currentUser.first_name,
                    last_name: currentUser.last_name,
                    goal: response.data.goal
                }
                console.log(updatedUser)
                sessionStorage.setItem('User', JSON.stringify(updatedUser))
                setGoal(response.data.goal)
            }
            ).catch((error) => {
                console.log(error);
                console.log(error.response.status);
            }).finally(() => nav(0)); // trigger page reload to update header
        } catch {(error: any) => console.log(error)}
    }
    
    return(
         <span>
            <div id='goals'>
                <YearlyProgressChart progress={readBooksList.length} goal={goal} />
                {isCurrentUserProfile ? (                
                    <form id="set-goals">
                        <label htmlFor="goal">{title} reading goal for {year}: </label>
                            <input type="number" id="goal" name="goal" min="0" max="100" value={goal} onChange={(e) => setGoal(parseInt(e.target.value ))}/>
                            <input type="submit" onClick={submitGoal} />
                    </form>  
            ) :(<></>)}
            </div>
                
                <LibraryShelfList shelfName={"Favorite Books"}/>       
        </span>
    );
}

export default UserProfile;