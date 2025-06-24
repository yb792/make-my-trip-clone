// 📁 server.js (updated to support test environment and remove deprecated warnings)
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const allowedOrigins = [
  'https://spectacular-blini-9ce730.netlify.app',
  'http://localhost:3000', 'http://localhost:3001'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/flights', require('./routes/flights'));
app.use('/api/hotels', require('./routes/hotels'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/admin', require('./routes/admin'));

app.get('/', (req, res) => {
  res.send('🛫 Welcome to MakeMyTrip Clone API');
});

// Export app for testing
module.exports = app;

// Only connect to DB and listen if not in test mode
if (process.env.NODE_ENV !== 'test') {
  const startServer = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
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
}
