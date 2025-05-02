const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;

router.get('/getUser', async (req, res) => {
    const username = req.query.username;
    console.log('Username: ', username);
    try {
        console.log(`${AUTH_SERVICE_URL}/api/auth/getUser`);
        const response = await axios.get(`${AUTH_SERVICE_URL}/api/auth/getUser`, {
            params: { username: username }
        });
        res.json(response.data);
      } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
      }
})

module.exports = router;