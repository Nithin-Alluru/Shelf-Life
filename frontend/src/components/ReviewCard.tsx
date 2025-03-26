import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BookItem, Review } from "../types";
import StarRating from "./StarStaticRating";
import '../assets/css/ReviewCard.css'
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

function ReviewCard(review:Review) {
    return( // ADD LIKED TODO
    <div className='container review'>
        <div id='review-content-top'>
            <div>
                <FontAwesomeIcon icon={faUserCircle}/>
                <h5>{review.username}</h5>
            </div>
            <StarRating rating={review.rating}/> {/*Whole number ratings only*/}
        </div>
        <p id='review-text'>
            {review.reviewText}
        </p>
    </div>
    );
}

export default ReviewCard;