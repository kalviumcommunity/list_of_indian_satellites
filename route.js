const express = require('express');
const router = express.Router();
const satellite = require('./scheema');
const Joi = require("joi");
const { validateSatellite } = require("./validator"); 

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

module.exports = router;