import axios from "../../axiosConfig";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FormEvent, useContext, useEffect, useState } from "react";
import { faArrowRight, faGear, faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  getBooksInShelf, getGoal, getReviewsForUser } from "../hooks/fetch";
import UserLikesList from "./UserLikesList";
import '../assets/css/ReaderProfilePage.css'
import { BookItem, ShelfItem, ShelfName, User } from "../types";
import UserNetwork from "./UserNetwork";
// import YearlyProgressChart from "./YearlyProgressChart";
import Popup from "reactjs-popup";
import Settings from "./Settings";
import UserReviewsPage from "./UserReviewsPage";
import YearlyProgressChart from "./YearlyProgressChart";
import UserProfile from "./UserProfile";
import CompetitionsSection from "./UserProfileCompetitionsSection";
import UserProfileCompetitionsSection from "./UserProfileCompetitionsSection";
import { AuthStore } from "../Contexts/AuthContext";
import '../assets/css/Settings.css'


function ReaderProfilePage() {
  const nav = useNavigate();
  const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}")
  const token = sessionStorage.getItem("access_token");
  const [selected, setSelected] = useState('Profile');


  const [currentUserGoal, setCurrentUserGoal] = useState(0);
  const initialState:ShelfItem = {shelf_name: '', books_list: []}

  // settings modal
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  if(!token || !currentUser.username) {
    nav('/login')
  }

  const message:string = useLocation().state; 


  let iscurrentUsersProfile = true;
  

  //looking at this users profile page vs anothers
  var {user} = useParams();
  console.log(user)
  console.log(currentUser.username)
  let title = 'My';
  if (user != currentUser.username) {
    iscurrentUsersProfile = false;
    title= user + "'s"};

    console.log("whose profile? " , iscurrentUsersProfile);

const target = iscurrentUsersProfile ? (currentUser.username) : (user)


  const {reviewData, loading, error} = getReviewsForUser(`/user/reviews`);
  console.log("reviews" ,reviewData)
  const likedBookIds = (reviewData.filter(review => review.liked)).flatMap(item => item.work_id)
  console.log("liked id's:", likedBookIds);

  const [followers, setFollowers] = useState<User[]>([]); // list of users that are following the user
  const [following, setFollowing] = useState<User[]>([]); // list of users that this user is following
  const [shelfList, setShelfList] = useState<ShelfName[]>([{shelf_name: ""}]);
  const [names, setNames] = useState<string[]>([]);
  const library:ShelfItem[] = [];
  const [followersOrFollowingSelected, setFollowersOrFollowingSelected] = useState('');



 const {goal} = getGoal(`/${user}/goals`);
 console.log("GOAL", goal)

  useEffect(() => {
    if (iscurrentUsersProfile) {

    }
 
    console.log("TARGET" , target);
    
    axios.get(`/${user}/followers`)
    .then((response) => {
      console.log("FOLLOWERS" , response.data);
      setFollowers(response.data)}
    ).catch((error) => console.log(error))

    axios.get(`/${user}/following`)
    .then((response) => {
      console.log("FOLLOWING" , response.data);
      setFollowing(response.data)}
    ).catch((error) => console.log(error));

    

    axios.get('/shelf', {
      headers: { "Authorization": `Bearer ${token}`
    }}).then((response) => {
      const shelfNames:[{shelf_name:string}] = response.data;

      console.log("SHELVES " , names);
    }).catch((error) => console.log(error));

  },[]);

  // get users bookshelves


      console.log(names.length > 0);

      for (let i = 0; i < names.length; i++ ) {
        const shelfName = names[i];
        const {shelfBooks, loading, error} = getBooksInShelf(`/shelf/${shelfName}`);
        library.push({shelf_name: shelfName, books_list: shelfBooks? shelfBooks : []});
        console.log("library item", library);
      }


      const submitGoal = async (event:FormEvent) => {
        event.preventDefault();

        try {
            axios.put('/goals', currentUserGoal, {headers: {"Authorization":`Bearer ${token}`}}
            ).then((response) => {
                console.log(response.data.goal);
                setCurrentUserGoal(response.data.goal);
                
                const updatedUser:User = {
                    username: currentUser.username,
                    first_name: currentUser.first_name,
                    last_name: currentUser.last_name,
                    goal: response.data.goal
                }
                console.log(updatedUser)
                sessionStorage.setItem('User', JSON.stringify(updatedUser))
            }
            ).catch((error) => {
                console.log(error);
                console.log(error.response.status);
            })
        } catch {(error: any) => console.log(error)}
    }


    
  function handleFollow() {
    axios.post(`/follow`, user,  
      {headers: {
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json",
      }},)
    .then(response => console.log("here", response.data))
    .catch((error) => console.log(error)).finally(() => nav(0))
  }
    
  let year = new Date().getFullYear();



  return(
    <div id="profile-page-container">
      <div id='settings'>
        {iscurrentUsersProfile ? <FontAwesomeIcon icon={faGear} size={'xl'} onClick={() => setOpen(o => !o)}/> : <></>} {/* TODO add OCL*/}
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
        {currentUser.username == user ? (<YearlyProgressChart props={[currentUser.goal, 1]} />) : (<YearlyProgressChart props={[goal, 1]} />)}
        
        <div id='header-stats'>
          
          <div className='stats' onClick={() => setSelected('Profile')}>
            <h3>{reviewData.length}</h3>
            <p>Books Read</p>
          </div>
          <div className='stats' onClick={() => setSelected('Profile')}>
            <h3>{reviewData.length}</h3>
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
             <form id="set-goals">
                  <label htmlFor="goal">My reading goal for {year}: </label>
                         <input type="number" id="goal" name="goal" min="0" max="100" value={currentUserGoal} onChange={(e) => setCurrentUserGoal(parseInt(e.target.value ))}/>
                         <input type="submit" onClick={submitGoal} />
                 </form>
             <YearlyProgressChart props={[1, currentUser.goal]} /> 
         </div>) : (<></>)}
         
         {/* <div id="top-five-list">
             <h3>Favorites: </h3>
             {top5 && top5.books_list.length > 0 ? (
                 top5.books_list.map((book:BookItem, index) => (
                     <li key={index}>
                         <MinBookBox 
                             title={book.title} 
                             author={book.author} 
                             work_id={book.work_id} 
                             description={book.description} 
                             img_S={book.img_S} 
                             img_M={book.img_M} 
                             img_L={book.img_L}/>
                     </li>
                     
                 ))
             ): (<p>You don't have any favorites yet. </p>)}

         </div>
         <div id='read-list'>
             <h3>Books i've read:</h3>
             {readList && readList.books_list.length > 0 ? (
                 readList.books_list.map((book:BookItem, index) => (
                     <li key={index}>
                         <MinBookBox 
                             title={book.title} 
                             author={book.author} 
                             work_id={book.work_id} 
                             description={book.description} 
                             img_S={book.img_S} 
                             img_M={book.img_M} 
                             img_L={book.img_L}/>
                     </li>
                     
                 ))
             ): (<p>You haven't marked any books as read yet.</p>)} */}
         {/* </div> */}
           
 </div>
        : (selected == 'Library') ?
        <></>
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
