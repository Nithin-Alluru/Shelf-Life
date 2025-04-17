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
    star_rating: number;
    review_text: string;
    liked: boolean;
}



//getting status back from post request
export interface ReviewStatus {
    success: boolean, 
    review: Review
}
export interface CategoryItem {
    query: string, 
    title: string
}

export const categories: CategoryItem[] = [
    {query: "fiction", title: "Fiction"}, 
    {query: "history", title: "History"}, 
    {query: "fantasy", title: "Fantasy"}, 
    {query: "science fiction", title: "Science Fiction"}, 
    {query: "programming", title: "Programming"}
]

export const searchQueries: CategoryItem[] = [
    {query: "books", title: "Books"}, 
    {query: "author", title: "Authors"},
    {query: "reviews", title: "Reviews"},
    {query: "accounts", title: "Accounts"},
    {query: "competitions", title: "Competitions"}
]



export interface ContextProps {
    children: JSX.Element | JSX.Element[]
  }


  export interface User {
    username: string,
    first_name: string,
    last_name: string, 
    goal: number
  }

  //this interface represents the items(books) in our shopping cart
export class CompetitionBookListItem {
    work_id:string;
    book: BookItem;
  
    constructor(book: BookItem) {
      this.work_id = book.work_id
      this.book = book
    }
}

export interface ShelfItem {
    shelf_name: string, 
    books_list: BookItem[]
}

export interface ShelfName {
    shelf_name: string
}

// need to be returned a list of these
export interface ContestItem {
    contest_name: string, 
    book_count: number, 
    end_date: string, 
    organizer: string
}


export interface ContestBookItem {
    constest_name: string, 
    work_id: string
}


export interface ContestParticipant {
    username: string, 
    completed_books: BookItem[]
}