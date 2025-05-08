const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const venueController = require('../controllers/venueController');

router.post('/', venueController.createVenue);
router.get('/', authMiddleware, venueController.getAllVenues);
router.get('/getByLocation', authMiddleware, venueController.getByLocation);
router.put('/updateDate', authMiddleware, venueController.addBookingDate);
router.get('/:id', authMiddleware, venueController.getVenueById);
router.put('/:id', authMiddleware, venueController.updateVenue);
router.delete('/:id', authMiddleware, venueController.deleteVenue);

module.exports = router;
