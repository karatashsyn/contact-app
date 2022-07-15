const express = require('express');
const router = express.Router();
const path = require('path');
const Contact = require('../models/contactModel');
const catchAsync = require('../utils/catchAsync');
const slug = require('slugify');


exports.getLoginForm = (req, res) => {
  res.status(200).render('loginScreen');
};

exports.getOverView = (req, res) => {
  res.status(200).render('overView');
};

exports.getSignUpForm = (req, res) => {
  res.status(200).render('signUp');
};

exports.getAddContact = (req, res) => {
  res.status(200).render('addContact');
};

exports.getEditContact = (req, res) => {
  res.status(200).render('editContact');
};
