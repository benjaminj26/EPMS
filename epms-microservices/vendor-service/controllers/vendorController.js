const Vendor = require('../models/Vendor');

// Add vendor to event
exports.addVendor = async (req, res) => {
  try {
    const vendor = await Vendor.create(req.body);
    res.status(201).json(vendor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get vendors by event
exports.getVendorsByEvent = async (req, res) => {
  try {
    const vendors = await Vendor.find({ eventId: req.params.eventId });
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update vendor status
exports.updateVendorStatus = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(vendor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
