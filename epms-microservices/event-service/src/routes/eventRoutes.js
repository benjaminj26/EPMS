const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const controller = require('../controllers/eventController');

router.post('/', auth, controller.createEvent);
router.get('/', auth, controller.getEvents);
router.get('/eventDate', auth, controller.getEventsByDate);
router.get('/:id', auth, controller.getEventById);
router.put('/:id', auth, controller.updateEvent);
router.delete('/:id', auth, controller.deleteEvent);

module.exports = router;
