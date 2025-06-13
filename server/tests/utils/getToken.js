const request = require('supertest');
const app = require('../../server'); // adjust path if needed

const getToken = async (isAdmin = false) => {
  const user = {
    name: isAdmin ? 'Admin Test' : 'User Test',
    email: `${isAdmin ? 'admin' : 'user'}${Date.now()}@mail.com`,
    password: 'test1234'
  };

  await request(app).post('/api/auth/register').send(user);
  const res = await request(app).post('/api/auth/login').send({
    email: user.email,
    password: user.password
  });

  return res.body.token;
};

module.exports = getToken;
