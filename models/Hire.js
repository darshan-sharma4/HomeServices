const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const hireSchema = new mongoose.Schema({
  hireId: {
    type: String,
    default: uuidv4,
    unique: true
  },
  userId: {
    type: String,
    required: true
  },
  technicianId: {
    type: String,
    required: true
  },
  hireDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'pending' // or 'confirmed', 'completed'
  },
  charge: {
    type: Number,
    default: 99
  }
});

module.exports = mongoose.model('Hire', hireSchema);
