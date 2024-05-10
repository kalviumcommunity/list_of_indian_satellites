const express = require('express');
const router = express.Router();
const satellite = require('./scheema');
const Joi = require("joi");
const { validateSatellite } = require("./validator"); 
const person = require('./userSchema')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.get('/satellite', async (req, res) => {
    try {
        const satellites = await satellite.find();
        res.json(satellites);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const satelliteFound = await satellite.findById(req.params.id)
        if (!satelliteFound) {
            return res.status(404).json({ error: "Satellite not found" });
        }
        res.json(satelliteFound);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/satellite/:updated_user', async (req, res) => {
    try {
        const satellitesFound = await satellite.find({ updated_user: req.params.updated_user });
        if (satellitesFound.length === 0) {
            return res.status(404).json({ error: "No satellites found for the specified updated_user" });
        }
        res.json(satellitesFound);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/add-satellite', async (req, res) => {
    try {
        const validationResult = validateSatellite(req.body);
        if (validationResult.error) {
            return res.status(400).json({ error: validationResult.error.details.map(detail => detail.message) });
        }
        const newSatellite = new satellite(req.body);
        const saveSatellite = await newSatellite.save();
        res.json(saveSatellite);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/updateSat/:id', async (req, res) => {
    try {
        const updatedSatellite = await satellite.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSatellite) {
            return res.status(404).json({ error: "Satellite not found" });
        }
        res.json(updatedSatellite);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/deleteSat/:id', async (req, res) => {
    try {
        const deletedSatellite = await satellite.findByIdAndDelete(req.params.id);
        if (!deletedSatellite) {
            return res.status(404).json({ error: "Satellite not found" });
        }
        res.json({ message: "Satellite deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/users/names', async (req, res) => {
    try {
        const users = await person.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/users/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const user = await person.findOne({ userName: username });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const user = await person.create({
            userName: req.body.userName,
            password: req.body.password
        });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await person.findOne({ userName: userName, password: password });
        
        if (user) {
            const token = jwt.sign({ userId: user.userName }, process.env.ACCESS_TOKEN);
            return res.json({ 
                message: "Login Successful", 
                name: user.userName, 
                userId: user._id,
                accessToken: token 
            });
        } else {
            return res.status(401).json({ error: 'Invalid username / password' });
        }
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.post('/logout', (req, res) => {
    res.clearCookie('access_token'); // Clear the JWT token cookie
    res.status(200).json({ message: 'Logout successful' });
});
module.exports = router;
