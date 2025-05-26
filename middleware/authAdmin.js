const Admin = require('../models/Admin');

const authAdmin = async (req, res, next) => {
  try {
    const adminId = req.cookies.adminId;
    if (!adminId) return res.redirect('/admin/login');

    const admin = await Admin.findOne({ adminId });
    if (!admin) return res.redirect('/admin/login');

    req.admin = admin;
    next();
  } catch (err) {
    console.error('Admin auth error:', err);
    res.redirect('/admin/login');
  }
};

module.exports = authAdmin;
