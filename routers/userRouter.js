const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Signup Page (GET)
router.get('/signup', (req, res) => {
  res.render('userSignup');
});

// Handle Signup (POST)
router.post('/signup', async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('Email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword
    });

    await newUser.save();
    res.redirect('/user/login');
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).send('Signup failed');
  }
});

// Login Page (GET)
router.get('/login', (req, res) => {
  res.render('userLogin');
});

// Handle Login (POST)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials');
    }

    res.cookie('userId', user.userId, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // 1 day
    res.redirect('/');
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Login failed');
  }
});

// Logout 
router.get('/logout', (req, res) => {
  res.clearCookie('userId');
  res.redirect('/');
});

module.exports = router;
