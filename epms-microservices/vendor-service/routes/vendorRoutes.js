const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, vendorController.addVendor);
router.get('/event/:eventId', authMiddleware, vendorController.getVendorsByEvent);
router.put('/:id/status', vendorController.updateVendorStatus); // No auth: vendors can update status via secure link

module.exports = router;
