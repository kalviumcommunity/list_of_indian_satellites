import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import './mainpage2.css'
function Main2() {
    const [sat, setSat] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/api')
            .then(response => {
                setSat(response.data);
                console.log(response.data); 
            })
            .catch(err => console.log(err));
    }, []); 
    const sendIndex=(indexpos)=>{
        localStorage.setItem('pos',indexpos);
        console.log(indexpos)
    }
    return (
        <div className="org">
            <nav >
                <Link to='/' className='link1'>Home</Link>
                <Link to='/about' className='link1'>About</Link>
                <Link to='/mainpage' className='link1'>Explore</Link>
                <Link to='/apipage' className='link1'>Api</Link>
            </nav>
            <h1 id="title">List of Indian <br /> Satellites</h1>

            <div className="sats">
            {
                   sat.map((data, dataIndex) => (
                    <Link key={data._id} to={{ pathname: "/mainpage2"}}>
                      <button 
                        className="sat-names"  
                        onClick={() => sendIndex(dataIndex)} // Corrected
                      >
                        {data.satellite}
                      </button>
                    </Link>
                  ))
                }
            </div>
        </div>
    );
}

export default Main2;
