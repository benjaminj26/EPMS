const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const venueSchema = new Schema({
  venueName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  rent: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  bookedDates: [
    {
      type: Date
    }
  ],
  address: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Venue', venueSchema);
