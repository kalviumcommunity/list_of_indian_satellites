import React from "react";
import './about.css'
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function About(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
     const cookies = document.cookie;
    setIsLoggedIn(cookies);
    }, []); 
    const checkloggedin =()=>{
        if(isLoggedIn){
            navigate('/mainpage')
        } else {
            navigate('/login')
        }
    }
    return (
        <div className="about-baground">
            <h1 className="about-heading">Linst of Indian Satellites</h1>
            <nav className='all'>
                <Link to='/' className='link'>Home</Link>
                <Link to='/about' className='link'>About</Link>
                <Link to='/mainpage' className='link'>Explore</Link>
                <Link to='/apipage' className='link'>Api</Link>
            </nav>
            <p className="about-description">Explore the curated collection of Indian satellites, showcasing the pioneering <br /> advancements made by the Indian Space Research Organisation (ISRO) in space <br /> exploration and technology. </p>
            <button className="about-loginbtn" onClick={checkloggedin}>Explore</button>
            <div className="credits">
                <h1>Credits: </h1>
                <h4>Create by: Abraham Jeron</h4>
                <h4>Special Thanks: Vishal bhai (My tech Mentor)</h4>
                <h4>UI Inspiration: <a href="https://dribbble.com/shots/15843275-Satelite-Web-Design-for-Satellite-Systems" target="_blank">Dribble.com (ourcrowd)</a></h4>
                <h4>Data Provided by : Wikipidia</h4>
                <h4>DataBase: MongoDB</h4>
            </div>
        </div>
    )
}
export default About;