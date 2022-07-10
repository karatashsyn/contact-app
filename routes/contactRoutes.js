const express = require('express');
const contactController = require('./../controllers/contactController.js');
const authController = require('./../controllers/authController');
const router = express.Router();
//Param Middleware
router.param('id', (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  next();
});

router
  .route('/')
  .get(contactController.getAllContacts)
  .post(contactController.createContact);
//When there is a post request, first checkBody, then createContact function
// will be called.=> Chaining multiple middlewares.
router
  .route('/:id')
  .get(contactController.getContact)
  .patch(contactController.updateContact)
  .delete(contactController.deleteContact);
module.exports = router;
