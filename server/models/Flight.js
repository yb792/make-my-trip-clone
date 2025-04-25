const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  departureDate: { type: Date, required: true },
  departureTime: { type: String, required: true }, 
  arrivalTime: { type: String, required: true },    
  price: { type: Number, required: true }
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
