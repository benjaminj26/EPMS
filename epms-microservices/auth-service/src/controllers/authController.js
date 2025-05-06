const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (username, role) => {
  return jwt.sign({ username, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.register = async (req, res) => {
  const { username, name, email, password, role } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({ username, name, email, password: hashed, role });

    // res.status(201).json({
    //   _id: user._id,
    //   username: user.username,
    //   name: user.name,
    //   email: user.email,
    //   role: user.role,
    //   token: generateToken(user.username, user.role)
    // });

    res.send(generateToken(user.username, user.role));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // res.json({
    //   _id: user._id,
    //   username: user.username,
    //   name: user.name,
    //   email: user.email,
    //   role: user.role,
    //   token: generateToken(user.username, user.role)
    // });

    res.send(generateToken(user.username, user.role));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  const username = req.query.username;
  // console.log('USERNAME: ', username);

  try {
    const user = await User.findOne({ username });
    // console.log(user.role);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.updateUser = async (req, res) => {
  try {
    const username = req.query.username;

    const user = await User.findOneAndUpdate(
      { username },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(user);
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: err.message });
  }
};