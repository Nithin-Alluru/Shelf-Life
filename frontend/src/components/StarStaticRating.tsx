import Star from "./StarStatic";

const StarRating = ({rating} :{rating: number}) => {
    const maxStars = 5;
    const starsArray = Array.from({ length: maxStars }, (_, index) => index < rating);

    return(
        <div id='star-rating'>
            {starsArray.map((filled, index) => (
            <Star key={index} filled={filled} />))}
        </div>
    );
};

export default StarRating;