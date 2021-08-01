import {setToken, getUserFromToken, removeToken} from './tokens';

const BASE_URL = 'http://localhost:8080/';

function register(user) {
  return fetch(BASE_URL + 'register', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate username
    throw new Error('Username already taken!');
  })
  .then(({ token }) => setToken(token));
}

function getUser() {
  return getUserFromToken();
}

function logout() {
  removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
  .then(({token}) => setToken(token));
}

export {
  register,
  getUser,
  logout,
  login
}