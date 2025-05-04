import { useEffect, useState } from 'react';
import '../assets/css/CompetitionItem.css'
import { BookItem, ContestItem, User } from '../types';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from '../../axiosConfig';

type ContestParticipant = {
  completed_books: [],
  username: string
}

function CompetitionDetailPage() {
  const navigate = useNavigate();
  const {name} = useParams();
  const data:ContestItem = useLocation().state; // gets book data passed in url
  const nav = useNavigate();


  
  const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}")
  const token = sessionStorage.getItem("access_token");


  const [books, setBooks] = useState<BookItem[]>([]);
  const [leaderboard, setLeaderBoard] = useState<ContestParticipant[]>([]);


  const [loadingBooks, setLoadingBooks] = useState(true);// add loading state
  const [bookError, setBookError] = useState('');  // handle errors gracefully
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true); // add loading state
  const [leaderboardError, setLeaderboardError] = useState(''); // handle errors gracefully

  const [userParticipating, setUserParticipating] = useState(false);



    useEffect(() => {

      setLoadingBooks(true);
      setBookError('');
    // get contest books
    axios.get(`contest/${name}/books`)
    .then((response) => {
      console.log("BOOKS", response.data)
      setBooks(response.data);
    }
    ).catch((error) => {
        console.log("Error loading contest books: ", error);
        setBookError("We're having trouble loading this competition's books right now. Please try again later.");  
    }
    )
  .finally(() => setLoadingBooks(false));
}, [])
const findItem = ((array:ContestParticipant[], username:string)=> array.find((item) => item.username == username));

  useEffect(() => {
  if (currentUser.username === data.organizer) {
    setUserParticipating(true);
  }

    setLoadingLeaderboard(true);
    setLeaderboardError('');
    // get contest participants
    axios.get(`contest/${name}/participants`)
    .then((response) => {
      console.log("PARTICIPANTS" , response.data);
      setLeaderBoard(response.data);
      console.log(currentUser.username)

      if(findItem(leaderboard, currentUser.username)) {
        console.log("HERE")
        setUserParticipating(true);
    }
    console.log("here")
    }
    ).catch((error) => {
        console.log("Error loading contest books: ", error);
        setLeaderboardError("We're having trouble loading this competition's books right now. Please try again later.");  
    }
    )
  .finally(() => setLoadingLeaderboard(false));
  }, []);





  function handleJoin() {
    axios.post(`/contest/${data.contest_name}/add_participant`)



    // Join competition logic goes here
    // trigger page reload
    nav(0);

  }

  async function markAsComplete(work_id:string) {
    await axios.post(`/contest/mark/${data.contest_name}/${work_id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    }
    ).then((response) => console.log(response)).catch((error) => console.log(error));

  }


  return (
    <div className="competition-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

      <div className="competition-header">
        <div className="info">
          <h2>{data.contest_name}</h2>

          <p className="organized-by">Organized by <Link to={`/${data.organizer}/profile`}>{data.organizer}</Link></p>
          <div className="meta">
            <span>Ends: {data.end_date}</span>
            <span>Participants: {leaderboard.length}</span>
          </div>
        </div>
        {(!userParticipating && token) ? (<button className="primary join-btn" onClick={() => handleJoin()}>Join</button>):<></>}
      </div>

      <div className="books-section">
      <h3>Books</h3>
      {loadingBooks ? (<p>Loading books...</p>) : (bookError) ? (<p style={{ color: "red" }}>{bookError}</p>) : 
                (<div className="book-list">
                  {books.length > 0 ? (          books.map((book, index) => (
            <div className="book-box" key={index}>
              <Link to={`/books/${book.work_id}`} state={book}> {/* link to book's page */ }
                <img src={book.img_L} alt={book.title} />
                <div className="book-details">
                  <h4>{book.title}</h4>
                  <p>{book.author}</p>

                </div>
              </Link>                  
              {/*mark book as completed or show completed status here */}
                  {userParticipating && (
                    <button className="secondary" onClick={() => markAsComplete(book.work_id)}>Mark as Completed</button>
                  )}
            </div>))
                                ) : (
                                    !loadingBooks && !bookError && <p>No books found.</p>
                                                    )}
                            </div>)}
      </div>

      <div className="leaderboard">
        <h3>Leaderboard</h3>
        <div className="leaderboard-header">
          <span>Rank</span>
          <span>Username</span>
          <span>Progress</span>
        </div>
        <div className="leaderboard-list">
          {leaderboard.map((user:ContestParticipant, index) => (
            <div
              key={index}
              className={`user-card ${user.username === currentUser.username ? 'highlight' : ''}`}
            >
              <span className="rank">#{index + 1}</span>
              <span className="username"><Link to={`/${user.username}/profile`}>{user.username}</Link></span>
              <span className="progress">
                {user.completed_books.length > 0 ? (
                  user.completed_books.length / data.book_count * 100
                ) : (0)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompetitionDetailPage;