import { Link, useParams } from "react-router-dom";
import useShelfBooks from "../hooks/useShelfBooks";
import { BookItem } from "../types";
import MinBookBox from "./MinBookBox";
import '../assets/css/LibraryShelfList.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function LibraryShelfList({shelfName}:{shelfName:string}) {
    const {user} = useParams();
        // get the user's list of favorite books 
        const {shelfBooksList, loadingBookshelf, bookshelfError} = useShelfBooks(user!, shelfName);

    
    return (        
    <div className='library-shelf'>
        <div className="shelf-link-container">
            <Link to={`/${user}/library/${shelfName}`}>
                <h4>{shelfName.toUpperCase()}</h4>    
            </Link>
            <Link to={`/${user}/library/${shelfName}`} >View shelf <FontAwesomeIcon icon={faArrowRight} /></Link>
        </div>

        
            {loadingBookshelf && <p>Loading...</p>} {/* Show loading state */}
            {bookshelfError && <p style={{ color: "var(--error-color)" }}>{bookshelfError}</p>} {/* Show error message */}  

                <ul className="shelf-book-list">
                    {shelfBooksList.length !== 0 ?(
                        shelfBooksList.map((book:BookItem, index:number) => 
                            <li key={index}>
                                             <MinBookBox
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
                            </li>  
                                    ))
       : (!loadingBookshelf && !bookshelfError && <p>There are no books in this shelf yet.</p>
                           )}
   </ul>

   </div>);

}

export default LibraryShelfList;