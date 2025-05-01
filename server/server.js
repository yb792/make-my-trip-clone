require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ✅ TEMP CORS: Allow all origins (for first-time deployment)
app.use(cors({
  origin: '*', // Allow all origins temporarily
  credentials: true // If you're using cookies or JWT auth
}));

// ✅ STRICT CORS: Allow only specific origins (for later deployment)
const allowedOrigins = [
  'https://spectacular-blini-9ce730.netlify.app/', // ✅ Your final frontend URL
  'http://localhost:3000' // ✅ For local development
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('❌ Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/flights', require('./routes/flights'));
app.use('/api/hotels', require('./routes/hotels'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/admin', require('./routes/admin'));

// ✅ Default route
app.get('/', (req, res) => {
  res.send('🛫 Welcome to MakeMyTrip Clone API');
});

// ✅ Connect to DB and start server
const startServer = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) throw new Error('❌ Missing MONGO_URI in environment variables');

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

startServer();
