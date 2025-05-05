const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, vendorController.addVendor);
router.delete('/', authMiddleware, vendorController.deleteVendor);
router.get('/status', authMiddleware, vendorController.getVendorsByStatus);
router.get('/event', authMiddleware, vendorController.getVendorsByEvent);
router.put('/status', authMiddleware, vendorController.updateVendorStatus); // No auth: vendors can update status via secure link
router.put('/approveVendor', authMiddleware, vendorController.approveVendor);

module.exports = router;
