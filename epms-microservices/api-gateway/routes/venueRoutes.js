const express = require('express');
const axios = require('axios');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
require('dotenv').config();
const multer = require('multer');

const storage = multer.memoryStorage(); // Or use multer.diskStorage({...}) if saving to disk
const upload = multer({ storage: storage });

const VENUE_SERVICE_URL = process.env.VENUE_SERVICE_URL;

router.get('/getByLocation', authMiddleware, async (req, res) => {
    try {
        const response = await axios.get(`${VENUE_SERVICE_URL}/api/venue/getByLocation`, {
            headers: {
                Authorization: req.headers.authorization
            },
            params: {
                date: req.query.date,
                location: req.query.location
            }
        });

        if (response.status === 200) {
            res.status(200).json(response.data);
        } else {
            res.status(response.status).json({ message: response.statusText });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

router.post('/', upload.array('images'), async (req, res) => {
    try {
        console.log(req.body);
        const response = await axios.post(`${VENUE_SERVICE_URL}/api/venue`, req.body);

        res.status(response.status).json(response.data);
        // res.status(200);
    } catch (err) {
        console.log(err);

        res.status(500).json({ error: err.message });
    }
});

module.exports = router;