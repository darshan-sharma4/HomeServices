const User = require('../models/User');

const authUser = async (req, res, next) => {
  try {
    const userId = req.cookies.userId;
    if (!userId) {
      return res.redirect('/user/login');
    }

    const user = await User.findOne({ userId });
    if (!user) {
      return res.redirect('/user/login');
    }

    req.user = user; // attach user to request
    next();
  } catch (err) {
    console.error('User auth error:', err);
    res.redirect('/user/login');
  }
};

module.exports = authUser;
