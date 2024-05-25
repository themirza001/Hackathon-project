const Doctor = require('./../model/doctorModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');

exports.signup = async (req, res, next) => {
  try {
    const {
      consultationFee,
      degree,
      modeOfAppointment,
      summary,
      workingDays,
      workingTime,
      specialization,
      gender,
      registrationNumber,
      registrationCouncil,
      registrationYear,
      college,
      email,
      name,
      password,
      clinicName,
      address,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const newDoctor = await Doctor.create({
      consultationFee,
      degree,
      modeOfAppointment,
      summary,
      workingDays,
      workingTime,
      specialization,
      gender,
      registrationNumber,
      registrationCouncil,
      registrationYear,
      college,
      clinicName,
      address,
      email,
      name,
      password: hashedPassword,
    });

    // const [Password: password, ...rest] = newDoctor._doc;
    res.status(200).json(newDoctor);
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError(400, 'All Fields Are Required'));
  try {
    const validDoctor = await Doctor.findOne({ email });
    if (!validDoctor) return next(new AppError(404, 'Doctor Not Found'));

    const validPassword = await bcrypt.compare(password, validDoctor.password);

    if (!validPassword) {
      return next(new AppError(400, 'InValid Credentials'));
    }

    const token = jwt.sign(
      {
        id: validDoctor._id,
      },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validDoctor._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (err) {
    next(err);
  }
};
