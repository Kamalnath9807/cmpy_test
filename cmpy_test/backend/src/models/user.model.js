import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Email address is not valid',
    },
  },
  phone: {
    type: String,
    validate: {
      validator: (number) => validator.isMobilePhone(number),
      message: 'Mobile number is not valid',
    },
    trim: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'customer'],
  },
  password: {
    type: String,
    validate: {
      validator: (password) => validator.isStrongPassword(password),
      message: 'Password is not strong',
    },
  },
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return bcrypt
    .compare(password, this.password)
    .then((resp) => resp)
    .catch((err) => console.error('customer bcrypt err', err));
};
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('user', userSchema);

export default User;
