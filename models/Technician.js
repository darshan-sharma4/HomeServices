const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const technicianSchema = new mongoose.Schema({
  technicianId: {
    type: String,
    unique:true ,
    default: () => uuidv4(), 
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    unique: true, 
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  service: { 
    type: String, 
    required: true,
    enum: ['mechanic', 'plumber', 'carpenter', 'electrician', 'painter', 'ac_technician']
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  approved: {
    type: Boolean,
    default: false // Initially false until approved by admin
  }
}, { timestamps: true });

module.exports = mongoose.model('Technician', technicianSchema);
