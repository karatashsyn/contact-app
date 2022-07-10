const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');
const catchAsync = require('../utils/catchAsync');
const slug = require('slugify');

exports.getOverView = async (req, res) => {
  const contacts = await Contact.find();

  res.status(200).render('contacts', {
    title: 'contacts',
    contacts,
  });
};

exports.getContact = async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  res.status(200).render('contactProfile', {
    title: contact.name,
    contact,
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('loginScreen.ejs', {
    title: 'Log in',
  });
};
