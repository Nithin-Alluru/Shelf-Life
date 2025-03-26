import { BookItem } from "../types";
import { Link } from "react-router-dom";
import '../assets/css/BookListCard.css'
import '../assets/css/global.css'
import { useEffect } from "react"; // used for testing


function BookListCard(props:BookItem) {
    const preview = props.description.slice(0, 150); //shorten description to fit into book container

    useEffect (() => console.log(props))


    return(
        <div id="category-book-box">
                <div id="book-cover-background">
                    <Link id="image-link" to={`/books/${props.work_id}`}>
                        <img id="cover" src={props.img_M} height={'115px'} alt="Book cover image"/>
                    </Link>
                </div>
                <div id="book-info-container">
                    <div id='title-author'>
                        <Link id="title-link" to={`/books/${props.work_id}`}>
                            <h3>{props.title}</h3>
                        </Link>
                        <h4>by <Link id="author-link" to={`${props.author}`}>{props.author}</Link></h4>
                    </div>
                    <p>{preview} ...<Link id="description-link" to={`/books/${props.work_id}`} state={props}>See more</Link></p>
                </div>
        </div>
    );
}

export default BookListCard;