import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ active, user, handleLogout }) {

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Twelfth navbar example">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample10" aria-controls="navbarsExample10" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample10">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className={active === "home" ? "nav-link active" : "nav-link"} aria-current="page" href="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/leaderboard" className={active === "leaderboard" ? "nav-link active" : "nav-link"} href="/leaderboard">Leaderboard</Link>
              </li>


              {
                user
                ?
                <>
                  <li className="nav-item">
                    <Link to={`/profile/${user._id}`} className={active === "profile" ? "nav-link active" : "nav-link"} href="/login"> {user.username} </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="" className="nav-link" onClick={handleLogout}>Logout</Link>
                  </li>
                </>
                :
                <>
                  <li className="nav-item">
                    <Link to="/login" className={active === "login" ? "nav-link active" : "nav-link"} href="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className={active === "register" ? "nav-link active" : "nav-link"} href="/register">Register</Link>
                  </li>
                </>
              }

            </ul>
          </div>
        </div>
      </nav>
    );
}

export default Navigation;<p> I am a navigation component</p>