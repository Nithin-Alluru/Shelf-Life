import { Link, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { BookItem, User } from "../types";
import { Bounce, toast } from "react-toastify";
import MinBookBox from "./MinBookBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLessThan, faPen } from "@fortawesome/free-solid-svg-icons";
import '../assets/css/ShelfBookPage.css'
import LibraryShelfList from "./LibraryShelfList";
import useShelfBooks from "../hooks/useShelfBooks";


function ShelfBookPage() {

    const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}");
    const {user, shelfname} = useParams();
    const navigate = useNavigate();
    const token = sessionStorage.getItem("access_token");

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
        toast.success(`Successfully deleted bookshelf "${shelfname}" from your library.`, {
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

const {shelfBooksList, loadingBookshelf, bookshelfError} = useShelfBooks(user!, shelfname!);


    async function handleDelete() {

        if (shelfname == "Favorites" || shelfname == "Books I've Read") {
            deleteShelfError();
            console.log(shelfname)
            return;
        }

        try {
            const response = await axios.delete(`/shelf/${shelfname}`, 
                {
                headers: {"Authorization": `Bearer ${token}`}
            });
            console.log(response.data);
            successMessage();
            navigate(`/${user}/profile`);
        }
        catch (error) {
            deleteShelfError();
            console.error("❌ Error Deleting Shelf:", error);
        }
    }

    async function handleRemove(book:BookItem) {
        try {
            await axios.delete(`/shelf/${shelfname}/${book.work_id}`, {headers: {"Authorization": `Bearer ${token}`}}
            ).then((response) => {
                console.log(response.data);
            removeBookSuccessMessage();
            navigate(0);
            })

        }
        catch (error) {
            RemoveBookError(book.title);
            console.error("❌ Error Deleting Book:", error);
        }
    };

    return(
        <main>
            <div id="shelf-header-container">
                <button id="back-button" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faLessThan} size={'xs'}/> Back</button>
            {/* only the owner of this shelf can delete it*/}
            {user == currentUser.username ? ( 
                <span>
                    <h2>{shelfname}</h2>
                    {shelfname !== "Favorites" &&  shelfname !== "read-books" ? (
                            <button className="delete" onClick={handleDelete}>Delete Shelf</button> 
                    ) : (<h2><Link to={`/${user}/profile`} >{user}</Link>'s Shelf: {shelfname}</h2>)}
                </span>
                ) : <h2><Link to={`/${user}/profile`} >{user}</Link>'s Shelf: {shelfname}</h2>}
            </div>

            <div id="shelf-body-container">
                {loadingBookshelf ? (<p>Loading books...</p>) : (bookshelfError) ? (<p style={{ color: "red" }}>{bookshelfError}</p>) : 
                                        <ul className="shelf-book-list">
                                            {shelfBooksList.length !== 0 ?(
                                                shelfBooksList.map((book:BookItem) => 
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
                                                                    {user === currentUser.username ? ( <button className="delete" onClick={() => handleRemove(book)}>Remove from Shelf</button>) : (<></>)}
                                                        </li>  
                                                                ))
                                : (!loadingBookshelf && !bookshelfError && <p>There are no books in this shelf yet. <Link to={'/categories/fiction'}>Add books <FontAwesomeIcon icon={faArrowRight}/></Link></p>
                                                    )}

                                            </ul>
                                            }   
            </div>  
        </main>
    );
}


export default ShelfBookPage;