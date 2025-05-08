const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', vendorController.addVendor);
router.delete('/', vendorController.deleteVendor);
router.get('/status', authMiddleware, vendorController.getVendorsByStatus);
router.get('/event', authMiddleware, vendorController.getVendorsByEvent);
router.put('/status', authMiddleware, vendorController.updateVendorStatus); // No auth: vendors can update status via secure link
router.put('/approveVendor', authMiddleware, vendorController.approveVendor);
router.get('/getVendorByChoice', authMiddleware, vendorController.getVendorByChoice);
router.get('/getVendorsByID', authMiddleware, vendorController.getVendorsByID);
router.put('/', authMiddleware, vendorController.updateVendors);

module.exports = router;
