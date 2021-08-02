import React from 'react';

function LeaderboardScore({ score, position }) {
    return (
        <li className="list-group-item text-center">
            <p className="fs-1"> 
                { 
                position + 
                ".   " + 
                score.firstName +
                " " + 
                score.lastName
                } 
            </p>
            <p className="fs-5"> Games Played: {score.gamesPlayed} </p>
            <p className="fs-5"> Wins: {score.wins} </p>
            <p className="fs-5"> Losses: {score.losses} </p>
            <p className="fs-5"> Win/Loss Ratio: { Math.floor((score.wins / score.gamesPlayed) * 100) }% </p>
        </li>
    );
}

export default LeaderboardScore;