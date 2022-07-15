const express = require('express');
const contactController = require('./../controllers/contactController.js');
const authController = require('./../controllers/authController');
const router = express.Router();
//Param Middleware

router.post(
  '/createcontact',
  authController.isLoggedIn,
  contactController.createContact
);
router.param('id', (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  next();
});

module.exports = router;
