const mongoose = require('mongoose');
const validator = require('validator');

const doctorSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: [true, 'Please Enter ur Password'],
      minlength: 8,
      maxlength: 12,
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
    email: {
      type: String,
      required: [true, 'a Doctor Must Have a Email'],
      unique: true,
      validate: [validator.isEmail, 'Please provide valid Email'],
    },
    address: {
      type: String,
      required: true,
    },
    clinicName: {
      type: String,
      required: true,
    },
    consultationFee: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 5,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
    },
    modeOfAppointment: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    workingDays: {
      type: [String],
      required: true,
    },
    workingTime: {
      type: String,
      required: true,
    },
    specialization: {
      type: [String],
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female', 'Other'],
    },
    registrationNumber: {
      type: String,
      required: true,
      minlength: 20,
      maxlength: 20,
    },
    registrationCouncil: {
      type: String,
      required: true,
    },
    registrationYear: {
      type: Number,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    userReviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserReviews',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//virtual populate
doctorSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'doctor',
  localField: '_id',
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
