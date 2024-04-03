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
   
    const handleSubmit = async (e) => {
        e.preventDefault();

                const feedback = await response.json();
    
                if (response.ok) {
                    const { accessToken, userName } = feedback;
                    console.log(feedback);
                    const currentDate = new Date();
                    const nextYear = new Date(currentDate);
                    nextYear.setUTCFullYear(nextYear.getUTCFullYear() + 1);
                    const expires = nextYear.toUTCString();
                    document.cookie = `accessToken=${accessToken};expires=${expires};path=/;`;
                    document.cookie = `user=${userName};expires=${expires};path=/;`;
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/login', {
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
                <h2 id="signup">Sign up</h2>
                <p className="para">Sign up to contribute by adding more satellite info !</p>

                <div>
                    <img src={user} alt="" id="user" />
                    <input type="text" placeholder="Username" id="username" value={userName} onChange={(e) => {
                        console.log(e.target.value);
                        setUserName(e.target.value);
                    }} />
                </div>

                <div>
                    <img src={pass} alt="" id="passimg" />
                    <input type="password" placeholder="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div id="ask-sign">Don't have an accout?<Link to='/signup' id="ask-signin">Sign up</Link></div>
                <button type="submit" id="submit">Log in</button>
            </form>
            <Link to='/' className="backtohome-btn">← Back to home</Link>
        </div>
    );
}

export default Login;

                <form onSubmit={handleSubmit} className="login-field">
                    <h2 id="signup">Sign up</h2>
                    <p className="para">Sign up to contribute by adding more satellite info !</p>
    
                    <div>
                        <img src={user} alt="" id="user" />
                        <input type="text" placeholder="username" id="username" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                    </div>
                    <div>
                        <img src={pass} alt="" id="passimg" />
                        <input type="password" placeholder="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" id="submit">Log in</button>
                </form>
                <Link to='/' className="backtohome-btn">← Back to home</Link>
            </div>
        );
    }
    
    export default Login;
    

