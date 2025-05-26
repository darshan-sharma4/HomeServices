const express = require('express');
const router = express.Router();
const {loginTechnician,dashboard} = require('../controllers/technicianController');
const {registerTechnician}= require('../controllers/registerTechnician')
const {technicianAuth }= require('../middleware/authtechnician')


router.post('/signup',registerTechnician);

router.get('/login', (req, res) => res.render('technicianLogin', { error: null }));

router.get('/signup',(req,res)=>{
    return res.render('technicianSignup')
})
 

router.post('/login', loginTechnician);
router.get('/dashboard',technicianAuth,dashboard);




module.exports = router;
