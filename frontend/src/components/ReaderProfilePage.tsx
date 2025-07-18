import axios from "../../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { faGear, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getReviewsForUser } from "../hooks/fetch";
import UserLikesList from "./UserLikesList";
import '../assets/css/ReaderProfilePage.css'
import { User } from "../types";
import UserNetwork from "./UserNetwork";
import Popup from "reactjs-popup";
import Settings from "./Settings";
import UserReviewsPage from "./UserReviewsPage";
import '../assets/css/Settings.css'
import UserProfile from "./UserProfile";
import UserProfileLibrary from "./UserProfileLibrary";
import {  toast } from "react-toastify";
import useShelfBooks from "../hooks/useShelfBooks";
import { toastConfig } from "../utils/toastConfig";
import UserProfileCompetitionsSection from "./UserProfileCompetitionsSection";


function ReaderProfilePage() {
  let year = new Date().getFullYear();
  const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}")
  const token = sessionStorage.getItem("access_token");
  let iscurrentUsersProfile = true;
  const [selected, setSelected] = useState('Profile');
  const [followersOrFollowingSelected, setFollowersOrFollowingSelected] = useState('');

  // open/closed state of settings modal
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
    
  //looking at this users profile page vs anothers
  var {user} = useParams();// get username of the profile we're currently viewing from URL params
  let title = 'My';
  if (user != currentUser.username) {
    iscurrentUsersProfile = false;
    title= user + "'s"};

  const target = iscurrentUsersProfile ? (currentUser.username) : (user)

  const navigate = useNavigate();
  if(!token || !currentUser.username) {
    navigate('/login');
  }

  const {reviewData, loading, error} = getReviewsForUser(`/user/reviews`);
  const likedBookIds = (reviewData.filter(review => review.liked)).flatMap(item => item.work_id)
  
  const {shelfBooksList:otherUserReadBooksList, loadingBookshelf:otherUserLoadingReadBooks, bookshelfError:otherUserReadBooksError} = useShelfBooks(user!, "Books I've Read");



  const [readingGoal, setReadingGoal] = useState<number>(0);
  const [followers, setFollowers] = useState<User[]>([]); // list of users that are following the user
  const [following, setFollowing] = useState<User[]>([]); // list of users that this user is following
  // ChatGPT was used for this useEffect block. We asked it to help refactor the code for improved readability.
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // get list of this user's followers
      const followersPromise = axios.get<User[]>(`/${user}/followers`);
      // get list of users this user is following
      const followingPromise = axios.get<User[]>(`/${user}/following`);
      // get the user's reading goal
      const readingGoalPromise = axios.get(`${user}/goals`);

      const [followersResponse, followingResponse, readingGoalResponse] = await Promise.all ([
        followersPromise, 
        followingPromise, 
        readingGoalPromise, 
 
      ]);
      setFollowers(followersResponse.data);
      setFollowing(followingResponse.data);
      setReadingGoal(readingGoalResponse.data === -1 ? 0 : readingGoalResponse.data);

    } catch (error) {
      console.error("Error fetching user profile data: ", error);
    }
    };

    fetchUserData();

  }, [user]);

  const findItem = ((array:User[], username:string)=> array.find((item) => item.username == username));
  const isFollowingUser = (findItem(followers, currentUser.username));
 
  // Follow another user
  const followSuccessMessage = () => toast(`Success! You are now following ${user}.`, toastConfig);
  const followErrorMessage = () => toast.error(`Error: unable to follow ${user}. Please try again later.`, toastConfig);

  function handleFollow() {
    axios.post(`/follow`,{username: user},  
      {headers: {
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json",
      }},)
    .then(() => {
      followSuccessMessage();
      // trigger page reload after success toast is displayed
      setTimeout(() => {
        navigate(0);
      }, 1000);
      
    })
    .catch((error) => {
      console.log(error);
      followErrorMessage();
    })
  };

  // unfollow another user
  const unfollowSuccessMessage = () => toast(`Successfully unfollowed ${user}.`, toastConfig);
  const unfollowErrorMessage = () => toast.error(`Error: unable to unfollow ${user}. Please try again later.`, toastConfig);

  function handleUnfollow() {
    axios.delete(`/unfollow/${user}`,
      {headers: {
        "Authorization": `Bearer ${token}`
      }},)
    .then(() => {
      unfollowSuccessMessage();
      // trigger page reload after success toast is displayed
      setTimeout(() => {
        navigate(0);
      }, 1000);
    })
    .catch((error) => {
      console.log(error);
      unfollowErrorMessage();
  })
  };
    

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
          {/*Display follow/unfollow buttons on other user's profile pages. */}
          {(!iscurrentUsersProfile && !isFollowingUser) ? <button className='primary' onClick={handleFollow}>Follow</button> : 
          (!iscurrentUsersProfile && isFollowingUser) ?  (<button className='secondary' onClick={handleUnfollow}>Unfollow</button>) : <></>}  
        </div>
        <div id='header-stats'>
          <div className='stats' onClick={() => setSelected('Profile')}>
            <h3>{otherUserReadBooksList.length}</h3>
            <p>Books Read</p>
          </div>
          <div className='stats' onClick={() => setSelected('Profile')}>
            <h3>{readingGoal}</h3>
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
        <h3 className="reader-profile-headers">{title} {selected}</h3>
        {(selected == 'Profile') ?
         <div>
          <div id="profile-container">
            <div id="reader-goals">
             <UserProfile/>
            </div>
          </div>
        </div>
        : (selected == 'Library') ?
        <div>
          <button className="primary" onClick={() => navigate('/shelf/create')}>+ Create a New Shelf</button>
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
};

export default ReaderProfilePage;
