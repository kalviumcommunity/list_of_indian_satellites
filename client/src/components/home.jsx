import React, { useState, useEffect } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cookies = document.cookie;
    setIsLoggedIn(cookies);
  }, []); 

  const deleteCookie = async () => {
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsLoggedIn(false);
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
          <Link to='/mainpage' className='explore'>Let's Explore →</Link>
        </nav>
      </div>
      <nav>
        <Link to='/' className='links'>Home</Link>
        <Link to='/about' className='links'>About</Link>
        <Link to='/mainpage' className='links'>Explore</Link>
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
