const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Admin = require('../models/Admin');
const authMiddleware = require('../middleware/authMiddleware');

require('../passport'); // Load Passport strategies

// Manual Signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: 'Email already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, password: hashedPassword });
    await admin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Manual Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin || !admin.password || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.redirect(`${process.env.FRONTEND_URL}/admin/dashboard?token=${token}`);
});

// Facebook OAuth
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.redirect(`${process.env.FRONTEND_URL}/admin/dashboard?token=${token}`);
});

// Logout
router.post('/logout', authMiddleware, (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

module.exports = router;