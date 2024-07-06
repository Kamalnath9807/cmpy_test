import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import CustomerPost from '../models/customerPost.model.js';

export const signup = async (req, res) => {
  try {
    const { name, password, confirmPassword, phone, email, role } = req.body;
    if (!name || !password || !confirmPassword || !phone || !email || !role) {
      return res.status(400).json({
        success: false,
        message: 'please enter all the required fields',
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
    }
    const admin = new User({
      name,
      role,
      password,
      phone,
      email,
    });
    await admin.save();
    res.status(200).json({
      success: true,
      message: 'User created successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const accessToken = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        phone: user.phone,
      },
      accessToken,
      message: 'Logged in successfully',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAdminPosts = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only admins can view all posts.',
      });
    }

    const posts = await CustomerPost.find();
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
