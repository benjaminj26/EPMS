const express = require('express');
const axios = require('axios');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
require('dotenv').config();

const EVENT_SERVICE_URL = process.env.EVENT_SERVICE_URL;

router.get('/', authMiddleware, async (req, res) => {
  try {
    const response = await axios.get(`${EVENT_SERVICE_URL}/api/events`, {
      headers: {
        Authorization: req.headers.authorization
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const response = await axios.post(`${EVENT_SERVICE_URL}/api/events`, req.body, {
      headers: {
        Authorization: req.headers.authorization
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

module.exports = router;
