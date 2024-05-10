const User = require('./../model/userModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const Review = require('./../model/reviewModel');

exports.createUser = catchAsync(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: user,
    },
  });
});

exports.getAllUser = catchAsync(async (req, res) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query;

  res.status(201).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc,
    },
  });
});

exports.getOneUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);

  res.status(201).json({
    status: 'success',
    data: {
      data: user,
    },
  });
});

exports.deleteOneUser = catchAsync(async (req, res) => {
  const users = await User.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: {},
  });
});

exports.UpdateOneUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({
    status: 'success',
    data: {
      data: user,
    },
  });
});

exports.get;
