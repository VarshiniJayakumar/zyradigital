const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Enrollment = require('../models/Enrollment');

// POST /api/enrollment
router.post(
  '/',
  [
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please enter a valid email address'),
    body('phone')
      .trim()
      .notEmpty().withMessage('Phone number is required')
      .matches(/^\d{7,15}$/).withMessage('Phone number must be 7–15 digits'),
    body('message')
      .optional()
      .isLength({ max: 500 }).withMessage('Message cannot exceed 500 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const enrollment = new Enrollment(req.body);
      await enrollment.save();
      return res.status(201).json({ message: 'Enrollment submitted successfully', data: enrollment });
    } catch (err) {
      if (err.name === 'MongoNetworkError' || err.name === 'MongooseServerSelectionError') {
        return res.status(503).json({ message: 'Database unavailable. Please try again later.' });
      }
      return res.status(500).json({ message: 'Server error. Please try again.' });
    }
  }
);

// GET /api/enrollment (admin view)
router.get('/', async (req, res) => {
  try {
    const enrollments = await Enrollment.find().sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
