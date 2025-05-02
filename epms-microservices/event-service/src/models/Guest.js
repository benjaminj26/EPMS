const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Event',
  },
  guestName: String,
  guestEmail: String,
  guestPhone: String,
  rsvp: {
    type: String,
    enum: ['Pending', 'Accepted', 'Declined'],
    default: 'Pending',
  },
  invitedAt: Date,
});

module.exports = mongoose.model('Guest', guestSchema);

// public class Guest {
//     private Long guestId;
//     private String guestName;
//     private String guestEmail;
//     private String guestPhone;
//     private Long eventId;
// }