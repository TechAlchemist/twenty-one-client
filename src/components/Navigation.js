import React from 'react';

function Navigation(props) {
    return (
     
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Twelfth navbar example">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample10" aria-controls="navbarsExample10" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample10">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/leaderboard">Leaderboard</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/leaderboard">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/leaderboard">Register</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    );
}

export default Navigation;<p> I am a navigation component</p>