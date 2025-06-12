const mongoose = require('mongoose');
const Flight = require('./models/Flight');  // Import the Flight model

const MONGODB_URI = 'mongodb+srv://yashu09:Yashu%4009@cluster0.lfs7axk.mongodb.net/mmtCloneDB?retryWrites=true&w=majority';

// ✈️ Airport codes map
const airportCodes = {
  Delhi: 'DEL',
  Mumbai: 'BOM',
};

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
  seedData();  // Seed the flight data once connected
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

async function seedData() {
  try {
    await Flight.deleteMany();  // Clear existing data (optional)

    const sampleFlights = [
      {
        airline: 'British Airways',
        from: 'Delhi',
        to: 'Mumbai',
        fromCode: airportCodes['Delhi'],
        toCode: airportCodes['Mumbai'],
        departureDate: new Date('2025-06-30T10:00:00'),
        departureTime: '10:00',
        arrivalTime: '12:15',
        price: 5000
      },
      {
        airline: 'IndiGo',
        from: 'Delhi',
        to: 'Mumbai',
        fromCode: airportCodes['Delhi'],
        toCode: airportCodes['Mumbai'],
        departureDate: new Date('2025-06-30T12:30:00'),
        departureTime: '12:30',
        arrivalTime: '14:40',
        price: 4200
      },
      {
        airline: 'Air India',
        from: 'Delhi',
        to: 'Mumbai',
        fromCode: airportCodes['Delhi'],
        toCode: airportCodes['Mumbai'],
        departureDate: new Date('2025-06-30T15:45:00'),
        departureTime: '15:45',
        arrivalTime: '17:30',
        price: 4800
      }
    ];
    
    await Flight.insertMany(sampleFlights);
    console.log('✅ Sample flight data inserted with airport codes');
    process.exit();  // Exit after seeding
  } catch (err) {
    console.error('❌ Error inserting flight data:', err);
    process.exit(1);
  }
}
