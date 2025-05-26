const express = require('express');
const router = express.Router();
const { hireTechnician } = require('../controllers/hireController');

router.get('/:technicianId', hireTechnician);

module.exports = router;
