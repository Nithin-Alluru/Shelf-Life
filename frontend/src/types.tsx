import { JSX } from "react";

export interface BookItem {
    title: string;
    author: string;
    work_id: string;
    description: string;
    img_S : string;
    img_M : string,
    img_L: string,
    reading_Time?: number;
}

export interface Reviews {
    work_id: string;
    avg_rating: string;
    reviews_list: Review[];
}

export interface Review {
    review_id: string;
    work_id: string;
    username: string;
    rating: number;
    reviewText: string;
    liked: boolean;
}


//for creating reviews
export interface ReviewForm {
    rating: number, 
    reviewText: string, 
    liked: boolean
}
//getting status back from post request
export interface ReviewStatus {
    success: boolean, 
    review: Review
}

export const categories : string[] = [
    "Fiction", 
    "Poetry", 
    "Fantasy", 
    "History",
    "Science fiction", 
    "Programming"
]

export interface ContextProps {
    children: JSX.Element | JSX.Element[]
  }
