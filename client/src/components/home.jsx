import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';
function Home() {
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
        <Link to='/apipage' className='links'>Api</Link>
      </nav>
    </div>
  );
}

export default Home;
