const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
  vendorName: {
    type: String,
    required: true
  },
  vendorEmail: {
    type: String,
    required: true,
    unique: true
  },
  vendorPhone: {
    type: String,
    required: true
  },
  vendorLocation: {
    type: String
  },
  type: {
    type: String
  },
  rate: {
    type: Number
  },
  bookedDates: [{
    type: Date,
    default: []
  }],
  images: [{
    type: [String]
  }],
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'], // Adjust to match your Java enum
    default: 'PENDING'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vendor', vendorSchema);
