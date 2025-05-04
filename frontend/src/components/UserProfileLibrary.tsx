import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../axiosConfig";


type ShelfName = {
    shelf_name: String
}
function UserProfileLibrary() {
    var {user} = useParams(); // get which user's profile is loaded
    const [shelves, setShelves] = useState<String[]>([]);
    const [loading, setLoading] = useState(true); // add loading state
    const [error, setError] = useState(''); // handle errors gracefully  

    // get list of this users' bookshelves to display
    useEffect(() => {
        setLoading(true);
        setError('');
        console.log("param" , user);

        axios.get(`/shelf/${user}`)
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


    return(
        <div>
            {loading ? (<p>Loading shelves...</p>) : (error) ? (<p style={{ color: "red" }}>{error}</p>) : 
                (<ul id="book-list-page">
                                {shelves.length > 0 ? (
                                    shelves.map((item:String) => (
                                      
                                        <Link to={`/${user}/library/${item}`}>{item}</Link>
                                    ))
                                ) : (
                                    !loading && !error && <p>No shelves found.</p>
                                )}
                </ul>)
            }    
        </div>
    );
}

export default UserProfileLibrary;