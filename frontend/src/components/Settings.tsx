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
    const [open, setOpen] = useState(false);
    const closeSettingsModal = () => setOpen(false);
    const nav = useNavigate();

    async function handleDelete() {
        try {
          const response = await axios.delete('/users/delete', {
            headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json",
          }
          });
          console.log(response.data);
          sessionStorage.removeItem('User');
          sessionStorage.removeItem("access_token");
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
        {/* <Popup open={open} closeOnDocumentClick onClose={closeSettingsModal} modal>
            <div className="modal">
              <p id='error-message'>Are you sure you would like to delete your account? This cannot be undone. </p>
              <div id="confirmation-buttons">
                <button id='back' onClick={closeSettingsModal}>No, don't delete my account.</button>
                <button id='confirm' onClick={handleDelete}>Yes, I would like to delete my account.</button>
              </div>
              
            </div>
          </Popup> */}
        
            
        </div>
    );
}

export default Settings;