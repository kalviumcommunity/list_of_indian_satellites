import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import image from './assets/login.jpg';
import user from './assets/User-3.png';
import pass from './assets/Password.png';
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
   
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://list-of-indian-satellites-1.onrender.com/api/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName: userName, password: password })
            });
            const feedback = await response.json();

            if (response.ok) {
                const { accessToken, userId } = feedback;
                console.log(feedback);
                const currentDate = new Date();
                const nextYear = new Date(currentDate);
                nextYear.setUTCFullYear(nextYear.getUTCFullYear() + 1);
                const expires = nextYear.toUTCString();
                document.cookie = `accessToken=${accessToken};expires=${expires};path=/;`;
                document.cookie = `userId=${userId};expires=${expires};path=/;`;
                document.cookie = `password=${password};expires=${expires};path=/;`;
                localStorage.setItem('user', userId);
                console.log("Login successful");
                navigate('/');
            } else {
                console.log("Login error");
            }
            return feedback;
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
        <div className="loginbody">
            <div>
                <img src={image} alt="" id='login-sat-img' />
            </div>
            <form onSubmit={handleSubmit} className="login-field">
                <h2 id="signup">Log in</h2>
                <p className="para">Log in to contribute by adding more satellite info!</p>

                <div>
                    <img src={user} alt="" id="user" />
                    <input type="text" placeholder="Username" id="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>

                <div>
                    <img src={pass} alt="" id="passimg" />
                    <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div id="ask-sign">Don't have an account? <Link to='/signup' id="ask-signin">Sign up</Link></div>
                <button type="submit" id="submit">Log in</button>
            </form>
            <Link to='/' className="backtohome-btn">← Back to home</Link>
        </div>
    );
}

export default Login;
