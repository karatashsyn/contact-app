const express = require('express');
const router = express.Router();
const path = require('path');
const Contact = require('../models/contactModel');
const catchAsync = require('../utils/catchAsync');
const slug = require('slugify');

// exports.getOverView = async (req, res) => {
//   const contacts = await Contact.find();
//   res.status(200).sendFile(path.join(__dirname, '/overview.html'));
// };

// exports.getContact = async (req, res) => {
//   const contact = await Contact.findById(req.params.id);

//   res.sendFile(path.join(__dirname, '/contactProfile.html'));
// };

exports.getLoginForm = (req, res) => {
  res.status(200).render('loginScreen');
};

exports.getOverView = (req, res) => {
  res.status(200).render('overView');
};

exports.getSignUpForm = (req, res) => {
  res.status(200).render('signUp');
};
//For html
// exports.getContactProfile = (req, res) => {
//   res.status(200).sendFile(path.join(__dirname, '/contactProfile.html'));
// };
exports.getAddContact = (req, res) => {
  res.status(200).render('addContact');
};

exports.getEditContact = (req, res) => {
  res.status(200).render('editContact');
};
// exports.getEditContact = (req, res) => {
//   res.status(200).sendFile(path.join(__dirname, '/editContact.html'));
// };
