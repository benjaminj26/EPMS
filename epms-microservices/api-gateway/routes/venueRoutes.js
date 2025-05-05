const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const VENUE_SERVICE_URL = process.env.VENUE_SERVICE_URL;

router.get('/getByLocation', async (req, res) => {
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

module.exports = router;