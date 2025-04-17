import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ListStore } from "../Contexts/CompetitionBookListContext";
import { ListTypes } from "../Reducers/CompetitionBookListReducer";
import { faPen, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function CompStatus() {
    const nav = useNavigate();
    const { compList, dispatch } = useContext(ListStore);

    return(
        <div id="comp-status-container">
                <p># Books: {compList.length} / 10</p>
                <div id='cancel-icon'>
                        <FontAwesomeIcon id="cancel" icon={faX} onClick={() => {
                        sessionStorage.removeItem("creatingComp");
                        nav('/competitions');
                    }}/>
                </div>
            
            <p color="red"><FontAwesomeIcon icon={faPen}/> Edit</p>  
            <Link to={'/competitions/create'} color="red">Edit</Link>
            <button onClick={() => dispatch({type:ListTypes.CLEAR})}>Clear List</button>
        </div>
    ) 
}

export default CompStatus;