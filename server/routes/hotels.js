const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');

// @desc    Search Hotels
// @route   GET /api/hotels/search
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const {
      location = '',
      minPrice = 0,
      maxPrice = 10000,
      rating = '',
      amenities = '',
      sortBy = ''
    } = req.query;

    const query = {};

    // Location filter (case-insensitive)
    if (location.trim()) {
      query.location = { $regex: new RegExp(location.trim(), 'i') };
    }

    // Price range
    query.price = {
      $gte: parseInt(minPrice),
      $lte: parseInt(maxPrice)
    };

    // Rating filter
    if (rating.trim()) {
      query.rating = { $gte: parseFloat(rating) };
    }

    // Amenities filter (match all)
    if (amenities.trim()) {
      const amenitiesArray = amenities.split(',').map(a => a.trim()).filter(Boolean);
      if (amenitiesArray.length > 0) {
        query.amenities = { $all: amenitiesArray };
      }
    }

    // Sort options
    let sort = {};
    if (sortBy === 'price-asc') sort.price = 1;
    else if (sortBy === 'price-desc') sort.price = -1;
    else if (sortBy === 'rating-desc') sort.rating = -1;

    const hotels = await Hotel.find(query).sort(sort);
    res.json(hotels);

  } catch (err) {
    console.error('❌ Error fetching hotels:', err.message);
    res.status(500).json({ error: 'Server error while searching hotels' });
  }
});

module.exports = router;
