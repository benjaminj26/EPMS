const express = require('express');
const axios = require('axios');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
require('dotenv').config();

const VENDOR_SERVICE_URL = process.env.VENDOR_SERVICE_URL;

// Add vendor
router.post('/', authMiddleware, async (req, res) => {
  try {
    const response = await axios.post(`${VENDOR_SERVICE_URL}/api/vendors`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.message });
  }
});

// Get vendors by eventId
router.get('/event/:eventId', authMiddleware, async (req, res) => {
  try {
    const response = await axios.get(`${VENDOR_SERVICE_URL}/api/vendors/event/${req.params.eventId}`, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.message });
  }
});

// Update vendor status (no auth)
router.put('/:id/status', async (req, res) => {
  try {
    const response = await axios.put(`${VENDOR_SERVICE_URL}/api/vendors/${req.params.id}/status`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.message });
  }
});

module.exports = router;
