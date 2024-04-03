import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import './mainpage2.css';

function Main2() {
    const [sat, setSat] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedId, setSelectedId] = useState("all");

    useEffect(() => {
        axios.get('http://localhost:3000/api/users/names')
            .then(response => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (selectedId === "all") {
            axios.get(`http://localhost:3000/api/satellite`)
                .then(response => {
                    setSat(response.data);
                    console.log(response.data); 
                })
                .catch(err => console.log(err));
        } else {
            axios.get(`http://localhost:3000/api/satellite/${selectedId}`)
                .then(response => {
                    setSat(response.data);
                    console.log(response.data); 
                })
                .catch(err => console.log(err));
        }
    }, [selectedId]);

    const handleFilter = (e) => {
        console.log(e.target.value);
        setSelectedId(e.target.value);
    };
    
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            axios.delete(`http://localhost:3000/api/deleteSat/${id}`)
                .then(response => {
                    location.reload();
                    console.log(response);
                })
                .catch(err => console.log(err));
        }
    };

    const sendIndex = (indexpos) => {
        localStorage.setItem('pos', indexpos);
        console.log(indexpos);
    };

    return (
        <div className="org">
            <nav >
                <Link to='/' className='link1'>Home</Link>
                <Link to='/about' className='link1'>About</Link>
                <Link to='/mainpage' className='link1'>Explore</Link>
                <Link to='/apipage' className='link1'>Api</Link>
            </nav>
            <h1 id="title">List of Indian <br /> Satellites</h1>
            <Link to='/updatesat' id="add-sat">Add New Satellite +</Link>
            <div className="sats">
            {
                sat.map((data, dataIndex) => (
                    <Link key={data._id} to={{ pathname: "/mainpage2"}}>
                        <button 
                            className="sat-names"  
                            onClick={() => sendIndex(dataIndex)}
                        >
                            {data.satellite}
                            <Link className="edit-btn" to={`/editSat/${data._id}`}> Edit +</Link>
                            <Link className="delete-btn" to='/mainpage' onClick={(e) => handleDelete(data._id)}>Delete ×</Link>
                        </button>
                    </Link>
                ))
            }
            </div>
            <div className="dropdown">
                <select name="userDropdown" id="userDropdown" onChange={handleFilter}>
                    <option value="all">Created By</option>
                    {users.map((user, index) => (
                        <option key={index} value={user._id}>
                            {user.userName}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Main2;
