const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const Hotel = require('../models/Hotel');

// ✅ Get all bookings for logged-in user
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('flight')
      .populate('hotel')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error('❌ Error fetching bookings:', err);
    res.status(500).json({ error: 'Error fetching user bookings' });
  }
});

// ✅ Book a flight
router.post('/flight', authMiddleware, async (req, res) => {
  try {
    const { flight, seats = 1, totalPrice } = req.body;

    const selectedFlight = await Flight.findById(flight);
    if (!selectedFlight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    const newBooking = new Booking({
      user: req.user._id,
      flight,
      seats,
      totalPrice,
      type: 'flight',
    });

    await newBooking.save();
    res.status(201).json({ message: 'Flight booked successfully', booking: newBooking });
  } catch (err) {
    console.error('❌ Flight booking failed:', err);
    res.status(500).json({ message: 'Failed to book flight' });
  }
});

// ✅ Book a hotel
router.post('/hotel', authMiddleware, async (req, res) => {
  try {
    const { hotel, totalPrice } = req.body;

    const selectedHotel = await Hotel.findById(hotel);
    if (!selectedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    const newBooking = new Booking({
      user: req.user._id,
      hotel,
      totalPrice,
      type: 'hotel',
    });

    await newBooking.save();
    res.status(201).json({ message: 'Hotel booked successfully', booking: newBooking });
  } catch (err) {
    console.error('❌ Hotel booking failed:', err);
    res.status(500).json({ message: 'Failed to book hotel' });
  }
});

// ✅ Cancel a booking
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found or not authorized' });
    }

    await Booking.findByIdAndDelete(booking._id); // ✅ Delete the booking

    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    console.error('❌ Booking cancel failed:', err);
    res.status(500).json({ message: 'Failed to cancel booking' });
  }
});

module.exports = router;
