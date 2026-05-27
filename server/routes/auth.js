const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'zyradigital_secret_key', {
    expiresIn: '7d',
  });

// POST /api/auth/register
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password min 6 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array()[0].msg });

    try {
      const exists = await User.findOne({ email: req.body.email });
      if (exists)
        return res.status(400).json({ message: 'Email already registered.' });

      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      const token = signToken(user._id);
      res.status(201).json({
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      });
    } catch (err) {
      res.status(500).json({ message: 'Server error. Please try again.' });
    }
  }
);

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array()[0].msg });

    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user || !(await user.matchPassword(req.body.password)))
        return res.status(401).json({ message: 'Invalid email or password.' });

      const token = signToken(user._id);
      res.json({
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      });
    } catch (err) {
      res.status(500).json({ message: 'Server error. Please try again.' });
    }
  }
);

// GET /api/auth/me  (protected)
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not authenticated.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'zyradigital_secret_key');
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });

    res.json({ user });
  } catch {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
});

module.exports = router;
