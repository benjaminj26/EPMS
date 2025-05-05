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
    const vendors = await Vendor.find({ eventId: req.query.eventId });
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update vendor status
exports.updateVendorStatus = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.query.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(vendor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getVendorsByStatus = async (req, res) => {
  try {
    const status = req.query.status;
    const vendors = await Vendor.find({ status: status });

    res.status(200).json(vendors);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

exports.approveVendor = async (req, res) => {
  try {
    const vendorId = req.query.vendorId;

    await Vendor.updateOne(
      { _id: vendorId },
      { $set: { status: 'APPROVED' } }
    );

    res.status(200).json({ message: 'Apporved Successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

exports.deleteVendor = async (req, res) => {
  try {
    const vendorId = req.query.vendorId;
    await Vendor.deleteOne({ _id: vendorId });

    res.status(200).json({ message: 'Deleted Successfully' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getVendorByChoice = async (req, res) => {
  try {
    const location = req.query.location;
    const date = req.query.date;

    const vendors = await Vendor.find({
      vendorLocation: location,               // Match location
      bookedDates: { $ne: new Date(date) },   // Date NOT in bookedDates
      status: 'APPROVED'                      // Status is APPROVED
    });

    res.status(200).json(vendors);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};