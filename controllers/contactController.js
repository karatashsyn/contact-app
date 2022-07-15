const { toUSVString } = require('util');
const AppError = require('../utils/appError');
const Contact = require('./../models/contactModel');
const catchAsync = require('./../utils/catchAsync');

exports.getContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return next(new AppError('No contact with this ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: contact,
  });
});

exports.getAllContacts = catchAsync(async (req, res, next) => {
  const contacts = await Contact.find().populate('contacts');
  res.status(200).json({
    status: 'success',
    data: contacts,
  });
});

exports.createContact = catchAsync(async (req, res, next) => {
  const newContact = await Contact.create({ ...req.body, currentId: null });
  req.body = { ...req.body, newContactId: newContact._id };
  res.status(201).json({
    status: 'success',
    data: {
      user: req.user,
      contact: newContact,
    },
  });
});

exports.updateContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      contact,
    },
  });
});

exports.deleteContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) {
    return next(new AppError('No contact with this ID', 404));
  }
  res.status(204).json({
    status: 'success',
  });
});
