const express = require('express');
const axios = require('axios');
const router = express.Router();
const EventDTO = require('../dto/Event.DTO');
const qs = require('qs');
require('dotenv').config();

const EVENT_SERVICE_URL = process.env.EVENT_SERVICE_URL;
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
const VENDOR_SERVICE_URL = process.env.VENDOR_SERVICE_URL;
const VENUE_SERVICE_URL = process.env.VENUE_SERVICE_URL;

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${EVENT_SERVICE_URL}/api/events/${req.query.eventId}`, {
      headers: {
        Authorization: req.headers.authorization
      }
    });

    if (response.status === 200) {
      const event = response.data;
      // console.log('Event:\n', event);

      const userId = event.userId;
      // console.log('User UUID: ', userId);

      const userResponse = await axios.get(`${AUTH_SERVICE_URL}/api/auth/getUserByUUID`, {
        headers: {
          Authorization: req.headers.authorization
        },
        params: {
          uuid: userId
        }
      });

      const user = userResponse.data
      // console.log(user);

      const vendorIds = event.vendorIds;
      // console.log('Type of Vendor IDS:\n', vendorIds);

      // const temp = 

      const vendorResponse = vendorIds[0] === null ? null : await axios.get(`${VENDOR_SERVICE_URL}/api/vendors/getVendorsByID`, {
        headers: {
          Authorization: req.headers.authorization
        },
        params: { vendorIds: vendorIds },
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' })
      });

      const vendors = vendorResponse === null ? null : vendorResponse.data;

      // console.log("Vendors:\n", vendors);

      const venueId = event.venueId;

      const venueResponse = await axios.get(`${VENUE_SERVICE_URL}/api/venue/${venueId}`, {
        headers: {
          Authorization: req.headers.authorization
        }
      });

      const venue = venueResponse === null ? null : venueResponse.data;

      // console.log('Venue: ', venue);

      const budget = vendors.reduce((accumulator, currentValue) => accumulator + currentValue.rate, 0) + venue.rent;

      // console.log('Rent: ', venue.rent);
      // budget += venue.rent;

      let eventDTO = new EventDTO({
        id: event._id,
        name: event.name,
        date: event.date,
        type: event.type,
        host: user.name,
        guestList: [
          'Irfan',
          'Ashin',
          'Sharath'
        ],
        paymentStatus: event.paymentStatus,
        status: event.status,
        userId: event.userId,
        vendorIds: vendorIds,
        vendorList: vendors,
        venueId: event.venueId,
        venue: venue.venueName,
        address: venue.address,
        budget: budget,
        orderId: 'asibdq87182',
        vendorMap: {
          'Key1': 'Val1',
          'Key2': 'Val2'
        },
        rate: venue.rent,
        email: venue.venueEmail,
        location: venue.venueLocation
      });
      res.status(200).json(eventDTO);
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
    console.log(req.body.venueId);
    const date = req.body.date;

    const response = await axios.post(`${EVENT_SERVICE_URL}/api/events`, req.body, {
      headers: {
        Authorization: req.headers.authorization
      }
    });
    
    const venueResponse = await axios.put(`${VENUE_SERVICE_URL}/api/venue/updateDate`, 
      { date },
      { 
        headers: { Authorization: req.headers.authorization },
        params: { venueId: req.body.venueId }
      }
    );

    console.log('Venue Response: ', venueResponse.data);

    const vendorResponse = await axios.put(`${VENDOR_SERVICE_URL}/api/vendors`,
      {
        vendorIds: req.body.vendorIds,
        date: req.body.date
      },
      {
        headers: { Authorization: req.headers.authorization }
      }
    );

    console.log('Vendor Response: ', vendorResponse.data);
    
    res.status(200).json(response.data);
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

router.put('/paymentUpdate', async (req, res) => {
  try {
    const response = await axios.put(`${EVENT_SERVICE_URL}/api/events/${req.query.eventId}`,
      { status: req.body.status },
      { headers: { authorization: req.headers.authorization } }
    );

    if (response.status === 200) {
      res.status(200).json(response.data);
    } else {
      res.status(response.status).json({ message: response.statusText });
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
