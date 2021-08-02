import React from 'react';

function ProfileInfo({ profile }) {
    console.log(profile)
    return (
        <div>
                <h1 className="display-4"> { profile && profile.firstName + ' ' + profile.lastName } </h1>
                <h2 className="display-4"> {profile && profile.username } </h2>
                <hr/>
                <p className="fs-3"> Wins: { profile && profile.wins } </p>
                <p className="fs-3"> Losses: { profile && profile.losses } </p>
                <p className="fs-3"> Win/Loss Ratio: { profile && Math.floor((profile.wins / profile.gamesPlayed) * 100) }% </p>
                <p className="fs-3"> Games Played: {profile && profile.gamesPlayed } </p>
                <p className="fs-6"> Account Created: { new Date(profile && profile.createdAt).toDateString() } </p>
        </div>
    );
}

export default ProfileInfo;