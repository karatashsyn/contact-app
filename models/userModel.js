const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Contact = require('./contactModel');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter your e mail!'],
    unique: [true, 'This email is already being used 😕'],
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  name: {
    type: String,
    required: [true, 'Please enter your name!'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password.'],
    minLength: 6,
    select: false,
  },
  passwordconfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  passwordChangedAt: Date,

  contacts: Array,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.passwordconfirm = undefined;
  next();
});

userSchema.pre('save', async function (next) {
  const contactsPromises = this.contacts.map(
    async (id) => await Contact.findById(id)
  );
  this.contacts = await Promise.all(contactsPromises);
});

userSchema.methods.correctPassword = function (testPassword, realPassword) {
  return bcrypt.compare(testPassword, realPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    console.log(changedTimeStamp, JWTTimeStamp);
    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
