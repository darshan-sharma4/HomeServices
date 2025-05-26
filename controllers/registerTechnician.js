const Technician = require('../models/Technician');
const bcrypt = require('bcrypt');
async function registerTechnician(req, res) {
  const {
    name,
    email,
    password,
    phone,
    service,
    location,
    experience,
    description
  } = req.body;

  try {
    const existing = await Technician.findOne({ email });
    if (existing) {
      return res.render('technicianSignup', { error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await Technician.create({
      name,
      email,
      password: hashedPassword,
      phone,
      service,
      location,
      experience,
      description,
    });

    return res.redirect('/technician/login');
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).send('Registration failed');
  }
}

//login
async function userLogin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await Technician.findOne({ email });

    if (!user) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    if (!user.approved) {
      return res.render('login', { error: 'Your profile is not yet approved by the admin.' });
    }

    // Store technician session
    res.cookie('techId', user._id.toString(), { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.redirect('/technician/dashboard');
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).send('Login failed');
  }
}

module.exports = {
  registerTechnician,
  userLogin,
};
