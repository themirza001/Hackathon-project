const express = require('express');
const doctorController = require('./../controller/doctorController');
const router = express.Router();

router
  .route('/')
  .post(doctorController.createDoctor)
  .get(doctorController.getAllDoctor);

router
  .route('/:id')
  .get(doctorController.getDoctor)
  .delete(doctorController.deleteDoctor)
  .patch(doctorController.updateDoctor);

module.exports = router;
