import React from 'react';
import Navigation from '../components/Navigation';
import { Link } from "react-router-dom";

function Home({ user, handleLogout }) {
    return (

        <div className="splash">
            <Navigation active={"home"} user={user} handleLogout={handleLogout} />
            <div className="container" id="hero">
                <div className="px-4 py-5 my-5 text-center">
                    <h1 className="display-5 fw-bold">Hackajack</h1>
                    <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">Mintbean Hackathon Project</p>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                            
                            <Link to="/play"> 
                                <button type="button" className="btn btn btn-lg px-4 gap-3">
                                    <i className="bi bi-dice-5"> Play Game</i> 
                                </button>
                            </Link> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
  
    );
}

export default Home;