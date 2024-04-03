import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './mainpage.css'
import axios from "axios";
import { useLocation } from 'react-router-dom';

function Main() {
  const location = useLocation();
  const [index, setIndex] = useState(parseInt(localStorage.getItem('pos'), 10) || 0);
  const [sat, setSat] = useState([]);

  const increment = () => {
    setIndex(prevIndex => (prevIndex < sat.length - 1 ? prevIndex + 1 : 0));
  };
  
  const decrement = () => {
    setIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : sat.length - 1));
  };

  useEffect(() => {
    axios.get('http://localhost:3000/api/satellite')
      .then(response => {
        setSat(response.data);
        console.log(response.data[0]);
        console.log(response.data) 
      })
      .catch(err => console.log(err));
  }, []); 

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key){
          case "ArrowRight":
              increment()
              break;
          case "ArrowLeft":
              decrement()
              break;
          default:
              break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [increment, decrement]);

  return (
    <div className='Baground'>
      <div>
        {sat.length > 0 && <h2 className='sat-name'>{sat[index].satellite}</h2>}
        {sat.length > 0 && <h4 className='sat-agenda'>{sat[index].agenda}</h4>}
      </div>
      <div className='launch-data'>
        <h3 className='laun-date'>Launch Date: </h3>
        <h3 className='laun-vehicle'> Launch Vehicle:</h3>
        <h3 className='laun-site'> Launch Site:</h3>
      </div>
      <div className='launch-datas'>
        {sat.length > 0 && <h5 className='lauch-date'>{sat[index].launch_date} </h5>}
        {sat.length > 0 && <h5 className='lauch-vehicle'>{sat[index].launch_vehicle}</h5>}
        {sat.length > 0 && <h5 className='lauch-site'>{sat[index].launch_site}</h5>}
      </div>
      <div>
        {sat.length > 0 && <img src={sat[index].image_url} alt="" className='sat-image'/>}
      </div>
      <Link to='/mainpage' className='back-button'>← Satellite Lists</Link>
      <button className='back-btn' onClick={decrement}>← Back</button>
      <button className='next-btn' onClick={increment}>Next →</button>

      <nav className='all'>
        <Link to='/' className='link'>Home</Link>
        <Link to='/about' className='link'>About</Link>
        <Link to='/mainpage' className='link'>Explore</Link>
        <Link to='/apipage' className='link'>Api</Link>
      </nav>
    </div>
  );
}

export default Main;
