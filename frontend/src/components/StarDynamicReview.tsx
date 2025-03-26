import { useState } from "react";
import StarDynamic from "./StarDynamic";

const StarDynamicRating = () => {
    const maxStars = 5;
    const [rating, setRating] = useState(0)
    // const starsArray = Array.from({ length: maxStars }, (_, index) => index < rating);
    const handleClick = (index) => {
        setRating(index + 1);
      };

    return(
        <div id='star-rating'>
            {[...Array(5)].map((_, index) => (
            <StarDynamic key={index} filled={index < rating} onClick={() => handleClick(index)} />))}

            <p>{rating} out of 5 stars</p>
        </div>
    );
};

export default StarDynamicRating;