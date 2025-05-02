const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
    unique: true  // Optional: Only one order per event?
  },
  orderId: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);


// public class Order {
//     @Id
//     private Long eventId;
//     private String orderId;

// }