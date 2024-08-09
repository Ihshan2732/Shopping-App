const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret'; // Store in environment variables

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  // Logout implementation can vary
  res.status(200).json({ message: 'Logged out' });
};
