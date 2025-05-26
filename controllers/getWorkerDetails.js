const Technician = require('../models/Technician');

const User = require('../models/User'); // make sure this is required

const getAllMechanics = async (req, res) => {
  try {
    const mechanics = await Technician.find({ service: 'mechanic', approved: true });

    let user = null;
    if (req.cookies.userId) {
      user = await User.findOne({ userId: req.cookies.userId });
    }

    res.render('technicianProfile', {
      technician: mechanics,
      service: 'Mechanic',
      user
    });
  } catch (err) {
    console.error('Error fetching mechanics:', err);
    res.status(500).send('Server Error');
  }
};

const getAllPlumber = async (req, res) => {
  try {
    const plumber = await Technician.find({ service: 'plumber', approved: true });

    let user = null;
    if (req.cookies.userId) {
      user = await User.findOne({ userId: req.cookies.userId });
    }

    res.render('technicianProfile', {
      technician: plumber,
      service: 'Plumber',
      user
    });
  } catch (err) {
    console.error('Error fetching plumbers:', err);
    res.status(500).send('Server Error');
  }
};

const getAllCarpenter = async (req, res) => {
  try {
    const carpenter = await Technician.find({ service: 'carpenter', approved: true });

    let user = null;
    if (req.cookies.userId) {
      user = await User.findOne({ userId: req.cookies.userId });
    }

    res.render('technicianProfile', {
      technician: carpenter,
      service: 'Carpenter',
      user
    });
  } catch (err) {
    console.error('Error fetching carpenters:', err);
    res.status(500).send('Server Error');
  }
};

const getAllElectrician = async (req, res) => {
  try {
    const electrician = await Technician.find({ service: 'electrician', approved: true });

    let user = null;
    if (req.cookies.userId) {
      user = await User.findOne({ userId: req.cookies.userId });
    }

    res.render('technicianProfile', {
      technician: electrician,
      service: 'Electrician',
      user
    });
  } catch (err) {
    console.error('Error fetching electricians:', err);
    res.status(500).send('Server Error');
  }
};

const getAllPainter = async (req, res) => {
  try {
    const painter = await Technician.find({ service: 'painter', approved: true });

    let user = null;
    if (req.cookies.userId) {
      user = await User.findOne({ userId: req.cookies.userId });
    }

    res.render('technicianProfile', {
      technician: painter,
      service: 'Painter',
      user
    });
  } catch (err) {
    console.error('Error fetching painters:', err);
    res.status(500).send('Server Error');
  }
};

const getAllACTechnician = async (req, res) => {
  try {
    const actechnician = await Technician.find({ service: 'ac_technician', approved: true });

    let user = null;
    if (req.cookies.userId) {
      user = await User.findOne({ userId: req.cookies.userId });
    }

    res.render('technicianProfile', {
      technician: actechnician,
      service: 'AC Technician',
      user
    });
  } catch (err) {
    console.error('Error fetching AC technicians:', err);
    res.status(500).send('Server Error');
  }
};




module.exports={getAllMechanics,getAllPlumber,getAllCarpenter,getAllElectrician,getAllPainter,getAllACTechnician}