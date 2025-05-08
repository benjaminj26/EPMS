const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const venueSchema = new Schema({
  venueName: {
    type: String,
    required: true
  },
  venueLocation: {
    type: String,
    required: true
  },
  venueEmail: {
    type: String,
    required: true
  },
  venuePhone: {
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
  },
  images: [{
    type: [String]
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Venue', venueSchema);
