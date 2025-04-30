const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, guestController.addGuest);
router.get('/event/:eventId', authMiddleware, guestController.getGuestsByEvent);
router.put('/:id/rsvp', authMiddleware, guestController.updateRSVP); // No auth: guests RSVP via link

module.exports = router;
