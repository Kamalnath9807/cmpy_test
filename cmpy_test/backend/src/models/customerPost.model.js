import mongoose from 'mongoose';

const customerPostSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const CustomerPost = mongoose.model('CustomerPost', customerPostSchema);

export default CustomerPost;
