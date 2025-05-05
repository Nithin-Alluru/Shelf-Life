import { faCircleUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../types";
import '../assets/css/UserNetwork.css'

function UserNetwork({initialState, followers, following }:{initialState: string, followers:User[], following: User[]}) {
    const [selected, setSelected] = useState("Followers");

    return (
        <div>
            <ul id="network-nav">
                <li id={(selected == 'Followers')? "selected" : "unselected"} onClick={() => setSelected('Followers')}>Followers</li>
                <li id={(selected == 'Following')? "selected" : "unselected"} onClick={() => setSelected('Following')}>Following</li>
            </ul>
            <div>
                {(selected == 'Following') ?
                <ul id="following-list">
                {following.length > 0 ? 
                following.map((user: User, index:number) => (
                    <Link to={`/${user.username}/profile`}>
                    <li key={index}>
                        <p>
                            <FontAwesomeIcon icon={faUserCircle}/>
                            {user.username}
                        </p>
                    </li>
                </Link>
                ))
                : <p>You are not following anyone.</p>
                } 
            </ul> :
            
               (selected == 'Followers') ?
               
                <ul id="followers-list">
                    {followers.length > 0 ? 
                    followers.map((user: User, index:number) => (
                        <Link to={`/${user.username}/profile`}><li key={index}>
                            <p>
                                <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>{user.username}
                            </p>
                        </li></Link>
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