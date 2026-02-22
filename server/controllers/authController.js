const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc  Login admin
// @route POST /api/auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get current user profile
// @route GET /api/auth/me
const getMe = async (req, res) => {
  res.json({
    _id: req.user._id,
    email: req.user.email,
    role: req.user.role,
  });
};

// @desc  Register first admin (only if no admin exists)
// @route POST /api/auth/register
const registerAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      return res.status(403).json({ message: 'Admin already registered' });
    }
    const user = await User.create({ email, password, role: 'admin' });
    res.status(201).json({
      _id: user._id,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginUser, getMe, registerAdmin };
