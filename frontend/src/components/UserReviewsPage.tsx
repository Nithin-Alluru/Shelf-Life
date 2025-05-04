import { Link, useLocation } from "react-router-dom";
import { Review } from "../types";
import ReviewCard from "./ReviewCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import '../assets/css/UserReviewsPage.css'


function UserReviewsPage({reviewData, loading, error}:{reviewData: Review[], loading:boolean, error:string}) {

    const message:string = useLocation().state; 
    
    return(
        <div id='review-container'>
            {(message != '') ? 
          <div id='delete-msg'>{message}</div> : <div></div>}

        {loading && <p>Loading reviews...</p>} {/* Show loading state */}
        {error && <p style={{ color: "var(--error-color)" }}>{error}</p>} {/* Show error message */}  
        <ul id="review-list">
            {reviewData != undefined && reviewData.length > 0 ? (
                reviewData.map((review: Review) => (
                    <ReviewCard
                    key={review.review_id}
                        review_id={review.review_id}
                        work_id={review.work_id}
                        username={review.username}
                        star_rating={review.star_rating}
                        review_text={review.review_text}
                        liked={review.liked}
                    />
                ))
            ) : (!loading && !error && <p>No reviews yet. <Link id='reviews-cta' to={'/categories/fiction'}>Get started <FontAwesomeIcon icon={faArrowRight}/></Link></p>
                                )}
        </ul>
        </div>
    );
}

export default UserReviewsPage;