import { faStar as filledStar} from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StarStatic = ({filled} : {filled:boolean}) => {
    return(   
        <span>
            {filled ? <FontAwesomeIcon icon={filledStar} /> : <FontAwesomeIcon icon={emptyStar}/> }
        </span>);
};

export default StarStatic;