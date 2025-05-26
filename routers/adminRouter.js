const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const authAdmin = require('../middleware/authAdmin');
const router = express.Router();
const Technician = require('../models/Technician');
const SECRET_KEY = 'mySuperSecretKey';


 router.get('/signup',(req,res)=>{
   return res.render('adminSignup')
 });

 router.get('/login',(req,res)=>{
   return res.render('adminLogin')
 })

// Handle signup
router.post('/signup', async (req, res) => {
    const { name, email, password, secretKey } = req.body;

    if (secretKey !== SECRET_KEY) {
        return res.status(403).send('Invalid secret key!');
    }

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) return res.status(400).send('Admin already exists.');

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ name, email, password: hashedPassword });
        await newAdmin.save();

        res.render('adminLogin');
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong.');
    }
});

// Handle login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).send('Invalid credentials');
        }

        res.cookie('adminId', admin.adminId, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

        res.redirect('/admin/dashboard',);
        // res.render('admindashboard', { admin })
    } catch (err) {
        console.error(err);
        res.status(500).send('Login failed');
    }
});

// Logout handler
router.post('/logout', (req, res) => {
    res.clearCookie('adminId');
    res.redirect('/admin/login');
});



// Admin Dashboard - grouped by service
router.get('/dashboard',authAdmin, async (req, res) => {
    try {
        const unapprovedTechs = await Technician.find({ approved: false });
        // Group technicians by service
        const groupedByService = {};
        unapprovedTechs.forEach(t => {
            if (!groupedByService[t.service]) groupedByService[t.service] = [];
            groupedByService[t.service].push(t);
        });
      
        res.render('adminDashboard', {
            admin: req.admin,
            groupedByService
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading dashboard');
    }
});

// Approve technician
router.post('/approve-technician/:id', async (req, res) => {
    try {
        await Technician.findOneAndUpdate({technicianId:req.params.id},{approved:true});
        console.log(Technician)
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Approval failed');
    }
});
module.exports = router;
