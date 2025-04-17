import { useNavigate } from "react-router-dom";


function CompetitionsSection() {
    const navigate = useNavigate();



    return(
        <div id='profile-competitions'>
            <div>
            {/* competitions the user is participating in go here, if no competitions, browse comp page */}
             

            </div>
            <div>
                <p>My Competitions: </p>
            {/* competitions the user has created go here */}
            <button onClick={() => navigate('/competitions/create')}>+ Create Reading Competition</button>
            </div>
            

        </div>
    );

}
export default CompetitionsSection;