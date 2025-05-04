import { FormEvent, useEffect, useState } from "react";
import { ShelfName, User } from "../types";
import axios from "../../axiosConfig";
import { Link, useNavigate, useParams } from "react-router-dom";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../assets/css/AddBookToShelf.css'
import { Bounce, toast } from "react-toastify";



function AddBookToShelf() {
    const user:User = JSON.parse(sessionStorage.getItem('User') || "{}");
    const [shelves, setShelves] = useState<String[]>([]);
    const [loading, setLoading] = useState(true); // add loading state
    const [error, setError] = useState(''); // handle errors gracefully 
    const nav = useNavigate();

    const token = sessionStorage.getItem("access_token");
    const navigate = useNavigate();
    const {work_id} = useParams();
    const successMessage = () => 
        toast.success(`Successfully added book to your library on shelf ${selectedOption}`, {
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

    // get list of this users' bookshelves to display
    useEffect(() => {
        setLoading(true);
        setError('');
        console.log("param" , user);

        axios.get(`/shelves/${user.username}`)
        .then((response) => {
            var list:ShelfName[] = response.data
            const newlist = list.flatMap((item:ShelfName) => item.shelf_name);
            setShelves(newlist);
        }
        ).catch((error) => {
            console.error("❌ Shelves fetch error:", error);
            setError("Error loading shelf data. Please try again later.");
        }).finally(() => setLoading(false))
    }, []);


      const [selectedOption, setSelectedOption] = useState('');
 
      const handleChange = (event) => {
        setSelectedOption(event.target.value);
        setError(''); // Clear error on change
      };



    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log(selectedOption)
        
        if (!token) {
          nav('/login');
        }
    
        try {
          const response = await axios.post(`/shelf/${selectedOption}`, { work_id: work_id} , {
            headers: { "Content-Type": "application/json" ,  "Authorization": `Bearer ${token}`}
        }).then((response) => {
            console.log(response.data);
            successMessage();
            nav(0);
        })
        } catch (err) {
          console.error(err);
        }
      };

    

    

    return (<div>
        <FontAwesomeIcon className="x" icon={faXmark} color={"var(--secondary-font-color)"} size={'lg'} onClick={() => navigate(0)}/>
        <form id='add-book'
            onSubmit={handleSubmit}>
        <label htmlFor="shelves">Choose a shelf:</label>
            {loading ? (<p>Loading shelves...</p>) : (error) ? (<p style={{ color: "red" }}>{error}</p>) : 
                (<select name="shelves" id="select-shelf" onChange={handleChange}>
                                {shelves.length > 0 ? (
                                    shelves.map((item:String, index:number) => (
                                        <option key={index} value={item.valueOf()}>{item}</option>
                                    ))
                                ) : (
                                    <></>
                                )}
                </select>)}
                <input type="submit" value="Submit"/>
        </form>
    </div>);

}

export default AddBookToShelf;