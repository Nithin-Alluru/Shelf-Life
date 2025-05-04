import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "../types";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState } from "react";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import '../assets/css/Settings.css'


function Settings() {
    const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}")
    const token = sessionStorage.getItem("access_token")
    const nav = useNavigate();

    async function handleDelete() {
        try {
          await axios.delete('/users/delete', {
            headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json",
          }
          });
          sessionStorage.removeItem('User');
          sessionStorage.removeItem("access_token");
          localStorage.removeItem("CreatingComp");
          nav("/"); // Redirect to homepage after account deletion
        } catch (error) {
          console.error(error);
        }
      }
    
    

    return(
        <div id='settings-container'>
            <h2>Settings</h2>
            <div id="user">
            <FontAwesomeIcon id='user-icon' icon={faUserCircle} size={'xl'}/>
            <h3>{currentUser.username}</h3>
        </div>
          <button className="delete" onClick={handleDelete}>Delete My Account</button>      
        </div>
    );
}

export default Settings;