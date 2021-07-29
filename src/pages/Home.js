import React from 'react';
import Navigation from '../components/Navigation';

function Home(props) {
    return (

        <div className="splash">
            <Navigation />
            <div className="container" id="hero">
                <div class="px-4 py-5 my-5 text-center">
                    <h1 class="display-5 fw-bold">Hackajack</h1>
                    <div class="col-lg-6 mx-auto">
                    <p class="lead mb-4">Mintbean Hackathon Project</p>
                        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                            <button type="button" class="btn btn btn-lg px-4 gap-3">
                            <i class="bi bi-dice-5"></i> Play Game </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  
    );
}

export default Home;