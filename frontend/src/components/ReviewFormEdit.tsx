import { useLocation, useNavigate } from "react-router-dom";
import { BookItem, Review, User } from "../types";
import { FormEvent, useEffect, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as filledStar, faHeart as filledHeart} from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar, faHeart as emptyHeart} from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { toastConfig } from "../utils/toastConfig";
import { toast } from "react-toastify";


function ReviewFormEdit(review: Review) {
    const navigate = useNavigate();
    const book:BookItem = useLocation().state; // gets book data passed in url
    const [bookData, setBookData] = useState<BookItem>();
    
    const token = sessionStorage.getItem('access_token');
    const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}")

    const [rating, setRating] = useState(review.star_rating);
    const [ratingHover, setRatingHover] = useState(0);
    const [liked, setLiked] = useState(review.liked);
    const [likedHover, setLikedHover] = useState(false);
    const [reviewText, setReviewText] = useState(review.review_text);
    const [message, setMessage] = useState("");
    const successMessage = () => toast.success('Review edited successfully!', toastConfig);
    const errorMessage = (message:string) => toast.error(message, toastConfig);
    useEffect(() => {
        axios.get(`/book/${review.work_id}`).then((response) => {
            setBookData(response.data);
        });
    }, []);

    const handleSubmit = async (event: FormEvent) => {
      event.preventDefault();
      console.log(reviewText)
  
      if (!token || !currentUser.username ) {
        navigate('/login');
        return;
      }
      if (!rating ) {
        errorMessage('Error: Star Rating is required. Please provide a rating for this book and try again.');
        return;
      }
      if (!reviewText) {
        errorMessage('Error: Review text is required. Please provide your review for this book and try again.');
        return;
      }

      const updatedReview = {work_id: book.work_id, star_rating: rating, review_text: reviewText, liked: liked}
  
      try {
        const response = await axios.put(
          `/reviews/${review.review_id}`, updatedReview, 
          {
            headers: {
              "Authorization": `Bearer ${token}`, 
              "Content-Type": "application/json",
            },
          }
        );

        successMessage();
        // trigger page reload after success toast is displayed
        setTimeout(() => {
            navigate(0);
        }, 2000);

      } catch (err) {
        console.error(err);
        errorMessage('Oops! Something went wrong and we were not able to edit your review. Please try again later.');
      }
    };

    return(
        <div id="new-review-card">
                <div id='book-image-background'>
                    <img src={bookData?.img_M} alt="Book cover image" height={'170px'}/>
                </div>
                <div id='new-review-content'>
                    <div id='title-container'>
                        <h2>My Review for {bookData?.title}</h2>
                        <FontAwesomeIcon className="x" icon={faXmark} size={'lg'} onClick={() => navigate(0)}/>
                    </div>
                    
                    <form
                        className="review-form"
                        method="post"
                        onSubmit={handleSubmit}>
                            <div id='icon-input'>
                            <div className="star-rating">
                                <p>Rating: </p>
                                {[...Array(5)].map((star, index) => {
                                    const currentRating = index + 1;
                                    return (
                                        <label>
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={currentRating}
                                                onClick={() => setRating(currentRating)}
                                            />
                                            {currentRating <= (ratingHover || rating) ? 
                                            <FontAwesomeIcon 
                                            className="star"
                                            icon={filledStar} 
                                            size={'xl'}
                                            color={"var(--dark-accent-color)"}
                                            onMouseEnter={() => setRatingHover(currentRating)}
                                            onMouseLeave={() => setRatingHover(0)}/> 
                                            : <FontAwesomeIcon 
                                            className="star"
                                            icon={emptyStar} 
                                            size={'xl'}
                                            color={"var(--dark-accent-color)"}
                                            onMouseEnter={() => setRatingHover(currentRating)}
                                            onMouseLeave={() => setRatingHover(0)}/>}
                                        </label>
                                    );
                                })}
                                </div>
                            <div className="liked">
                                <div className="like-tooltip-container">
                                     <p>Liked: </p>
                                    <label>
                                        <input
                                            type="radio"
                                            name="liked"
                                            onClick={(e) => setLiked(!liked)}
                                        />
                                        {(liked || likedHover) ? 
                                        <FontAwesomeIcon 
                                            className="heart"
                                            icon={filledHeart} 
                                            size={'xl'}
                                            color={"var(--dark-accent-color)"}
                                            onMouseEnter={() => setLikedHover(true)}
                                            onMouseLeave={() => setLikedHover(false)}/> 
                                                : <FontAwesomeIcon 
                                                className="heart"
                                                icon={emptyHeart} 
                                                size={'xl'}
                                                color={"var(--dark-accent-color)"}
                                                onMouseEnter={() => setLikedHover(true)}
                                                onMouseLeave={() => setLikedHover(false)}/>}
                                    </label>
                                    <span className="tooltip-text">
                                        Indicte if you enjoyed this read by giving it a heart.
                                    </span>
                                </div>
                            </div>
                            </div>
                            <textarea name='inputText' placeholder="" value={reviewText} onChange={(e) => setReviewText(e.target.value)}></textarea>
                        <button className='primary'>Submit</button>
                    </form>
                {message && <p>{message}</p>}</div>
            </div>
    );
};

export default ReviewFormEdit;