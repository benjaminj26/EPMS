const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vendorIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor'
  }],
  venueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue'
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'PAID'],
    default: 'PENDING'
  },
  status: {
    type: String,
    enum: ['CONFIRMED', 'CANCELLED', 'COMPLETED', 'PENDING'],
    default: 'CONFIRMED'
  }
}, {
  timestamps: true
});

// Transient guestList (not stored in DB, added at runtime)
eventSchema.virtual('guestList', {
    ref: 'Guest',
    localField: '_id',
    foreignField: 'eventId'
});

eventSchema.set('toJSON', {
  transform: function (doc, ret) {
    if (ret.date) {
      ret.date = new Date(ret.date).toISOString().split('T')[0];
    }
    return ret;
  }
});
  

module.exports = mongoose.model('Event', eventSchema);

    // private Long id;
    // private String name;
    // private Date date;
    // private String type;
    // private Long userId;
    // private List<Long> vendorIds;
    // private Long venueId;
    // @Transient
    // private List<Guest> guestList;
    // private PaymentStatus paymentStatus = PaymentStatus.PENDING;
    // @Enumerated(EnumType.STRING)
    // private EventStatus status=EventStatus.CONFIRMED;