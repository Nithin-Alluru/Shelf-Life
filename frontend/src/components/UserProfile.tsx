import { FormEvent, useContext, useEffect, useState } from "react";
import '../assets/css/UserProfile.css'
import axios, { AxiosError } from "axios";
import {BookItem, ShelfItem, User } from "../types";
import { useNavigate } from "react-router-dom";
import YearlyProgressChart from "./YearlyProgressChart";
import LibraryShelfList from "./LibraryShelfList";




function UserProfile({library}: {library: ShelfItem[]}) {
    const nav = useNavigate();
    const [goal, setGoal] = useState(0);
    const token = sessionStorage.getItem("access_token");
    const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}");
    console.log(library)
    console.log(library.length)

    const initialState:ShelfItem = {shelf_name: '', book_list: []}
    

    const readList = (library.length === 0 ) ? (initialState) : (library.find((item) => item.shelf_name === "read-books"));
    // const topFive = (library.length == 0 ) ? (initialState) : (library.find((item:ShelfItem) => item.shelf_name == "top-five"));
    // console.log("TOP 5", topFive)
    // console.log(topFive ? (true) : (false))
 
// not getting back actual item, only getting shelf name array

    // get the user's reading goal and update graph on page reload
    useEffect(() => {
        axios.get(`${currentUser.username}/goals`
        ).then((response) => {
            console.log("GOAL ", response.data);
            response.data === -1 ? setGoal(0) : setGoal(response.data);
    }).catch((error) => console.log(error));

    }, [])

    let year = new Date().getFullYear();

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
         <div>
                <YearlyProgressChart progress={1} goal={goal} />
                <form id="set-goals">
                     <label htmlFor="goal">My reading goal for {year}: </label>
                            <input type="number" id="goal" name="goal" min="0" max="100" value={goal} onChange={(e) => setGoal(parseInt(e.target.value ))}/>
                            <input type="submit" onClick={submitGoal} />
                </form>  
                {/* <LibraryShelfList shelvesList={(topFive ? ([topFive]) : ([]))}/> */}
    </div>
    );
}

export default UserProfile;