const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');

// GET /api/flights - Get all flights
router.get('/', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    console.error('❌ Error fetching flights:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/flights/search - Search flights with filters
router.get('/search', async (req, res) => {
  const { source, destination, departureDate, minPrice, maxPrice } = req.query;

  try {
    const query = {};

    if (source) query.from = source;
    if (destination) query.to = destination;

    if (departureDate) {
      const startOfDay = new Date(departureDate);
      const endOfDay = new Date(departureDate);
      endOfDay.setDate(endOfDay.getDate() + 1);
      query.departureDate = { $gte: startOfDay, $lt: endOfDay };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const flights = await Flight.find(query);
    res.json(flights);
  } catch (err) {
    console.error('❌ Error searching flights:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST /api/flights - Add a new flight
router.post('/', async (req, res) => {
  const {
    airline,
    from,
    to,
    fromCode,
    toCode,
    departureDate,
    departureTime,
    arrivalTime,
    price
  } = req.body;

  // 🚨 Validate required fields
  if (
    !airline ||
    !from ||
    !to ||
    !fromCode ||
    !toCode ||
    !departureDate ||
    !departureTime ||
    !arrivalTime ||
    !price
  ) {
    return res.status(400).json({ message: 'Missing required flight fields' });
  }

  try {
    const newFlight = new Flight({
      airline,
      from,
      to,
      fromCode,
      toCode,
      departureDate,
      departureTime,
      arrivalTime,
      price
    });

    await newFlight.save();
    res.status(201).json(newFlight);
  } catch (err) {
    console.error('❌ Error adding flight:', err);
    res.status(500).json({ message: 'Failed to add flight' });
  }
});

// PUT /api/flights/:id - Update an existing flight
router.put('/:id', async (req, res) => {
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedFlight);
  } catch (err) {
    console.error('❌ Error updating flight:', err);
    res.status(500).json({ message: 'Failed to update flight' });
  }
});

// DELETE /api/flights/:id - Delete a flight
router.delete('/:id', async (req, res) => {
  try {
    await Flight.findByIdAndDelete(req.params.id);
    res.json({ message: 'Flight deleted' });
  } catch (err) {
    console.error('❌ Error deleting flight:', err);
    res.status(500).json({ message: 'Failed to delete flight' });
  }
});

module.exports = router;
