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
router.get('/event', authMiddleware, async (req, res) => {
  try {
    const response = await axios.get(`${VENDOR_SERVICE_URL}/api/vendors/event`, {
      headers: { Authorization: req.headers.authorization },
      params: { eventId: req.query.eventId }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.message });
  }
});

// Update vendor status (no auth)
router.put('/status', async (req, res) => {
  try {
    const response = await axios.put(`${VENDOR_SERVICE_URL}/api/vendors/status`, {
      headers: { Authorization: req.headers.authorization },
      params: { id: req.query.id },
      ...req.body 
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.message });
  }
});

router.get('/status', async (req, res) => {
  try {
    const response = await axios.get(`${VENDOR_SERVICE_URL}/api/vendors/status`, {
      headers: { Authorization: req.headers.authorization },
      params: { status: req.query.status }
    });

    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/approveVendor', async (req, res) => {
  try {
    const response = await axios.put(`${VENDOR_SERVICE_URL}/api/vendors/approveVendor`, {}, {
      headers: { Authorization: req.headers.authorization },
      params: { vendorId: req.query.vendorId }
    })

    if (response.status === 200) {
      res.status(200).json({ message: 'Approved Successfully' });
    } else {
      res.status(401).send('Bad Request');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

router.delete('/', async (req, res) => {
  try {
    const response = await axios.delete(`${VENDOR_SERVICE_URL}/api/vendors`, {
      headers: { Authorization: req.headers.authorization },
      params: { vendorId: req.query.vendorId }
    });

    if (response.status === 200) {
      res.status(200).json(response.data);
    } else {
      res.status(response.status).send(response.statusText);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/getVendorByChoice', async (req, res) => {
  try {
    const response = await axios.get(`${VENDOR_SERVICE_URL}/api/vendors/getVendorByChoice`, {
      headers: {
        Authorization: req.headers.authorization
      },
      params: {
        location: req.query.location,
        date: req.query.date
      }
    });

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
