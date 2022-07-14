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
// router.get(
//   '/allcontacts',
//   authController.isLoggedIn,
//   contactController.getAllContacts
// );
//When there is a post request, first checkBody, then createContact function
// will be called.=> Chaining multiple middlewares.
// router
//   .route('/:id')
//   .get(contactController.getContact)
//   .patch(contactController.updateContact)
//   .delete(contactController.deleteContact);
module.exports = router;
