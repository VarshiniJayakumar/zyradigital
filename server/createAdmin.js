/**
 * Run this once to create the admin account:
 * node createAdmin.js
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const ADMIN_EMAIL    = 'admin@zyradigital.com';
const ADMIN_PASSWORD = 'ZyraAdmin@2025';
const ADMIN_NAME     = 'ZyraDigital Admin';

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // Dynamically load User model
    const User = require('./models/User');

    // Check if admin already exists
    const existing = await User.findOne({ email: ADMIN_EMAIL });
    if (existing) {
      // Update role to admin if exists
      existing.role = 'admin';
      await existing.save();
      console.log('✅ Existing user updated to admin:', ADMIN_EMAIL);
    } else {
      // Create new admin
      const admin = await User.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        phone: '0000000000',
        role: 'admin',
      });
      console.log('✅ Admin account created successfully!');
      console.log('   Email   :', ADMIN_EMAIL);
      console.log('   Password:', ADMIN_PASSWORD);
      console.log('   ID      :', admin._id);
    }

    await mongoose.disconnect();
    console.log('✅ Done. You can now log in with the admin credentials.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

createAdmin();
