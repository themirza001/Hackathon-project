const mongoose = require('mongoose');

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
    required: [true, 'Please Enter Your Phone Number'],
  },
  insurance: String,
  medicalHistory: [String],
  allergies: [String],
  medications: [String],
  surgeries: [String],
  familyMedicalHistory: [String],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
