import { useParams, useSearchParams } from "react-router-dom";
import {BookItem} from '../types'
import CategoryBookBox from "./CategoryBookBox";
import '../assets/css/CategoryBookListPage.css'
import '../assets/css/global.css'
import { useFetch } from "../utils/fetch";


function BookListPage() {
    const {category} = useParams(); // Fetch category dynamically from URL
    const [searchParams] = useSearchParams();   // Handle search query
    const searchTerm = searchParams.get("search") || "";

    const queryParam = searchTerm ? `q=${searchTerm}` : `subject=${category || "fiction"}`;
    const {data, loading, error} = useFetch(`http://127.0.0.1:5000/search?${queryParam}&limit=9`);

    return(
        <main>
            <div id="page-header">
                <h2>{searchTerm ? `Search results for "${searchTerm}"` : `${category || "Fiction"} Books`}</h2>
            </div>

                        {loading && <p>Loading books...</p>} {/* Show loading state */}
                        {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error message */}    

            <ul id="book-list">
                {data.length > 0 ? (
                    data.map((book: BookItem) => (
                        <CategoryBookBox
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
            </ul>
        </main>
    );
}

export default BookListPage;
