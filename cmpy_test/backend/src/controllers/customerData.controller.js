import mongoose from 'mongoose';
import CustomerPost from '../models/customerPost.model.js';

export const createCustomerPost = async (req, res) => {
  try {
    const { role, id } = req.user;

    console.log('id123', req.user);

    if (role !== 'customer') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only customers can create posts.',
      });
    }
    const { title, image, description, date } = req.body;
    if (!title || !image || !description || !date) {
      return res.status(400).json({
        success: false,
        message: 'please enter all the required fields',
      });
    }
    const customerPost = new CustomerPost({
      customer: id,
      title,
      image,
      description,
      date,
    });
    await customerPost.save();
    res.status(200).json({
      success: true,
      message: 'Customer post created successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCustomerPosts = async (req, res) => {
  try {
    const { id } = req.user;
    console.log('id8888', id);
    const posts = await CustomerPost.find({ customer: id });
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

export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const admin = await Customer.findOne({ phone });
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const accessToken = jwt.sign(
      { name: admin.name, role: admin.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({
      success: true,
      admin,
      accessToken,
      message: 'Logged in successfully',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAdminPosts = async (req, res) => {
  try {
    const { id } = req.user;
    console.log('id8888', id);
    const posts = await CustomerPost.find({ customer: id });
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
