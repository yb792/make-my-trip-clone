const mongoose = require('mongoose');
const Hotel = require('./models/Hotel');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Hotel.deleteMany();

  await Hotel.insertMany([
    {
      name: 'Taj Hotel',
      location: 'Mumbai',
      rating: 5,
      price: 7500,
      amenities: ['wifi', 'pool', 'spa'],
      checkinDate: '2025-06-30',
    },
    {
      name: 'Budget Inn',
      location: 'Delhi',
      rating: 3,
      price: 2500,
      amenities: ['wifi', 'parking'],
      checkinDate: '2025-06-30',
    },
    {
      name: 'Sea View Resort',
      location: 'Goa',
      rating: 4,
      price: 5200,
      amenities: ['wifi', 'pool', 'spa'],
      checkinDate: '2025-06-30',
    }
  ]);

  console.log('🏨 Hotels seeded successfully!');
  mongoose.disconnect();
});
