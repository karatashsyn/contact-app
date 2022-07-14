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
// router.get('/editcontact', viewController.getEditContact);

// router.get('/:id', viewController.getContact);
//CastError Cast to ObjectId failed for value "login" (type string) at path "_id" for model "Contact" hatasi burda

module.exports = router;
