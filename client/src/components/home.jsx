import React, { useState, useEffect } from 'react';
import './home.css';
import {useNavigate, Link } from 'react-router-dom';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const cookies = document.cookie;
    setIsLoggedIn(cookies);
  }, []); 

  const checkLoggedin=()=>{
    if (isLoggedIn){
      navigate('/mainpage')
    } else{
      window.alert('Please sign in or sign up to continue')
    }
  }
  const deleteCookie = async () => {
    const confirm_logout=window.confirm('Are you sure you want to log out..?')
    if(confirm_logout){
      document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; 
      document.cookie = 'password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      setIsLoggedIn(false);
  }
};


  return (
    <div className='Body'>
      <div>
        <h1>List of <br /> Indian satellites</h1>
      </div>
      <div>
        <h3>Space Explorations</h3>
        <p>Explore India's orbiting marvels, <br />
          revealing our nation's pioneering <br /> strides in space technology and <br /> exploration.</p>
        <nav>
          <button onClick={checkLoggedin} className='explore'>Let's Explore →</button>
        </nav>
      </div>
      <nav>
        <Link to='/' className='links'>Home</Link>
        <Link to='/about' className='links'>About</Link>
        <button className='links' onClick={checkLoggedin}>Explore</button>
        <Link to='/signup' className='links'>Sign Up</Link>
        <div className='links' id='dynamic-btn'>
          {isLoggedIn ? (
            <button id='logout-btn' onClick={deleteCookie}>Log out</button>
          ) : (
            <Link id='signin-btn' to='/login'>Sign in</Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Home;
