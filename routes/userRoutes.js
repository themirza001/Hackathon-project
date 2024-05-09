const express = require('express');
const router = express.Router();
const userController = require('./../controller/userController');
const check = (req, res, next) => {
  console.log('Router is called');
  next();
};
router
  .route('/')
  .get(userController.getAllUser)
  .post(check, userController.createUser);

router
  .route('/:id')
  .get(userController.getOneUser)
  .patch(userController.UpdateOneUser)
  .delete(userController.deleteOneUser);

module.exports = router;
