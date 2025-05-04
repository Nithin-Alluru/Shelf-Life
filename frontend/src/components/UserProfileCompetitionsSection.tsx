import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


function CompetitionsSection() {
    const {user} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // get comps this user is participating in
        // get competitions by this user
    });



    return(
        <div id='profile-competitions'>
            <div>
            {/* competitions the user is participating in go here, if no competitions, browse comp page */}
            
            </div>
            <div>
                <p>My Competitions: </p>
            {/* competitions the user has created go here */}
            <button className="primary" onClick={() => navigate('/competitions/create')}>+ Create Reading Competition</button>
            </div>
            

        </div>
    );

}
export default CompetitionsSection;