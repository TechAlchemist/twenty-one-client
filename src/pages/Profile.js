import { useParams } from "react-router";
import { useState, useEffect } from "react"
import Navigation from "../components/Navigation";
import ProfileInfo from "../components/ProfileInfo";

function Profile({ user, handleLogout }) {

    var params = useParams();
    const profileURL = `http://localhost:8080/getUser/${params.userId}`

    useEffect(() => {
        document.body.style.backgroundImage = "linear-gradient(to right, #c3505c, #b967ba)";
        return () => {
            document.body.style.backgroundImage = ""
        }
    });

    const [profileState, setProfileState] = useState();

    useEffect(() => {
        fetch(profileURL)
        .then(response => response.json())
        .then(profile => setProfileState(profile))
    }, [profileURL]);

    return (
        <>
            <Navigation active={"profile"} user={user} handleLogout={handleLogout} />
            <div class="container">
                <div class="h-100 p-5 bg-light border rounded-3">
                    <ProfileInfo profile={profileState} />
                </div>
            </div>
        </>
    );
}

export default Profile;