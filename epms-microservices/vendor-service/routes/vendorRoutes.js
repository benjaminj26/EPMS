const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', vendorController.addVendor);
router.delete('/', vendorController.deleteVendor);
router.get('/status', vendorController.getVendorsByStatus);
router.get('/event', vendorController.getVendorsByEvent);
router.put('/status', vendorController.updateVendorStatus); // No auth: vendors can update status via secure link
router.put('/approveVendor', vendorController.approveVendor);
router.get('/getVendorByChoice', vendorController.getVendorByChoice);

module.exports = router;
