import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import LeaderboardScore from "../components/LeaderboardScore";
import LeaderboardIcon from "../assets/img/leaderboard-icon.png";

function Leaderboard({ user, handleLogout }) {

    useEffect(() => {
        document.body.style.backgroundImage = "linear-gradient(to right, #c3505c, #b967ba)";
        return () => {
            document.body.style.backgroundImage = ""
        }
    });

    const leaderboardURL = 'http://localhost:8080/leaderboard/getLeaderboard';

    const [leaderboardState, setLeaderboardState] = useState();

    useEffect(() => {
        fetch(leaderboardURL)
        .then(response => response.json())
        .then(leaderboard => setLeaderboardState(leaderboard))
    }, []);

    return (
        <>
            <Navigation active="leaderboard" user={user} handleLogout={handleLogout} />
            <div className="container-sm">
                <div className="card text-center">
                    <div className="card-body border-0">
                    <img className="img-fluid rounded" src={LeaderboardIcon} alt="Leaderboard" width="300" /> 
                        <ul className="list-group list-group-flush border-0">
                            { 
                                leaderboardState
                                &&
                                leaderboardState.scores.map((score, idx) => <LeaderboardScore score={score} key={idx} position={idx + 1} />)
                            }
                        </ul>
                    </div>
                </div>
            </div>  
        </>
    );      
}

export default Leaderboard;