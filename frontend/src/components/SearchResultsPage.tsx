import { useEffect, useState } from "react";
import { BookItem, CategoryItem, CompetitionItem, Review, User } from "../types";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../../axiosConfig";
import BookListCard from "./BookListCard";
import ReviewCard from "./ReviewCard";
import UserCard from "./UserCard";
import CompetitionCard from "./CompetitionCard";


function SearchResultsPage() {
    const searchQueries: CategoryItem[] = [
            {query: "q", title: "Books"}, 
            {query: "reviews", title: "Reviews"},
            {query: "accounts", title: "Accounts"},
            {query: "contests", title: "Competitions"}
    ]

    const initialState:CategoryItem = searchQueries.find((item) => item.query == 'q') || {query: 'q', title: 'Books'}
    const [selected, setSelected] = useState(initialState);
    const [searchParams] = useSearchParams();   // Handle search query
    const searchTerm = searchParams.get("search") || "";
    const nav = useNavigate();
    searchTerm == "" ? nav(``) : ''; // go to book category page
    const [books, setBooks] = useState<BookItem[]>([]);
    const [competitions, setCompetitions] = useState<CompetitionItem[]>([])
    const [users, setUsers] = useState<User[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    

 

    useEffect(() => {
        setSearchQuery(initialState);
    }, [])

    function setSearchQuery(item:CategoryItem) {
        setLoading(true);
        setError('');
        console.log("QUERY: " ,selected.query);
        console.log("search term: ", searchTerm)

        axios.get(`/search?${selected.query}=${searchTerm}&limit=9`, {
            headers: {"Content-Type" : "application/json"}
        }).then((response) => {
            console.log(response.data);
            (item.title === 'Books') ? setBooks(response.data) : 
            (item.title === 'Reviews') ? setReviews(response.data) :
            (item.title === 'Accounts') ? setUsers(response.data) : setCompetitions(response.data)
        }).catch((error) => {
            console.error(error);
            setError("Failed to load search results. Please try again later.")
        }).finally(() => setLoading(false))
    }
 
    
        
    return(
    <main>
        <div id='profile-nav'>
        <ul>
            {searchQueries.map((item:CategoryItem) => <li key={item.query} id={(selected == item)? "selected" : "unselected"} 
            onClick={() => {
                setSelected(item);
                setSearchQuery(item)
            }}>{item.title}</li>)}
        </ul>
      </div>
            <div>
                {loading ? (<p>Loading... </p>) 
                : (error) ? (<p style={{ color: "red" }}>{error}</p>)
                : (
                <ul id='search-results-list'>
                    {(selected.query == 'search-books') ? (
                        books && books.length > 0 ? (
                            books.map((book:BookItem) => (
                                <BookListCard
                                    key={book.work_id}
                                    title={book.title}
                                    author={book.author}
                                    work_id={book.work_id}
                                    img_S={book.img_S}
                                    img_M={book.img_M}
                                    img_L={book.img_L}
                                    description={book.description}
                                    reading_Time={book.reading_Time}
                                />
                            ))
                        ) : ( !loading && !error && <p>No books found.</p> )
                    )
                    : (selected.query == 'search-reviews') ? (
                        reviews && reviews.length > 0 ? (
                            reviews.map((review:Review) => (
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
                        ) : ( !loading && !error && <p>No reviews found.</p> )
                    )
                    : (selected.query == 'accounts') ? (
                        users && users.length > 0 ? (
                            users.map((user: User) => (
                                <UserCard 
                                    username={user.username}
                                    first_name={user.first_name}
                                    last_name={user.last_name} goal={user.goal}                                />
                            ))
                        ) : (!loading && !error && <p>No users found.</p>)
                    ) 
                    : (selected.query == 'competitions') ? (
                        competitions && competitions.length > 0 ? (
                            competitions.map((competition:CompetitionItem) => (
                                <CompetitionCard/>
                            ))
                        ) : (
                            !loading && !error && <p>No competitions found.</p>
                                            )
                    )
                    :
                    <></>}
                </ul>
            )}
        </div>
    </main>       
    )
}

export default SearchResultsPage;