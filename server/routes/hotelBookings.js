const express = require('express');
const router = express.Router();
const HotelBooking = require('../models/HotelBooking');
const auth = require('../middleware/auth');

// Create hotel booking
router.post('/', auth, async (req, res) => {
  try {
    const booking = await HotelBooking.create({
      user: req.user.id,
      ...req.body
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get user's hotel bookings
router.get('/my', auth, async (req, res) => {
  try {
    const bookings = await HotelBooking.find({ user: req.user.id }).populate('hotel');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
