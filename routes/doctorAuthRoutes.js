const express = require('express');
const router = express.Router();
const authController = require('./../controller/doctorAuthController');
const { verifyToken } = require('./../utils/verifyToken');
router.route('/signup').post(authController.signup);

router.route('/signin').post(verifyToken, authController.signin);

module.exports = router;
