const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');

// GET /api/flights/search - Search flights with filters
router.get('/search', async (req, res) => {
  const { source, destination, departureDate, minPrice, maxPrice, sortBy } = req.query;

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

    let sortOption = {};
    if (sortBy === 'price-asc') sortOption.price = 1;
    if (sortBy === 'price-desc') sortOption.price = -1;

    const flights = await Flight.find(query).sort(sortOption);
    res.json(flights);
  } catch (err) {
    console.error('❌ Error searching flights:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
