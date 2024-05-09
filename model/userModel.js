const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter Your Name'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please Enter Your Mail'],
    unique: true,
  },
  photo: String,
  address: String,
  password: {
    type: String,
    required: [true, 'Please Enter Your Password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please Enter Your Password'],
    validate: {
      validator: function (EnteredPassword) {
        return this.password === EnteredPassword;
      },
      message: "Entered PassWord Doesn't Matches",
    },
  },
  dob: {
    type: Date,
    required: [true, 'Please Enter Your Age'],
  },
  phone: {
    type: Number,
  },
  insurance: String,
  medicalHistory: [String],
  allergies: [String],
  medications: [String],
  surgeries: [String],
  familyMedicalHistory: [String],
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
