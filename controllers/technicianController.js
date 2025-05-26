
const Technician = require('../models/Technician');
const Hire = require('../models/Hire');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const loginTechnician = async (req, res) => {
  const { email, password } = req.body;

  const technician = await Technician.findOne({ email, approved: true });
  if (!technician) return res.render('technicianLogin', { error: 'Technician not found or not approved' });

  const isMatch = await bcrypt.compare(password, technician.password);
  if (!isMatch) return res.render('technicianLogin', { error: 'Incorrect password' });

  // Set cookie with technicianId
  res.cookie('technicianId', technician.technicianId, { httpOnly: true });
  res.redirect('/technician/dashboard');
};



// technician dashboard


const dashboard = async (req, res) => {
  const { technicianId } = req.cookies;

  const technician = await Technician.findOne({ technicianId });
  if (!technician) return res.redirect('/technician/login');

  const hireRequestsRaw = await Hire.find({ technicianId });

  // Fetch user info for each hire request
  const hireRequests = await Promise.all(
    hireRequestsRaw.map(async (hire) => {
      const user = await User.findOne({ userId: hire.userId });
      return {
        ...hire._doc,
        userName: user?.name || 'N/A',
        userEmail: user?.email || 'N/A',
        userPhone: user?.phone || 'N/A'
      };
    })
  );

  res.render('technicianDashboard', { technician, hireRequests });
};


module.exports = { loginTechnician,dashboard,};
