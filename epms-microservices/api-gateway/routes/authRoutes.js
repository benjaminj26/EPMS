const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;

router.post('/register', async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/api/auth/register`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log(`Sending request to ${AUTH_SERVICE_URL}/api/auth/login`);
    const response = await axios.post(`${AUTH_SERVICE_URL}/api/auth/login`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

module.exports = router;
