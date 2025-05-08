const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;

router.post('/register', async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/api/auth/register`, req.body);
    res.send(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    // console.log(`Sending request to ${AUTH_SERVICE_URL}/api/auth/login`);
    const response = await axios.post(`${AUTH_SERVICE_URL}/api/auth/login`, req.body);
    res.send(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

router.post('/reset-password/:token', async (req, res) => {
  try {
    const token = req.params.token;

    const response = await axios.post(`${AUTH_SERVICE_URL}/api/auth/reset-password/${token}`, {
      password: req.body.password
    });

    res.status(response.status).json({ message: response.statusText });
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: err.message });
  }
});

router.post('/user/forgot-password', async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/api/auth/user/forgot-password`, {
      email: req.body.email
    });

    res.status(response.status).json({ message: response.statusText });
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
