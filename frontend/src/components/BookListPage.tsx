import { useParams, useSearchParams } from "react-router-dom";
import {BookItem} from '../types'
import '../assets/css/BookListPage.css'
import '../assets/css/global.css'
import { getBooks } from "../hooks/fetch";
import BookListCard from "./BookListCard";



function BookListPage() { // not longer than 1000 characters
    const {category} = useParams(); // Fetch category dynamically from URL
    const [searchParams] = useSearchParams();   // Handle search query
    const searchTerm = searchParams.get("search") || "";

    const queryParam = searchTerm ? `q=${searchTerm}` : `subject=${category || "fiction"}`;
    const {data, loading, error} = getBooks(`/search?${queryParam}&limit=9`);

    return(
        <main>
            <div id="page-header">
                <h2>{searchTerm ? `Search results for "${searchTerm}"` : `${category || "Fiction"} Books`}</h2>
            </div>
            {loading ? (<p>Loading books...</p>) : (error) ? (<p style={{ color: "red" }}>{error}</p>) : 
                (<ul id="book-list-page">
                                {data.length > 0 ? (
                                    data.map((book: BookItem) => (
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
                                ) : (
                                    !loading && !error && <p>No books found.</p>
                                                    )}
                            </ul>)

                            }    
        </main>
    );
}

export default BookListPage;
