const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

router.use(authController.isLoggedIn);

router.get('/contacts', viewController.getOverView);
router.get('/contacts/:id', viewController.getContact);
router.get('/users/login', viewController.getLoginForm);
//router.get('/:id', viewController.getContact);
//CastError Cast to ObjectId failed for value "login" (type string) at path "_id" for model "Contact" hatasi burda

module.exports = router;
