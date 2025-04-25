// scripts/updatePassword.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('../models/User'); // Adjust path if needed

const updatePassword = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    
    const email = 'yashubaghel2019@gmail.com'; // your email
    const newPassword = '123456'; // set your new password here

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`❌ No user found with the email: ${email}`);
      process.exit(1);
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    const result = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!result) {
      console.log('❌ Failed to update password');
    } else {
      console.log('✅ Password updated successfully!');
    }

    process.exit();
  } catch (error) {
    console.error('❌ Error updating password:', error.message);
    process.exit(1);
  }
};

updatePassword();
