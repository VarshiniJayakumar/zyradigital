const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const Enrollment = require('../models/Enrollment');

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASS,
  },
});

const sendAdminEmail = async (enrollment) => {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_EMAIL_PASS) return;
  try {
    await transporter.sendMail({
      from: `"ZyraDigital" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `🎉 New Enrollment — ${enrollment.name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:24px;background:#f8fafc;border-radius:12px;">
          <h2 style="color:#2563EB;margin-bottom:4px;">New Enrollment Received!</h2>
          <p style="color:#64748b;margin-top:0;">Someone just secured their seat on ZyraDigital.</p>
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin:16px 0;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#64748b;font-size:14px;">Name</td><td style="padding:8px 0;font-weight:bold;color:#0f172a;">${enrollment.name}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;font-size:14px;">Email</td><td style="padding:8px 0;font-weight:bold;color:#0f172a;">${enrollment.email}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;font-size:14px;">Phone</td><td style="padding:8px 0;font-weight:bold;color:#0f172a;">${enrollment.phone}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;font-size:14px;">Date</td><td style="padding:8px 0;font-weight:bold;color:#0f172a;">${new Date().toLocaleString('en-IN')}</td></tr>
            </table>
          </div>
          <a href="https://wa.me/91${enrollment.phone}" style="display:inline-block;background:#25D366;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">📲 WhatsApp ${enrollment.name}</a>
          <p style="color:#94a3b8;font-size:12px;margin-top:16px;">ZyraDigital — AI Integrated Digital Marketing Academy</p>
        </div>
      `,
    });
    console.log('✅ Admin email sent for:', enrollment.name);
  } catch (err) {
    console.error('⚠️ Email send failed:', err.message);
  }
};

// POST /api/enrollment
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
    body('email').trim().isEmail().withMessage('Valid email required'),
    body('phone').trim().matches(/^\d{7,15}$/).withMessage('Phone must be 7–15 digits'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array()[0].msg });

    try {
      const enrollment = await Enrollment.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      });

      // Send email to admin (non-blocking)
      sendAdminEmail(enrollment);

      return res.status(201).json({ message: 'Enrollment submitted successfully' });
    } catch (err) {
      return res.status(500).json({ message: 'Server error. Please try again.' });
    }
  }
);

// GET /api/enrollment
router.get('/', async (req, res) => {
  try {
    const enrollments = await Enrollment.find().sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/enrollment/clear
router.delete('/clear', async (req, res) => {
  if (req.body.secret !== 'zyradigital_clear_2025')
    return res.status(403).json({ message: 'Forbidden' });
  try {
    const result = await Enrollment.deleteMany({});
    res.json({ message: 'Cleared', deleted: result.deletedCount });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
