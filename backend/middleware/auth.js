const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1] || req.query.token;
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, email: payload.email };
    // optionally fetch full user
    // req.userDoc = await User.findById(payload.id).select('-password');
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
