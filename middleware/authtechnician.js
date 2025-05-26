
function technicianAuth(req, res, next) {
  if (!req.cookies.technicianId) {
    return res.redirect('/technician/login');
  }
  next();
}

module.exports={technicianAuth}