const Guest = require('../models/Guest');

// Add guest to event
exports.addGuest = async (req, res) => {
  try {
    const guest = await Guest.create({ ...req.body, invitedAt: new Date() });
    res.status(201).json(guest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all guests for an event
exports.getGuestsByEvent = async (req, res) => {
  try {
    const guests = await Guest.find({ eventId: req.params.eventId });
    res.json(guests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update RSVP
exports.updateRSVP = async (req, res) => {
  try {
    const guest = await Guest.findByIdAndUpdate(
      req.params.id,
      { rsvp: req.body.rsvp },
      { new: true }
    );
    res.json(guest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
