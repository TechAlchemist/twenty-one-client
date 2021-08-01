import { useParams } from "react-router";
import { useState, useEffect } from "react"
import Navigation from "../components/Navigation";

function Profile({ user }) {

    useEffect(() => {
        document.body.style.backgroundImage = "linear-gradient(to right, #c3505c, #b967ba)";
        return () => {
            document.body.style.backgroundImage = ""
        }
    });

    return (
        <>
            <Navigation active={"profile"} user={user} />
            <div class="container">
                <div class="h-100 p-5 bg-light border rounded-3">
                <h1 className="display-3"> { user.firstName + ' ' + user.lastName } </h1>
                <h2 className="display-4"> { user.username } </h2>
                <hr/>
                <p className="fs-3"> Single Player Wins: { user.singlePlayerWins } </p>
                <p className="fs-3"> Single Player Wins: { user.singlePlayerLosses } </p>
                <p className="fs-3"> Account Created: { new Date(user.createdAt).toDateString() } </p>
                </div>
            </div>
        </>
    );
}

export default Profile;