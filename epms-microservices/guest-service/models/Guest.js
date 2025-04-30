const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Event',
  },
  name: String,
  email: String,
  phone: String,
  rsvp: {
    type: String,
    enum: ['Pending', 'Accepted', 'Declined'],
    default: 'Pending',
  },
  invitedAt: Date,
});

module.exports = mongoose.model('Guest', guestSchema);
