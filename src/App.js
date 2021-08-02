import { useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { getUser, logout } from './services/userService';
// --pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Play from './pages/Play';
// --components
import NotFound from './components/NotFound';
// styling
import './App.css';

function App(props) {

  const [userState, setUserState] = useState({ user: getUser() });

  function handleRegisterOrLogin() {
    setUserState({ user: getUser() });
    props.history.push('/');
  }

  function handleLogout() {
    logout();
    setUserState({ user: null });
    props.history.push('/');
  }

  return (
    <>
      <Switch>
        <Route exact path='/' render={(props) => <Home user={userState.user} handleLogout={handleLogout} /> } />
        <Route exact path='/register' render={(props) => <Register handleRegisterOrLogin={handleRegisterOrLogin} /> } />
        <Route exact path='/login' render={(props) => <Login handleRegisterOrLogin={handleRegisterOrLogin} /> } />
        <Route exact path='/play' render={(props) => <Play user={userState.user} /> } />
        <Route exact path='/profile/:userId' render={(props) => <Profile user={userState.user} /> } />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default withRouter(App);