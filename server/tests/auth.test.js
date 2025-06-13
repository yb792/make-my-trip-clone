const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');

jest.setTimeout(20000); // Increase timeout

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/makemytrip_test');
});

afterAll(async () => {
  await User.deleteMany(); // Clean up test data
  await mongoose.connection.close();
});

describe('Auth Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: `test${Date.now()}@mail.com`,
      password: 'test1234'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  it('should login with correct credentials', async () => {
    const email = `test${Date.now()}@mail.com`;
    const password = 'test1234';

    await request(app).post('/api/auth/register').send({
      name: 'Login Test',
      email,
      password
    });

    const res = await request(app).post('/api/auth/login').send({ email, password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
