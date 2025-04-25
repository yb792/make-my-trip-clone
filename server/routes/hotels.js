const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');

// @desc    Search Hotels
// @route   GET /api/hotels/search
// @access  Public
router.get('/search', async (req, res) => {
  const { location, checkinDate, minPrice, maxPrice, rating, amenities, sortBy } = req.query;

  const priceFilter = {};
  if (minPrice) priceFilter.$gte = parseInt(minPrice);
  if (maxPrice) priceFilter.$lte = parseInt(maxPrice);

  const query = {};

  if (location) {
    query.location = { $regex: new RegExp(location, 'i') };
  }

  if (checkinDate) {
    query.checkinDate = checkinDate;
  }

  if (Object.keys(priceFilter).length > 0) {
    query.price = priceFilter;
  }

  if (rating) {
    query.rating = { $gte: parseFloat(rating) };
  }

  if (amenities) {
    const amenitiesArray = amenities.split(',').map(a => a.trim());
    query.amenities = { $all: amenitiesArray };
  }

  let sort = {};
  if (sortBy === 'priceAsc') sort.price = 1;
  else if (sortBy === 'priceDesc') sort.price = -1;
  else if (sortBy === 'rating') sort.rating = -1;

  try {
    const hotels = await Hotel.find(query).sort(sort);
    res.json(hotels);
  } catch (err) {
    console.error('❌ Error fetching hotels:', err.message);
    res.status(500).json({ error: 'Server error while searching hotels' });
  }
});

module.exports = router;
