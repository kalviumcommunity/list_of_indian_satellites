const express = require('express');
const router = express.Router();
const satellite = require('./scheema');

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
    const newSatellite = new satellite({
        SatelliteId: req.body.SatelliteId,
        satellite:req.body.satellite,
        agenda: req.body.agenda,
        launch_date: req.body.launch_date,
        launch_vehicle: req.body.launch_vehicle,
        launch_site: req.body.launch_site,
    });
    try {
        const saveSatellite = await newSatellite.save();
        res.json(saveSatellite);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.patch('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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
