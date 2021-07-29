import { useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { getUser, logout } from './services/userService';
// --pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
// --components
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';
// styling
import './App.css';

function App(props) {

  const [userState, setUserState] = useState({ user: getUser() });

  function handleSignupOrLogin() {
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
        <Route exact path='/' render={(props) => <Home user={userState.user} /> } />
        <Route exact path='/register' render={(props) => <Register handleSignupOrLogin={handleSignupOrLogin} /> } />
        <Route exact path='/login' render={(props) => <Login handleSignupOrLogin={handleSignupOrLogin} /> } />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default withRouter(App);