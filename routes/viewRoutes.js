const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.get('/loginpage', viewController.getLoginForm);
router.get('/signup', viewController.getSignUpForm);
router.get('/overview', authController.isLoggedIn, viewController.getOverView);
router.get(
  '/addcontact',
  authController.isLoggedIn,
  viewController.getAddContact
);

router.get(
  '/editcontact',
  authController.isLoggedIn,
  viewController.getEditContact
);

module.exports = router;
