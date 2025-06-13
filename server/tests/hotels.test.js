const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Hotel = require('../models/Hotel'); // adjust if needed

describe('GET /api/hotels/search', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    await Hotel.deleteMany(); // clean slate
    await Hotel.create([
      {
        name: 'Hotel Sunrise',
        location: 'Mumbai',
        rating: 4,
        price: 3500,
        amenities: ['WiFi', 'Pool'],
      },
    ]);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return an array of hotels', async () => {
    const res = await request(app).get('/api/hotels/search');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  }, 20000); // Extend timeout
});
