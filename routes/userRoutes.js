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

// router.param('id', userController.checkID);
// router.route('/').get(userController.getAllUsers);
//   .post(userController.checkBody, userController.createUser);
//When there is a post request, first checkBody, then createContact function
// will be called.=> Chaining multiple middlewares.

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
