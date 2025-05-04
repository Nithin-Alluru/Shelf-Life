import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ListStore } from "../Contexts/CompetitionBookListContext";
import { ListTypes } from "../Reducers/CompetitionBookListReducer";
import { faPen, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../assets/css/CompStatus.css'


function CompStatus() {
    const nav = useNavigate();
    const { compList, dispatch } = useContext(ListStore);

    return(
        <div id="comp-status-container">
            <div id="comp-container-top">
                <h3>Create Competition: </h3>
                <div id='cancel-icon'>
                        <FontAwesomeIcon id="cancel" icon={faX} onClick={() => {
                        sessionStorage.removeItem("creatingComp");
                        nav('/competitions');
                    }}/>
                </div>
            </div>
            <div id="comp-container-data">
                 <p># Books Added: {compList.length} / 10</p>
                <Link to={'/competitions/create'} ><FontAwesomeIcon icon={faPen}/> Edit List</Link>
            </div>
            <div id="list-buttons">
                <button className="clear" onClick={() => dispatch({type:ListTypes.CLEAR})}>Clear List</button>
                <button className="secondary" onClick={() => nav('/competitions/create')}>I'm Finished Adding Books</button>
            </div>
           
           
        </div>
    ) 
}

export default CompStatus;