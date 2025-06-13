const mongoose = require('mongoose');
const Flight = require('../../models/Flight');
const Hotel = require('../../models/Hotel');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected for test data seeding');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

const seedTestData = async () => {
  await connectDB();

  // Optional: Clear old test data
  await Flight.deleteMany({ airline: /Test/ });
  await Hotel.deleteMany({ name: /Test/ });

  // Insert test flight
  const flight = await Flight.create({
    airline: 'Test Flight Airline',
    from: 'Bangalore',
    to: 'Chennai',
    departureDate: '2025-07-05',
    price: 4000,
  });

  // Insert test hotel
  const hotel = await Hotel.create({
    name: 'Test Hotel Paradise',
    location: 'Jaipur',
    price: 2500,
    rating: 4,
    amenities: ['wifi', 'pool'],
  });

  return { flightId: flight._id.toString(), hotelId: hotel._id.toString() };
};

module.exports = seedTestData;
