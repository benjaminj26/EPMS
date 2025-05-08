const Venue = require('../models/Venue');

// CREATE a new venue
exports.createVenue = async (req, res) => {
  try {
    const venue = new Venue(req.body);
    const savedVenue = await venue.save();
    res.status(201).json(savedVenue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ all venues
exports.getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find();
    res.status(200).json(venues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ a single venue by ID
exports.getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }
    res.status(200).json(venue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE a venue by ID
exports.updateVenue = async (req, res) => {
  try {
    const updatedVenue = await Venue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedVenue) {
      return res.status(404).json({ message: 'Venue not found' });
    }
    res.status(200).json(updatedVenue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE a venue by ID
exports.deleteVenue = async (req, res) => {
  try {
    const deletedVenue = await Venue.findByIdAndDelete(req.params.id);
    if (!deletedVenue) {
      return res.status(404).json({ message: 'Venue not found' });
    }
    res.status(200).json({ message: 'Venue deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByLocation = async (req, res) => {
    try {
        const date = req.query.date;
        const location = req.query.location;

        const availableVenues = await Venue.find({
            venueLocation: location,
            bookedDates: { $ne: date }
        });

        res.status(200).json(availableVenues);
          
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

exports.addBookingDate = async (req, res) => {
  try {
    const venue = await Venue.findByIdAndUpdate(
      { _id: req.query.venueId },
      { $push: { bookedDates: req.body.date } }
    );

    res.status(200).json(venue);
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: err.message });
  }
};