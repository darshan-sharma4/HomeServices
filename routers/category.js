const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authUser')

const { getAllMechanics, getAllPlumber,getAllCarpenter,getAllElectrician,getAllPainter,getAllACTechnician} = require('../controllers/getWorkerDetails');

router.get('/Mechanic',getAllMechanics)
router.get('/Plumber',getAllPlumber)
router.get('/Carpenter',getAllCarpenter)
router.get('/electrician',getAllElectrician)
router.get('/painter',getAllPainter)
router.get('/ACTechnician',getAllACTechnician)


module.exports= router;