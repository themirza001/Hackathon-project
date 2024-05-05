const mongoose = require('mongoose');
const validator = require('validator');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a Doctor Must Have a Name'],
  },
  email: {
    type: String,
    required: [true, 'a Doctor Must Have a Email'],
    unique: true,
    validate: [validator.isEmail, 'Please provide valid Email'],
  },
  image: {
    type: String,
  },
  Specialization: {
    type: String,
    required: [true, 'Please Enter ur Specialization'],
  },
  regId: {
    type: Number,
    required: [true, 'Please Enter ur registration Number'],
  },
  password: {
    type: String,
    required: [true, 'Please Enter ur Password'],
  },
  regYear: {
    type: Number,
    required: [true, 'Please Enter ur Registration year'],
  },
  confirmPassWord: {
    type: String,
    validate: {
      validator: function (currPass) {
        return this.password === currPass;
      },
      message: "Entered passWord Doesn't Matches",
    },
  },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
