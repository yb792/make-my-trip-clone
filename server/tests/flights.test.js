const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // make sure server.js exports app

// Setup and teardown
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/makemytrip_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('GET /api/flights/search', () => {
  it('should return an array of flights', async () => {
    const res = await request(app).get('/api/flights/search');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 15000); // ⏱️ Set custom timeout for this test
});
