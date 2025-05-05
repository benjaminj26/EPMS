const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const EVENT_SERVICE_URL = process.env.EVENT_SERVICE_URL;

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${EVENT_SERVICE_URL}/api/events/${req.query.eventId}`, {
      headers: {
        Authorization: req.headers.authorization
      }
    });

    if (response.status === 200) {
      res.status(200).json(response.data);
    } else {
      res.status(response.status).json({ error: response.statusText });
    }
  } catch (error) {
    console.log(error);

    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
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

router.get('/eventDate', async (req, res) => {
  try {
    const date = req.query.date;
    // console.log(req.headers.authorization);

    const response = await axios.get(`${EVENT_SERVICE_URL}/api/events/eventDate`, {
      headers: {
        Authorization: req.headers.authorization
      },
      params: { date: date }
    });

    res.status(200).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.message });
  }
});

module.exports = router;
