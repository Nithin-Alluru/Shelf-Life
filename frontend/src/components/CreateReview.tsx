import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BookItem, ReviewForm, ReviewStatus } from "../types";
import { faThumbsUp, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import Star from "./StarStatic";
import StarDynamic from "./StarDynamic";
import StarDynamicRating from "./StarDynamicReview";
import Popup from "reactjs-popup";


function CreateReview(props:BookItem) {
    const nav = useNavigate();
    const [formData, setFormData] = useState({rating: -1, reviewText: '', liked: null});

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleClick = (index) => {
      setRating(index + 1);
    };

    // client side form validation
    const[formError, setFormError] = useState("");
    const[formStatus, setFormStatus] = useState("");

    function validateForm() {
        if (formData.rating === -1 || formData.reviewText === "" || formData.liked === null) {
            setFormError("Star rating, review text, and liked values are required to create a review. Please try agian.");
            return false; 
        }
        else {return true;
        }
    }

    const submitReview = async (form:ReviewForm) => {
        const review = JSON.stringify({username: "", work_id: props.work_id, review_id: "", reviewForm : form});
        const reviewStatus:ReviewStatus = await axios.post('', review, 
            { headers : { "Content-Type" : "application/json" }})
            .then((response) => {return response.data})
            .catch((error) => console.log(error))

        console.log("Status:" , reviewStatus)
        return reviewStatus;
    }

    

    async function handleSubmit(event:FormEvent) {
        event.preventDefault();
        console.log("Review form submitted");
        const formIsValid = validateForm();
        if (!formIsValid) {
            setFormStatus("ERROR");
        }
        else {
            setFormStatus("PENDING");
            const review = await submitReview({
                rating : formData.rating, 
                reviewText : formData.reviewText, 
                liked: formData.liked
            })

            if (review) {
                setFormStatus("OK");
                nav(`/books/${props.work_id}`) // include state??
            }
            else {
                setFormStatus("ERROR POSTING REVIEW")
                console.log("Error posting review");
            }
        }
    }

    return(
        <div>
            <div id='book-cover-background'>
                <img src={props.img_M} alt="Book cover image" height={'100px'}/>
            </div>
            <div id='review-content'>
                <h3>My Review for {props.title}</h3>
                <FontAwesomeIcon icon={faXmark} onClick={() => nav(-1)}/>
                <form
                    className=""
                    onSubmit={() => handleSubmit}
                    method="post">
                        <div id='liked'>
                            <FontAwesomeIcon icon={faThumbsUp}/>
                        </div>
                        <div className="star-rating">
                            {/* {[...Array(5)].map((star, index) => {
                                index += 1;
                                return (
                                <button
                                    type="button"
                                    key={index}
                                    className={index <= (hover || rating) ? "on" : "off"}
                                    onClick={() => setRating(index)}
                                    onMouseEnter={() => setHover(index)}
                                    onMouseLeave={() => setHover(rating)}
                                >
                                    <span className="star"><StarDynami></span>
                                </button>
                                ); */}
                            {/* })} */}
                            </div>
                        <textarea placeholder=""></textarea>
                        <input type="submit" value="submit"/>
                </form>
            </div>
        </div>
    );
};

export default CreateReview;