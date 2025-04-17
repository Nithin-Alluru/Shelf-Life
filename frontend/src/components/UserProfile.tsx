import { FormEvent, useContext, useEffect, useState } from "react";
import YearlyProgressChart from "./YearlyProgressChart";
import axios, { AxiosError } from "axios";
import { BookItem, ShelfItem, User } from "../types";
import MinBookBox from "./MinBookBox";
import { getBooksInShelf } from "../hooks/fetch";
import { useNavigate } from "react-router-dom";


function UserProfile({library}: {library: ShelfItem[]}) {
    const nav = useNavigate();
    const [goal, setGoal] = useState(0);
    const token = sessionStorage.getItem("access_token");
    const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}");
    console.log(library);
    const initialState:ShelfItem = {shelf_name: '', books_list: []}
    // console.log("Here", library.find((item) => item.shelf_name === "top-5"));

    // const top5 = (library.find((item) => item.shelf_name === 'top-5')) ? (library.map? get specific item): (initialState)
    // const {shelfBooks, loading, error} = getBooksInShelf('/shelf/top-5');
    // console.log(shelfBooks);
    // const top5 =  (library.length == 0 ) ? (initialState) : (library.find((item) => item.shelf_name === "top-5"));
    // const readList = (library.length == 0 ) ? (initialState) : (library.find((item) => item.shelf_name === "read-books"));
 
// not getting back actual item, only getting shelf name array
    


    let year = new Date().getFullYear();

    const submitGoal = async (event:FormEvent) => {
        event.preventDefault();

        try {
            axios.put('/goals', goal, {headers: {"Authorization":`Bearer ${token}`}}
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
            }
            ).catch((error) => {
                console.log(error);
                console.log(error.response.status);
            })
        } catch {(error: any) => console.log(error)}
    }
    
    
  

    return(
         <div>
            <div id="reader-goals">
                <form id="set-goals">
                     <label htmlFor="goal">My reading goal for {year}: </label>
                            <input type="number" id="goal" name="goal" min="0" max="100" value={goal} onChange={(e) => setGoal(parseInt(e.target.value ))}/>
                            <input type="submit" onClick={submitGoal} />
                    </form>
                <YearlyProgressChart props={[1, currentUser.goal]} /> 
            </div>
            
            {/* <div id="top-five-list">
                <h3>Favorites: </h3>
                {top5 && top5.books_list.length > 0 ? (
                    top5.books_list.map((book:BookItem, index) => (
                        <li key={index}>
                            <MinBookBox 
                                title={book.title} 
                                author={book.author} 
                                work_id={book.work_id} 
                                description={book.description} 
                                img_S={book.img_S} 
                                img_M={book.img_M} 
                                img_L={book.img_L}/>
                        </li>
                        
                    ))
                ): (<p>You don't have any favorites yet. </p>)}

            </div>
            <div id='read-list'>
                <h3>Books i've read:</h3>
                {readList && readList.books_list.length > 0 ? (
                    readList.books_list.map((book:BookItem, index) => (
                        <li key={index}>
                            <MinBookBox 
                                title={book.title} 
                                author={book.author} 
                                work_id={book.work_id} 
                                description={book.description} 
                                img_S={book.img_S} 
                                img_M={book.img_M} 
                                img_L={book.img_L}/>
                        </li>
                        
                    ))
                ): (<p>You haven't marked any books as read yet.</p>)} */}
            {/* </div> */}
              
    </div>
    );
}

export default UserProfile;