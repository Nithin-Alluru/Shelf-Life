import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { BookItem, User } from "../types";
import { Bounce, toast } from "react-toastify";
import BookListCard from "./BookListCard";
import MinBookBox from "./MinBookBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

type work_ids= {
    work_id: string
}

function ShelfBookPage() {
    const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}");
    const {user, shelfname} = useParams();
    const nav = useNavigate();
    const [books, setBooks] = useState<BookItem[]>([]);

    const [shelfItems, setShelfItems] = useState<BookItem[]>([]);
    const [loading, setLoading] = useState(true); // add loading state
    const [error, setError] = useState(''); // handle errors gracefully
    const [hasError, setHasError] = useState(false);
    const token = sessionStorage.getItem("access_token");
    var bookid_list:string[] = [];
    var bookList:BookItem[] = [];

    const [edit, setEdit] = useState(false);

    const deleteShelfError = () => 
        toast.error("We're having trouble deleting your shelf. Please try again later", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });

            const RemoveBookError = (title:string) => 
                toast.error(`We're having trouble removing ${title} from your shelf. Please try again later.`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    });
    

    const successMessage = () => 
        toast.success(`Shelf ${shelfname} deleted successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });

            const removeBookSuccessMessage = () => 
                toast.success(`Book removed successfully`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    });


const findItem = ((array:BookItem[], work_id:string)=> array.find((item) => item.work_id == work_id));
    // get books in this shelf
    useEffect(() => {
        setLoading(true);
        setError('');

        axios.get(`/shelf/${user}/${shelfname}`, {
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
        })
        .then((response) => {
            const list:work_ids[]= response.data[0].books
            console.log(list.length)
            bookid_list = (list.flatMap((item:work_ids)=> item.work_id))
            console.log(bookid_list)
            console.log(bookid_list.length)

            // get book items in this shelf
            bookid_list.forEach((item) => {
                axios.get(`/book/${item}`)
                .then((response) => {
                    // don't display duplicates
                    if(!findItem(bookList, response.data.work_id)) {
                        bookList.push(response.data)
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setError('Failed to load liked books. Please try again later.');
                }).finally(() => {
                    if (bookList.length == bookid_list.length) {
                        setBooks(bookList);
                        
                    }
                    setLoading(false);
            })
        });
        })
        .catch((error) => {
            console.error("❌ Book Fetch Error:", error);
            setError("Error loading book data. Please try again later.");
        }).finally(() => {
    console.log("BOOK LIST: ", books);}
    );
    }, []);



    async function handleDelete() {
        if (shelfname === "Favorites" || "Books I've Read") {
            deleteShelfError();
            return;
        }

        setHasError(false);
        try {
            const response = await axios.delete(`/shelf/${shelfname}`, 
                {
                headers: {"Authorization": `Bearer ${token}`}
            });
            console.log(response.data);
            successMessage();
            nav(-1);
        }
        catch (error) {
            deleteShelfError();
            console.error("❌ Error Deleting Shelf:", error);
        }
    }

    async function handleRemove(book:BookItem) {
        try {
            console.log(token)
            const response = await axios.delete(`/shelf/${shelfname}/${book.work_id}`, {headers: {"Authorization": `Bearer ${token}`}}
            ).then((response) => {
                console.log(response.data);
            removeBookSuccessMessage();
            } )

        }
        catch (error) {
            RemoveBookError(book.title);
            console.error("❌ Error Deleting Book:", error);
        }
    };

    
    return(
        <main>
            <h2>{shelfname}</h2>
            {/* only the owner of this shelf can delete it*/}
            {user == currentUser.username ? ( 
                <span>
                    {shelfname !== "Favorites" &&  shelfname !== "read-books" ? (
                        <button className="delete" onClick={handleDelete}>Delete Shelf</button> 
                    ) : (<></>)}
                   
                   
                </span>
                ) : <></>}

            {loading ? (<p>Loading books...</p>) : (error) ? (<p style={{ color: "red" }}>{error}</p>) : 
                (<ul id="book-list-page">
                                {books.length > 0 ? (
                                    books.map((book: BookItem) => (
                                        <li>
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
                                        <button className="delete" onClick={() => handleRemove(book)}> Remove from Shelf</button>
                                        </li>
                                       
                                    ))
                                ) : (
                                    !loading && !error && <p>No books found.</p>
                                                    )}
                            </ul>)

                            }    
        </main>
    );
}


export default ShelfBookPage;