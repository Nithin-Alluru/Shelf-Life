import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { ContestItem } from "../types";
import '../assets/css/CompetitionsPage.css'

function CompetitionsPage() {
  const nav = useNavigate();
  // const [competitions, setCompetitions] = useState<ContestItem[]>([]);

  // useEffect(() => {
    // get list of competitions
  //   axios.get(`/competitions`).then((response) => {
  //     console.log(response);
  //     setCompetitions(response.data);
  //   }).catch((error) => console.error(error))
  // }, [])

  const competitions = ([
    {
      organizer: 'sally',
      contest_name: "we love books",
      book_count: 5,
      end_date: '1/5/2026'
    },
    {
      organizer: 'sally',
      contest_name: "we love books",
      book_count: 5,
      end_date: '1/5/2026'
    }, 
    {
      organizer: 'sally',
      contest_name: "we love books",
      book_count: 5,
      end_date: '1/5/2026'
    }, 
    {
      organizer: 'sally',
      contest_name: "we love books",
      book_count: 5,
      end_date: '1/5/2026'
    },
    {
      organizer: 'sally',
      contest_name: "we love books",
      book_count: 5,
      end_date: '1/5/2026'
    }, 
    {
      organizer: 'sally',
      contest_name: "we love books",
      book_count: 5,
      end_date: '1/5/2026'
    }, 
    {
      organizer: 'sally',
      contest_name: "we love books",
      book_count: 5,
      end_date: '1/5/2026'
    },
    {
      organizer: 'sally',
      contest_name: "we love books",
      book_count: 5,
      end_date: '1/5/2026'
    }, 
    {
      organizer: 'sally',
      contest_name: "we love books",
      book_count: 5,
      end_date: '1/5/2026'
    }, 


  ]);

  return(
    <main id='competitions-list'>
      <div id="header">
        <h2>Competitions</h2>
      <button className="primary create-comp" onClick={() => {nav('/competitions/create'); 
        sessionStorage.setItem('creatingComp', JSON.stringify(true));
      }}>Create Competition</button>
      </div>
      
      <ul id="book-list-page">
        {competitions && competitions.length > 0 ? (
          competitions.map((competition:ContestItem) => 
          <li key={competition.contest_name}>
            <Link to={`/competitions/${competition.contest_name}`}>
            <div className="competition-item">
              <div className="contest-info">
              <h2>{competition.contest_name}</h2>
              <p>Organized by <Link to={`/${competition.organizer}/profile`}>{competition.organizer}</Link></p>
            </div>
            <p>Ends on: {competition.end_date.toString()}</p>
            <p>Number of books: {competition.book_count}</p>
            <button className='secondary'>Join</button>
          </div>
          </Link>
            
            
          </li>
          )
        ) : (<p>Error loading competitions. Please try again later</p>)}

      </ul>
    </main>
  );
}

export default CompetitionsPage;