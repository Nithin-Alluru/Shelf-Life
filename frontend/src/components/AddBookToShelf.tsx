import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ShelfName, User } from "../types";
import axios from "../../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../assets/css/AddBookToShelf.css'
import { Bounce, toast } from "react-toastify";


// Gen. AI used to refactor the JavaScript in this  componet. 
// We asked it to help refactor the code to improve readability. 
function AddBookToShelf({ closeModal } : { closeModal: () => void }) {
    const user:User = JSON.parse(sessionStorage.getItem('User') || "{}");
    const token = sessionStorage.getItem("access_token");
    const navigate = useNavigate();
    const {work_id} = useParams(); // fetch book id number from URL

    const [shelves, setShelves] = useState<string[]>([]);
    const [error, setError] = useState<string>(''); // handle errors gracefully 
    
    const [selectedOption, setSelectedOption] = useState<string>('Favorite Books'); // selection option on form dropdown

    // user notification handling
    const toastConfig = {
        position: "top-left" as const,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark" as const,
        transition: Bounce,
    }

    const successMessage = () => toast.success(`Successfully added book to your library on shelf ${selectedOption}`, toastConfig);
    
    const addBookErrorMessage = () => toast.error(`Oops! We're having trouble adding books to your library right now. Please try again later.`, toastConfig);

        
    const loadShelvesErrorMessage = () => toast.error(`We're having trouble getting the shelves in your library. Please try again later.`, toastConfig);

    // get list of this users' bookshelves to display
    useEffect(() => {
        const fetchShelves = async () => {
            try {
                const response = await axios.get(`/shelf/${user.username}`);
                const list:ShelfName[] = response.data;
                const newList = list.map((item) => item.shelf_name);
                setShelves(newList);
            }
            catch (error) {
                console.error("❌ Error fetching shelves:", error);
                loadShelvesErrorMessage();
            }  
        };

        fetchShelves();

    }, [user.username]);


    // keep track  of form option selection changes
    const handleChange = (event:ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
        setError(''); // Clear error on change
    };


    // handle form submission
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log(selectedOption)
        
        if (!token) {
          navigate('/login');
          return;
        }
    
        try {
            const response = await axios.post(
                `/shelf/${selectedOption}`, 
                { work_id: work_id } , 
                {
                    headers: { 
                        "Content-Type": "application/json" ,  "Authorization": `Bearer ${token}`
                    },
                }
            );
            console.log(response.data);
            successMessage();
            // trigger page reload after success toast is displayed
            setTimeout(() => {
                closeModal();
            }, 2000);

        } catch (err) {
            addBookErrorMessage();
            console.error(`Error adding book to shelf ${selectedOption}`, error);
        } 
      };

    

    return (<div>
        <FontAwesomeIcon className="x" icon={faXmark} color={"var(--secondary-font-color)"} size={'lg'} onClick={() => navigate(0)}/>
        <form id='add-book'
            onSubmit={handleSubmit}>
        <label htmlFor="shelves">Which shelf would you like to add this book to?</label>
                <select name="shelves" id="select-shelf" onChange={handleChange}>
                                {shelves.length > 0 ? (
                                    shelves.map((item:String, index:number) => (
                                        <option key={index} value={item.valueOf()}>{item}</option>
                                    ))
                                ) : (
                                    <></>
                                )}
                </select>
                <input type="submit" value="Submit"/>
        </form>
    </div>
    );
}

export default AddBookToShelf;