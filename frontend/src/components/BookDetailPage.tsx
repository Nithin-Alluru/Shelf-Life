import { BookItem, Reviews } from "../types";
import ReviewCard from './ReviewCard';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan } from '@fortawesome/free-solid-svg-icons';
import { Review } from '../types';
import {  getReviewsForBook } from '../hooks/fetch';
import BookDetailCard from './BookDetailCard';

function BookDetailPage() {
    const book:BookItem = useLocation().state; // gets book data passed in url
    const navigate = useNavigate();
    // get list of reviews that have been written for this book
    const {reviewData, loading, error} = getReviewsForBook(`/books/${book.work_id}/reviews`);

    return (
    <main>
        <div>
            <button id="back-button" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faLessThan} size={'xs'}/> Back</button>
            {book ? (
                <BookDetailCard book={book} 
                    avgRating={(reviewData != undefined && reviewData.avg_rating != '-1') ? reviewData.avg_rating : 'n/a'} />
                        ) : (!loading && !error && <p>Error loading book data. Please try again later. </p>)}
        </div>
        <div>
            <h3>Reviews</h3>
            {loading && <p>Loading reviews...</p>} {/* Show loading state */}
            {error && <p style={{ color: "var(--error-color)" }}>{error}</p>} {/* Show error message */}  
            <ul id="review-list">
                {reviewData != undefined && reviewData.reviews_list.length > 0 ? (
                    reviewData.reviews_list.map((review: Review) => (
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
                ) : (
                    !loading && !error && <p>No reviews have been written for this title yet.</p>
                                    )}
            </ul>
        </div>
    </main>);
}
export default BookDetailPage;
