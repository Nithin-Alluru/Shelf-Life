import { Link, useNavigate } from "react-router-dom";
import { User } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const UserLoginStatus = () => {
    const token = sessionStorage.getItem('access_token');
    const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}");
    const nav = useNavigate();

    function logOut(){
        sessionStorage.removeItem('User');
        sessionStorage.removeItem("access_token");
        localStorage.removeItem("createComp");
        nav('/login');
    }
    
    return (
        <div id='user-status'>
            {(!token) ? 
                <div>
                    <button className='primary' onClick={() => nav('/login')}>Sign In</button>
                    <button className='secondary' onClick={() => nav('/register')}>Register</button>
                </div>
                : <div id='user-info'>
                    <Link to={`${currentUser.username}/profile`}><FontAwesomeIcon id='user-icon' icon={faUserCircle} size={'2xl'}/></Link>
                    <p>Welcome, {currentUser.first_name}</p>
                    <Link to={'/login'} onClick={logOut}>Logout</Link>
                </div>}
        </div>
        

    );
  };
  
  export default UserLoginStatus;