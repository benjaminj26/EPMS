const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Event',
  },
  name: String,
  serviceType: String, // e.g., Catering, Photography
  email: String,
  phone: String,
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'In Progress', 'Completed'],
    default: 'Pending',
  },
  notes: String
});

module.exports = mongoose.model('Vendor', vendorSchema);
