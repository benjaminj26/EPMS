const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventController');

router.post('/', controller.createEvent);
router.get('/', controller.getEventsByUserId);
router.get('/eventDate', controller.getEventsByDate);
router.get('/:id', controller.getEventById);
router.put('/:id', controller.updateEvent);
router.delete('/:id', controller.deleteEvent);

module.exports = router;
