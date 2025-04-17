import { FormEvent, useContext, useState } from "react";
import { ListStore } from "../Contexts/CompetitionBookListContext";
import { BookItem, CompetitionBookListItem, User } from "../types";
import { Link, useNavigate } from "react-router-dom";
import BookListCard from "./BookListCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowLeftLong, faArrowRight, faArrowRightLong, faLessThan } from "@fortawesome/free-solid-svg-icons";
import { ListTypes } from "../Reducers/CompetitionBookListReducer";
import '../assets/css/CompetitionForm.css'
import axios from "../../axiosConfig";

function CompetitionForm() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const [message, setMessage] = useState("");

    
    const token = sessionStorage.getItem("access_token");
    const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}")

    if(!token || !currentUser.username) {
        navigate('/login')
    }

    const { compList, dispatch } = useContext(ListStore);
    const isEmpty = compList.length == 0


    const [compName, setCompName] = useState('');
    const [compDate, setCompDate] = useState('');

    const removeFromComp = (book:CompetitionBookListItem) => {
        dispatch({type:ListTypes.REMOVE, item:book, work_id: book.work_id})
    }


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

    
        if (!token || !currentUser.username ) {
          setMessage("Missing user or book info.");
          return;
        }
        const work_ids = compList.map((item) => item.work_id);
        console.log(work_ids)
        const compForm = {contest_name: compName, work_ids: work_ids, end_date: compDate, num_works: compList.length}
        console.log(compForm)
        try {
          const response = await axios.post(
            "/contest/create", compForm, 
            {
              headers: {
                "Authorization": `Bearer ${token}`, 
                "Content-Type": "application/json",
              },
            }
          );
          setMessage("Competition successfully created!");
          navigate(0); // Redirect after success
        } catch (err) {
          console.error(err);
          setMessage("Failed to create competition. Please try again later.");
        }
    }

    return(
        <main>
             
            <div id="competition-form">
                <button id="back-button" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeftLong} size={'xs'}/> Back</button>
                <form id="create-comp">
                    <h2>New Competition</h2>
                    <label htmlFor="comp-name">Competition Name: 
                    <input type="text" id="comp-name" onChange={(e) => setCompName(e.target.value)} required></input></label>
                    <label htmlFor="end-date" >Competition end date: 
                    <input type="date" id="end-date" name="end-date" onChange={(e) => setCompDate(e.target.value)} required/></label>
                    <div className="books-section">
                        <div id='header'>
                            <h3>Books <p>({compList.length}/10)</p></h3>
                            
                            {compList.length > 0 ? (<Link to={'/categories/fiction'}>Add books <FontAwesomeIcon icon={faArrowRightLong}/></Link>): <></>}
                        </div>
                         
                        
                        <ul id="book-list">
                        {compList.length > 0 ? (
                                 compList.map((item: CompetitionBookListItem, index) => (
                                <li className="book-box" key={index}>
                                    <div className="book-box" key={index}>
                                        <div id="book-info">
                                            <Link to={`/books/${item.book.work_id}`} state={item.book}>
                                            <img id="cover" src={item.book.img_L} alt={item.book.title}/>
                                                <div className="book-details">
                                                    <h3>{item.book.title}</h3>
                                                    <p>{item.book.author}</p>
                                                    </div>
                                            </Link>
                                        </div>
                                      
                                    <button className='primary remove' onClick={() => removeFromComp(item)}>Remove</button>
                                    </div>
                                </li>)) ) : (
                                    <div id="bottom-container">
                                        <p>You don't have any books in your competition yet. </p>
                                        <Link to={'/categories/fiction'}>Add books <FontAwesomeIcon icon={faArrowRightLong}/></Link>
                                    </div>
                                    
                               )} 
                                {compList.length != 0 ? (<button className="secondary">Clear Book List</button>) : <></>} 
                            </ul>
                        </div>
                        <button className='primary' type="submit" onClick={handleSubmit}>Create Competition</button>    

                </form>
              </div>
        </main>
    )
}

export default CompetitionForm;