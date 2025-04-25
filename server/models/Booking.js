const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
    },
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flight',
    },
    seats: {
      type: Number,
      default: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['hotel', 'flight'],
      required: true,
    },
  },
  {
    timestamps: true, // ✅ adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Booking', bookingSchema);
