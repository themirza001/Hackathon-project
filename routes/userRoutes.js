const express = require('express');
const router = express.Router();
const userController = require('./../controller/userController');
const authController = require('./../controller/authContoller');

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.use(authController.protect);
// router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUser)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getOneUser)
  .patch(userController.UpdateOneUser)
  .delete(userController.deleteOneUser);

module.exports = router;
