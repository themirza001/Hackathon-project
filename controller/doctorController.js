const Doctor = require('./../model/doctorModel');

exports.createDoctor = async (req, res) => {
  try {
    console.log('i am Inside this');
    const doctor = await Doctor.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        doc: doctor,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      err,
    });
  }
};

exports.getAllDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.find();
    res.status(201).json({
      status: 'success',
      data: {
        doc: doctor,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      err,
    });
  }
};

exports.getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    res.status(201).json({
      status: 'success',
      data: {
        doc: doctor,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      err,
    });
  }
};
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        doc: doctor,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      err,
    });
  }
};
exports.deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: 'success',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      err,
    });
  }
};
