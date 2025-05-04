import { BookItem } from "../types";
import { Link, RouterProviderProps } from "react-router-dom";
import '../assets/css/BookListCard.css'
import '../assets/css/global.css'
import '../assets/css/CompStatus.css'
import { useContext, useEffect, useState } from "react"; // used for testing
import { ListStore } from "../Contexts/CompetitionBookListContext";
import { ListTypes } from "../Reducers/CompetitionBookListReducer";
import Popup from "reactjs-popup";
import AddBookToShelf from "./AddBookToShelf";


function BookListCard(props:BookItem) {
    //shorten description to fit into book container
    // const preview = props.description.slice(0, 150);
    const { compList, dispatch } = useContext(ListStore);
    const compStatus = sessionStorage.getItem("creatingComp");

    const token = sessionStorage.getItem("access_token");

    const addToComp = () => {
        dispatch({type: ListTypes.ADD, item: props, work_id: props.work_id})
    }
    const removeFromComp = () => {
        dispatch({type:ListTypes.REMOVE, item:props, work_id: props.work_id})
    }

    const isInList = compList.find((item) => item.work_id === props.work_id)

    return(
        <div id="category-book-box">
                <div id="book-cover-background">
                    <Link id="image-link" to={`/books/${props.work_id}`} state={props}>
                        <img id="cover" src={props.img_M} height={'115px'} alt="Book cover image"/>
                    </Link>
                </div>
                <div id="book-info-container">
                    <div id='title-author'>
                        <Link id="title-link" to={`/books/${props.work_id}`} state={props}>
                            <h3>{props.title}</h3>
                        </Link>
                        <h4>by <Link id="author-link" to={`${props.author}`}>{props.author}</Link></h4>
                    </div>
                    <p>{props.description} ...<Link id="description-link" to={`/books/${props.work_id}`} state={props}>See more</Link></p>
                    {compStatus ? (isInList ? (<button className='clear' onClick={removeFromComp}>Remove from Competition</button>) : (<button className='primary list' onClick={addToComp}>Add to Competition</button>)
                    ) : (<></>)}
                </div>
        </div>
    );
}

export default BookListCard;