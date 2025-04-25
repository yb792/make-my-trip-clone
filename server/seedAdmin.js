const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/Admin');
require('dotenv').config();

const seedAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await Admin.findOne({ email: 'admin@example.com' });
  if (existing) return console.log('Admin already exists');

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = new Admin({
    email: 'admin@example.com',
    password: hashedPassword
  });

  await admin.save();
  console.log('✅ Admin seeded');
  process.exit();
};

seedAdmin();
