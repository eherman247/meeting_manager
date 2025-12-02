const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized token / user not logged in' });
  }
  const token = authHeader.split(' ')[1];
  // Verify token here (e.g., using JWT)
  // If valid, call next()
  // If invalid, return res.status(401).json({ error: 'Invalid token' });
  try {
    const {_id} = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById(_id).select('_id');
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = requireAuth;