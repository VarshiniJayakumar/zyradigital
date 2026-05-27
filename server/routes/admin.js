const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Enrollment = require('../models/Enrollment');

// Middleware — admin only
const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not authenticated.' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'zyradigital_secret_key');
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Admin access only.' });
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

// GET /api/admin/stats
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const [totalUsers, totalEnrollments, recentUsers, recentEnrollments] = await Promise.all([
      User.countDocuments(),
      Enrollment.countDocuments(),
      User.find().sort({ createdAt: -1 }).limit(10).select('-password'),
      Enrollment.find().sort({ createdAt: -1 }).limit(10),
    ]);
    res.json({ totalUsers, totalEnrollments, recentUsers, recentEnrollments });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/admin/users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/admin/enrollments
router.get('/enrollments', adminAuth, async (req, res) => {
  try {
    const enrollments = await Enrollment.find().sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
