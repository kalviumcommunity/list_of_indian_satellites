const express = require('express');
const router = express.Router();
const satellite = require('./scheema');
const Joi = require("joi");
const { validateSatellite } = require("./validator"); 
const person = require('./userSchema')
const jwt = require('jsonwebtoken')
require('dotenv').config()
require('dotenv').config
router.get('/', async (req, res) => {
    try {
        const satellites = await satellite.find();
        res.json(satellites);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const satelliteFound = await satellite.findById(req.params.id);
        if (!satelliteFound) {
            return res.status(404).json({ error: "Satellite not found" });
        }
        res.json(satelliteFound);
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


// for user login
router.post('/signup',async(req,res)=>{
    try{
        const user = await person.create({
            userName:req.body.userName,
            password:req.body.password
        })
        res.send(user)
    }catch(err){
        console.error(err)
    }
  
})

router.post('/login', async (req, res) => {
    try {
        const checkUser = await person.findOne({ userName: req.body.userName });
        
        if (checkUser) {
            const token = jwt.sign({ userId: checkUser.userName }, process.env.ACCESS_TOKEN);
            return res.json({ message: "Login Successful", name: checkUser.userName, accessToken: token });
        } else {
            return res.status(401).json({ error: 'Invalid username / password' });
        }else{
            res.status(200).json({ message:'login sucessful' });
        }
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

  
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/logout',(req,res)=>{
    res.clearCookie('username')
    res.clearCookie('password')
  
    res.status(200).json({message:'Logout succesful'})
  })
module.exports = router;
  router.post('/auth', async(req,res) => {
    try{
        const {username,password} = req.body
    const user = {
        "username" : username,
        "password" : password
    }
    const ACCESS_TOKEN = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '1d' });
    res.cookie('token',ACCESS_TOKEN,{maxAge:365*24*60*60*100})
    res.json({ "accessToken": ACCESS_TOKEN });
  }catch(err){
    console.error(err)
    res.status(500).json({error:'Internal Server Error'})
  }
  });
module.exports = router;
