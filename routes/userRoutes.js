const express = require('express');
const userController = require('./../controllers/userController.js');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.patch(
  '/increasecontact',
  authController.isLoggedIn,
  userController.increaseContact
);

router.patch(
  '/updatecontact',
  authController.isLoggedIn,
  userController.updateContact
);
router.patch(
  '/deletecontact',
  authController.isLoggedIn,
  userController.deleteContact
);


module.exports = router;
