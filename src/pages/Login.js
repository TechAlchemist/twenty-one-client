import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../services/userService';
import Navigation from '../components/Navigation';
import LoginIcon from '../assets/img/login-icon.png';

function Login(props) {

    useEffect(() => {
        document.body.style.backgroundImage = "linear-gradient(to right, #c3505c, #b967ba)";
        return () => {
            document.body.style.backgroundImage = ""
        }
    });

    const [ formState, setFormState ] = useState({
        username: '',
        password: ''
    });

    function handleChange(event) {
        setFormState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault(); // disable default behavior
        if(!formValid()) return;  // make sure form is valid
        try {
            await login(formState)
            props.handleRegisterOrLogin();
        } catch (error) {
            alert(error.message);
        }
    }

    function formValid() {
        return !!(formState.username && formState.password);
    }

    return (
        <>
            <Navigation active={"login"} />
            <div className="login-wrapper">
                <div className="container py-4">
                    <div className="container py-4" id="login-image">
                        <h1 className="display-1 text-white"> Login </h1>
                        <img className="img-fluid rounded" src={LoginIcon} alt="Alien Space Ship Icon" width="300" /> 
                    </div>
                    <div className="pb-3 mb-4 border-bottom">
                        <div className="container-md">
                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="username-addon"><i className="bi bi-person-circle"></i></span>
                                    <input onChange={handleChange} value={formState.username} name='username' type="text" className="form-control" placeholder="username" aria-label="username" aria-describedby="username-addon" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="password-addon"><i className="bi bi-key"></i></span>
                                    <input onChange={handleChange} value={formState.password} name='password' type="password" className="form-control" placeholder="password" aria-label="Password" aria-describedby="password-addon" />
                                </div>
                                <div className='col-6 align-self-center'>
                                    <button
                                        disabled={!formValid()}
                                        value="Login"
                                        className="btn btn-success">
                                        Login
                                    </button>
                                    &nbsp;&nbsp;
                                    <Link to="/"><button className='btn btn-secondary'>Cancel</button></Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;