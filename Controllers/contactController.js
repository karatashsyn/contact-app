const { toUSVString } = require('util');
const AppError = require('../utils/appError');
const Contact = require('./../models/contactModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllContacts = catchAsync(async (req, res, next) => {
  const queryObject = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObject[el]);
  //console.log(req.query, queryObject);
  const query = Contact.find(queryObject);
  ////SORTING PAGINATION.. OTHER THINGS(WE DIDN'T AWAITED CONTACTS IMMEDIATELY BECAUSE WE ARE GONNA IMPLEMENT THE SORTING, PAGINATION AND OTHER STUFF)
  const allContacts = await query;
  res.status(200).json({
    status: 'success',
    results: allContacts.length,
    data: {
      allContacts,
    },
  });
});

exports.getContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  //Contact.findOne({_id:req.params.id})
  if (!contact) {
    return next(new AppError('No contact with this ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: contact,
  });
});

exports.createContact = catchAsync(async (req, res, next) => {
  // const newContact = new Contact({});
  // newContact.save();
  const newContact = await Contact.create(req.body); //same functionality with the 2 lines above.

  res.status(201).json({
    status: 'success',
    data: {
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
