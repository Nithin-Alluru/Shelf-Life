import { faCircleUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../types";

function UserNetwork({initialState, followers, following }:{initialState: string, followers:User[], following: User[]}) {
    const [selected, setSelected] = useState(initialState);
    console.log
    console.log("followers" , followers)
    console.log("following" , following)



    return (
        <div>
            <ul>
                <li id={(selected == 'Followers')? "selected" : "unselected"} onClick={() => setSelected('Followers')}>Followers</li>
                <li id={(selected == 'Following')? "selected" : "unselected"} onClick={() => setSelected('Following')}>Following</li>
            </ul>
            <div>
                {(selected == 'Following') ?
                <ul>
                {following.length > 0 ? 
                following.map((user: User) => (
                    <li><Link to={`/${user.username}/profile`}><FontAwesomeIcon icon={faUserCircle}/>{user.username}</Link></li>
                ))
                : <p>You are not following anyone.</p>
                } 
            </ul> :
               (selected == 'Followers') ?
                <ul>
                    {followers.length > 0 ? 
                    followers.map((user: User) => (
                        <li key={user.username}><Link to={`/${user.username}/profile`}><FontAwesomeIcon icon={faUserCircle}/>{user.username}</Link></li>
                    ))
                    : <p>You have no followers.</p>
                    } 
                </ul>
                
                : <></> }
            </div>


        </div>
    );

}


export default UserNetwork;