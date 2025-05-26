const Hire = require('../models/Hire');
const User = require('../models/User');
const Technician = require('../models/Technician');

const hireTechnician = async (req, res) => {
  try {
    const { technicianId } = req.params;
    const userId = req.cookies.userId;

    if (!userId) {
      return res.redirect('/user/login');
    }

    const user = await User.findOne({ userId });
    const technician = await Technician.findOne({ technicianId });

    if (!technician) {
      return res.status(404).send('Technician not found');
    }

    // Save hire record
    const hire = new Hire({
      userId,
      technicianId,
      charge: 99 // default
    });

    await hire.save();

    // Redirect to a confirmation or dashboard page
    res.render('hireSuccess', {
      user,
      technician,
      hire
    });
  } catch (error) {
    console.error('Error in hiring technician:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = { hireTechnician };
