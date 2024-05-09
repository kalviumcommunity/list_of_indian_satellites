import React from "react";
import { BrowserRouter, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './updatepage.css'

function Update(){
    const [ satellite,setSatName]=useState()
    const [agenda,setSatAgenda]=useState()
    const [launch_date,setLaunchDate]=useState()
    const [launch_vehicle,setLaunchVehicle]=useState()
    const [ launch_site,setLaunchSite]=useState()
    const [image_url,setImageurl]=useState()
    const navigate = useNavigate()
    const updated_user = localStorage.getItem('user')
    console.log(updated_user)
    const submit =(e)=>{
        e.preventDefault();
        axios.post("https://list-of-indian-satellites-1.onrender.com/api/add-satellite",{ satellite,agenda,launch_date,launch_vehicle, launch_site,image_url,updated_user})
        .then(result=>{
            console.log(result)
            navigate('/mainpage')
        })
        .catch(err=>console.log(err))
    }
    return(
        <div className="update-body">
            <h1 id="title1">Add new Satellite</h1>
            
            <div>
                <form onSubmit={submit}>
                    <div className="add-sat-name">
                        <label htmlFor="">Satellite Name:</label>
                        <input type="text" placeholder="eg.Aaryabhata" id="" onChange={(e)=>setSatName(e.target.value)} />
                    </div>
                    <div className="add-sat-agenda">
                        <label htmlFor="">Satellite Agenda:</label>
                        <input type="text" placeholder="eg.earth science" id="" onChange={(e)=>setSatAgenda(e.target.value)} />
                    </div>
                    <div className="add-laun-date">
                        <label htmlFor="">Launch Date:</label>
                        <input type="text" placeholder="eg.12/04/1987" id="" onChange={(e)=>setLaunchDate(e.target.value)} />
                    </div>
                    <div className="add-laun-vehicle">
                        <label htmlFor="">Launch Vehicle:</label>
                        <input type="text" placeholder="eg.inter kosmos" id="" onChange={(e)=>setLaunchVehicle(e.target.value)} />
                    </div>
                    <div className="add-laun-site">
                        <label htmlFor="">Launch Site:</label>
                        <input type="text" placeholder="eg.Sriharikota" id="" onChange={(e)=>setLaunchSite(e.target.value)} />
                    </div>
                    <div className="add-image-url">
                        <label htmlFor="">Image Url:</label>
                        <input type="text" placeholder="optional" id="" onChange={(e)=>setImageurl(e.target.value)} />
                    </div>
                    <button type="submit" className="submit-btn">Update</button>
                </form>
                <Link to='/mainpage' className="back-button">← Back</Link>
            </div>
        </div>
    )
}
export default Update;