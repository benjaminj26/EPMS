const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
const EVENT_SERVICE_URL = process.env.EVENT_SERVICE_URL;

router.get('/getUser', async (req, res) => {
  const username = req.query.username;
  // console.log('Username: ', username);
  try {
    // console.log(`${AUTH_SERVICE_URL}/api/auth/getUser`);
    const response = await axios.get(`${AUTH_SERVICE_URL}/api/auth/getUser`, {
      headers: {
        Authorization: req.headers.authorization
      },
      params: { username: username }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

router.get('/events', async (req, res) => {
  try {
    const userId = req.query.userId;

    const response = await axios.get(`${EVENT_SERVICE_URL}/api/events`, {
      headers: {
        Authorization: req.headers.authorization
      },
      params: { id: userId }
    })

    if (response.status === 200) {
      res.status(200).json(response.data);
    } else {
      res.status(response.status).json({ error: response.statusText });
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: err.message });
  }
});

module.exports = router;