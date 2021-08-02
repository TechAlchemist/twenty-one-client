import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { register } from "../services/userService";
import Navigation from "../components/Navigation";
import RegisterIcon from "../assets/img/register-icon.png";

function Register(props) {

    useEffect(() => {
        document.body.style.backgroundImage = "linear-gradient(to right, #b967ba, #c3505c)";
        return () => {
            document.body.style.backgroundImage = ""
        }
    });

    const [ formState, setFormState ] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        passwordConfirmation: ''
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
            await register(formState)
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
            <Navigation active={"register"} />
            <div className='container'>
            <div className="container py-4" id="login-image">
                <h1 className="display-1 text-white"> Register </h1>
                <img className="img-fluid rounded" src={RegisterIcon} alt="Alien Space Ship Icon" width="300" /> 
            </div>
                <form onSubmit={handleSubmit}>
                    <div className='input-group mb-3'>
                        <span className='input-group-text' id='firstName-addon'><i className='bi bi-suit-club'></i></span>
                        <input onChange={handleChange} value={formState.firstName} name='firstName' type='text' className='form-control' placeholder='first name' aria-label='firstName' aria-describedby='firstName-addon' />
                    </div>

                    <div className='input-group mb-3'>
                        <span className='input-group-text' id='lastName-addon'><i className='bi bi-suit-spade'></i></span>
                        <input onChange={handleChange} value={formState.lastName} name='lastName' type='text' className='form-control' placeholder='last name' aria-label='lastName' aria-describedby='lastName-addon' />
                    </div>

                    <div className='input-group mb-3'>
                        <span className='input-group-text' id='username-addon'><i className='bi bi-person'></i></span>
                        <input onChange={handleChange} value={formState.username} name='username' type='text' className='form-control' placeholder='username' aria-label='username' aria-describedby='username-addon' />
                    </div>

                    <div className='input-group mb-3'>
                        <span className='input-group-text' id='password-addon'><i className='bi bi-key'></i></span>
                        <input onChange={handleChange} value={formState.password} name='password' type='password' className='form-control' placeholder='password' aria-label='Password' aria-describedby='password-addon' />
                    </div>
                    
                    <div className='input-group mb-3'>
                        <span className='input-group-text' id='password-confirmation-addon'><i className='bi bi-key'></i></span>
                        <input onChange={handleChange} value={formState.passwordConfirmation} name='passwordConfirmation' type='password' className='form-control' placeholder='password confirmation' aria-label='Password Confirmation' aria-describedby='password-confirmation-addon' />
                    </div>

                    <div className='input-group mb-3'>
                        <button 
                            disabled={!formValid()} 
                            value='Signup' 
                            className='btn btn-success'>
                            Sign Up
                        </button>
                        &nbsp;&nbsp;
                        <Link to='/'><button className='btn btn-secondary'>Cancel</button></Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Register;