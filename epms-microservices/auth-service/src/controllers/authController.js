const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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
    // console.log(user);

    if (!user) {
      return res.status(404).json({ error: 'Not Found' });
    }

    res.status(200).json({
      _id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    console.log(err);
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

exports.getUserByUUID = async (req, res) => {
  try {
    const uuid = req.query.uuid;

    const user = await User.findOne({ _id: uuid });

    // console.log(user);

    res.status(200).json(user);
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: err.message });
  }
};

// Forgot Password Controller
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate reset token
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '15m' });

    // Construct reset URL (adjust to your frontend route)
    const resetLink = `http://localhost:3000/reset-password/${token}`;

    // Configure Nodemailer (use your Gmail app password)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // your Gmail address
        pass: process.env.EMAIL_PASS  // Gmail app password
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      html: `
        <p>Hello ${user.name},</p>
        <p>Click the link below to reset your password. This link will expire in 15 minutes:</p>
        <a href="${resetLink}">${resetLink}</a>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset link sent successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending password reset link' });
  }
};

// In your controllers/authController.js

exports.resetPassword = async (req, res) => {
  const { token } = req.params; // Token from the URL
  const { password } = req.body; // New password from the frontend

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the decoded username
    const user = await User.findOne({ username: decoded.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Send success response
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};