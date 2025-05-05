const express = require('express');
const axios = require('axios');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
require('dotenv').config();

const GUEST_SERVICE_URL = process.env.GUEST_SERVICE_URL;

// Add guest
router.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${GUEST_SERVICE_URL}/api/guests`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.message });
  }
});

// Get guests by eventId
router.get('/event/:eventId', async (req, res) => {
  try {
    const response = await axios.get(`${GUEST_SERVICE_URL}/api/guests/event/${req.params.eventId}`, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.message });
  }
});

// Guest RSVP (no auth)
router.put('/:id/rsvp', async (req, res) => {
  try {
    const response = await axios.put(`${GUEST_SERVICE_URL}/api/guests/${req.params.id}/rsvp`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.message });
  }
});

module.exports = router;
