import axios from "../../axiosConfig";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { faGear, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  getBooksInShelf, getGoal, getReviewsForUser } from "../hooks/fetch";
import UserLikesList from "./UserLikesList";
import '../assets/css/ReaderProfilePage.css'
import {  BookItem, ShelfItem, ShelfListItem, User } from "../types";
import UserNetwork from "./UserNetwork";
import Popup from "reactjs-popup";
import Settings from "./Settings";
import UserReviewsPage from "./UserReviewsPage";
import UserProfileCompetitionsSection from "./UserProfileCompetitionsSection";
import '../assets/css/Settings.css'
import UserProfile from "./UserProfile";
import YearlyProgressChart from "./YearlyProgressChart";
import UserLibrary from "./UserProfileLibrary";
import UserProfileLibrary from "./UserProfileLibrary";
import { Bounce, toast } from "react-toastify";

type ShelfName= {
  shelf_name:string
}
type work_ids= {
  work_id: string
}

function ReaderProfilePage() {

  var {user} = useParams(); // get which user's profile is loaded
  const [shelves, setShelves] = useState<String[]>([]);
  // const [loading, setLoading] = useState(true); // add loading state
  // const [error, setError] = useState(''); // handle errors gracefully  
// const findItem = ((array:BookItem[], work_id:string)=> array.find((item) => item.work_id == work_id));
//   // get list of this users' bookshelves to display
//   useEffect(() => {
//       setLoading(true);
//       setError('');
//       console.log("param" , user);

//       axios.get(`/shelves/${user}`)
//       .then((response) => {
//           var list:ShelfName[] = response.data
//           const newlist = list.flatMap((item:ShelfName) => item.shelf_name);
//           setShelves(newlist);

//           newlist.forEach((shelfnm)=> {
//               axios.get(`/shelf/${user}/${shelfnm}`, {
//                             headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
//                         })
//                         .then((response) => {
//                             const list:work_ids[]= response.data[0].books
//                             console.log(list.length)
//                             bookid_list = (list.flatMap((item:work_ids)=> item.work_id))
//                             console.log(bookid_list)
//                             console.log(bookid_list.length)

//                             // get book items in this shelf
//                             bookid_list.forEach((item) => {
//                                 axios.get(`/book/${item}`)
//                                 .then((response) => {
//                                     // don't display duplicates
//                                     if(!findItem(bookList, response.data.work_id)) {
//                                         bookList.push(response.data)
//                                     }
//                                 })
//                                 .catch((error) => {
//                                     console.log(error);
//                                     setError('Failed to load liked books. Please try again later.');
//                                 }).finally(() => {
//                                     if (bookList.length == bookid_list.length) {
//                                         setBooks(bookList);
                                        
//                                     }
//                                     setLoading(false);
//                             })
//                             });
//                         });
//                 })})            
//         .catch((error) => {
//             console.error("❌ Book Fetch Error:", error);
//             setError("Error loading book data. Please try again later.");
//         }).finally(() => {
//           localStorage.setItem("shelfNamesList", shelves);
//     console.log("BOOK LIST: ", books);}
//     );}, [])


  const nav = useNavigate();
  const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}")
  const token = sessionStorage.getItem("access_token");

  const [selected, setSelected] = useState('Profile');
  const [goal, setGoal] = useState(0);


  // settings modal
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  if(!token || !currentUser.username) {
    nav('/login');
  }

  const message:string = useLocation().state; 


  const [books, setBooks] = useState<BookItem[]>([]);

  const [shelfItems, setShelfItems] = useState<BookItem[]>([]);
  const [hasError, setHasError] = useState(false);

  var bookid_list:string[] = [];
  var bookList:BookItem[] = [];

  let iscurrentUsersProfile = true;
  
    
  //looking at this users profile page vs anothers
  var {user} = useParams();
  let title = 'My';
  if (user != currentUser.username) {
    iscurrentUsersProfile = false;
    title= user + "'s"};

const target = iscurrentUsersProfile ? (currentUser.username) : (user)


  const {reviewData, loading, error} = getReviewsForUser(`/user/reviews`);

  const likedBookIds = (reviewData.filter(review => review.liked)).flatMap(item => item.work_id)


  const [followers, setFollowers] = useState<User[]>([]); // list of users that are following the user
  const [following, setFollowing] = useState<User[]>([]); // list of users that this user is following
  const [followersOrFollowingSelected, setFollowersOrFollowingSelected] = useState('');
  var shelvesList:ShelfItem[] = [];
  const [library, setLibrary] = useState<ShelfItem[]>([]) 
  const [readBooks, setReadBooksList] = useState<BookItem[]>([]);
  const followSuccessMessage = (name:string) => toast(`Success! You are now following ${name}.`, {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    });


  useEffect(() => {
    
    // list of this users' followers
    axios.get(`/${user}/followers`)
    .then((response) => {
      setFollowers(response.data)}
    ).catch((error) => console.log(error))

    // list of people this user is following
    axios.get(`/${user}/following`)
    .then((response) => {
      setFollowing(response.data)}
    ).catch((error) => console.log(error));


// get the user's reading goal and update graph on page reload
      axios.get(`${currentUser.username}/goals`
      ).then((response) => {
          response.data === -1 ? setGoal(0) : setGoal(response.data);
  }).catch((error) => console.log(error));

  // list of this user's read books
  axios.get(`/shelf/${user}/read-books`, {
      headers: { "Content-Type": "application/json" }
  })
  .then((response) => setReadBooksList(response.data))
  .catch((error) => {
      console.error("❌ Book Fetch Error:", error);
      // setError("Error loading book data. Please try again later.");
  });
        
  }, []);

  for (var i=0; i < shelvesList.length; i++) {
    console.log(shelvesList[i].shelf_name)
  }
const topFive = shelvesList.find((item) => item.shelf_name === 'top-5')
  console.log("TOP 5", topFive)

  function handleFollow() {
    axios.post(`/follow`, user,  
      {headers: {
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json",
      }},)
    .then(() => followSuccessMessage(user? user: ''))
    .catch((error) => console.log(error)).finally(() => nav(0))
  }
    
  let year = new Date().getFullYear();



  return(
    <div id="profile-page-container">
      <div id='settings'>
        {iscurrentUsersProfile ? <FontAwesomeIcon icon={faGear} size={'xl'} onClick={() => setOpen(o => !o)}/> : <></>} 
          <Popup open={open} closeOnDocumentClick onClose={closeModal} modal>
            <div className="modal">
              <span id='settings'> <Settings /></span>
            </div>
          </Popup>
      </div>

      <div id='profile-header-content'>
        <div id='user-container'>
          <div id='user'>
            <FontAwesomeIcon icon={faUserCircle} size={'xl'}/>
            <h2>{user === currentUser.username ? (currentUser.username) : (user)}</h2> 
          </div>
          {!iscurrentUsersProfile ? <button className='primary' onClick={handleFollow}>Follow</button> :<></>} {/*Only display follow button on other user's profiles */}
        </div>
        <div className="reader-goals">
          {currentUser.username == user ? (<YearlyProgressChart progress={1} goal={currentUser.goal}  />) : (<YearlyProgressChart progress={0} goal={goal}  />)}
        </div>
        
        
        <div id='header-stats'>
          
          <div className='stats' onClick={() => setSelected('Profile')}>
            <h3>{1}</h3>
            <p>Books Read</p>
          </div>
          <div className='stats' onClick={() => setSelected('Profile')}>
            <h3>{goal}</h3>
            <p>{year} Goal</p>
          </div>
          <div className='stats' onClick={() => setSelected('Reviews')}>
            <h3>{reviewData.length}</h3>
            <p>Reviews</p>
          </div>
          <div className='stats' onClick={() => {
            setFollowersOrFollowingSelected('Following');
            setSelected('Network');
          }
          }>
            <h3>{following.length}</h3>
            <p>Following</p>
          </div>
          <div className='stats followers' onClick={() => {
            setFollowersOrFollowingSelected('Followers');
            setSelected('Network');
          }}>
          <h3>{followers.length}</h3>
            <p>Followers</p>
          </div>
        </div>
      </div>
      <div id='profile-nav'>
        <ul>
          <li id={(selected == 'Profile')? "selected" : "unselected"} onClick={() => setSelected('Profile')}>Profile</li>
          <li id={(selected == 'Library')? "selected" : "unselected"} onClick={() => setSelected('Library')}>Library</li>
          <li id={(selected == 'Reviews')? "selected" : "unselected"} onClick={() => setSelected('Reviews')}>Reviews</li>
          <li id={(selected == 'Likes')? "selected" : "unselected"} onClick={() => setSelected('Likes')}>Likes</li>         
          <li id={(selected == 'Competitions')? "selected" : "unselected"} onClick={() => setSelected('Competitions')}>Competitions</li>
          <li id={(selected == 'Network')? "selected" : "unselected"} onClick={() => setSelected('Network')}>Network</li>
        </ul>
      </div>
      <div id='profile-body-content'>
        {title} {selected}:
        {(selected == 'Profile') ?
         <div>
          {iscurrentUsersProfile ? (<div id="reader-goals">
             <UserProfile library={shelvesList}/>
         </div>) : (<></>)}
        </div>
        : (selected == 'Library') ?
        <div>
          <button className="primary" onClick={() => nav('/shelf/create')}>+ Create a New Shelf</button>
          <UserProfileLibrary/>
        </div>
        : (selected == 'Reviews') ? 
        <UserReviewsPage reviewData={reviewData} loading={loading} error={error}/>
        : (selected == 'Likes') ?
        <UserLikesList likedBookIds={likedBookIds}/>
        : (selected == 'Competitions') ?
        <UserProfileCompetitionsSection/>
        : (selected == 'Network') ? 
        <UserNetwork initialState={followersOrFollowingSelected} followers={followers} following={following} />
        :
        <></>}
      </div>

        
    </div>

    );
}


export default ReaderProfilePage;
