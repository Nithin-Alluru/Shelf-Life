import { faStar as filledStar} from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";

const StarDynamic = ({filled, onClick} : {filled:boolean, onClick:MouseEventHandler}) => {
    return(   
        <span onClick={onClick}>
            {filled ? <FontAwesomeIcon icon={filledStar} /> : <FontAwesomeIcon icon={emptyStar}/> }
        </span>);
};

export default StarDynamic;