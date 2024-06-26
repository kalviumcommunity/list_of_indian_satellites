import React, { useState } from "react";
import "./signup.css";
import image from './assets/login.jpg';
import user from './assets/User-3.png';
import pass from './assets/Password.png';
import lock from './assets/Lock.png';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const updateUsertoCookie = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
    
        try {
            const result = await axios.post("https://list-of-indian-satellites-1.onrender.com/api/signup", { userName, password });
            console.log(result);
            sessionStorage.setItem('login', true);
            sessionStorage.setItem('signupSuccess', 'Signup successful')
            navigate('/');
        } catch (err) {
            console.log(err);
            if (err.response && err.response.status === 400) {
                alert("User already exists");
            } else {
                alert("Some internal error occurred");
            }
        }
    };
    return (
        <div className="loginbody">
            <div>
                <img src={image} alt="" id='login-sat-img' />
            </div>
            <form onSubmit={updateUsertoCookie} className="login-field">
                <h2 id="signup">Sign up</h2>
                <p className="para">Sign up to contribute by adding more satellite info !</p>

                <div>
                    <img src={user} alt="" id="user" />
                    <input type="text" placeholder="username" id="username" onChange={(e) => setUserName(e.target.value)} required />
                </div>
                <div>
                    <img src={pass} alt="" id="passimg" />
                    <input type="password" placeholder="password" id="password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <img src={lock} alt="" id="lock" />
                    <input type="password" placeholder="confirm password" id="confpassword" onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <div id="ask-sign">Already a user?<Link to='/login' id="ask-signin">Sign in</Link></div>
                <button type="submit" id="submit">Sign up</button>
            </form>
            <Link to='/' className="backtohome-btn">← Back to home</Link>
        </div>
    );
};

export default Signup;
