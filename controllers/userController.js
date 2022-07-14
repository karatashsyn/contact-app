const { resourceLimits } = require('worker_threads');
const AppError = require('../utils/appError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

// const filteredObj = (obj, ...allowedFields)=>{
//   const new Obj
// }

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

// exports.getUser = catchAsync(async (req, res, next) => {
//   const user = await User.findById(req.params.id);

//   res.status(200).json({
//     status: 'success',
//     results: allUsers.length,
//     data: {
//       user,
//     },
//   });
// });

// exports.getOne = (Model, popOptions) => {
//   catchAsync(async (req, res, next) => {
//     let query = Model.findById(req.params.id);
//     if (popOptions) query = query.populate(popOptions);
//     const doc = await query;

//     if (!doc) {
//       return next(new AppError('No document with this id'));
//     }

//     res.status(200).json({
//       status: 'success',
//       data: {
//         data: doc,
//       },
//     });
//   });
// };

// exports;

// exports.getMe = (req, res, next) => {
//   req.params.id = req;
//   next();
// };

exports.increaseContact = catchAsync(async (req, res, next) => {
  console.log('ICERDEYIZ HOCAM');
  console.log(req.body);

  const currentUser = await User.findById(req.body.id);
  console.log(currentUser);
  // console.log(oldContacts);
  let updatedContacts = [];
  for (let index = 0; index < currentUser.contacts.length; index++) {
    updatedContacts.push(currentUser.contacts[index]);
  }
  const newContact = { name: req.body.name, number: req.body.number };
  updatedContacts.push(newContact);

  const updated = await User.findByIdAndUpdate(
    req.body.id,
    { contacts: updatedContacts },
    {
      new: true,
      runValidators: true,
    }
  );
});

exports.updateContact = catchAsync(async (req, res, next) => {
  currentContactNumber = req.body.number;
  const currentUser = await User.findById(req.body.id);
  let newArray = currentUser.contacts;
  for (let index = 0; index < newArray.length; index++) {
    if (newArray[index].number === req.body.number) {
      newArray[index].name = req.body.name;
    }
    const updated = await User.findByIdAndUpdate(
      req.body.id,
      {
        contacts: newArray,
      },
      { new: true, runValidators: true }
    );
  }
});

exports.deleteContact = catchAsync(async (req, res, next) => {
  currentContactNumber = req.body.number;
  const currentUser = await User.findById(req.body.id);
  let newArray = [];
  for (let index = 0; index < currentUser.contacts.length; index++) {
    console.log(currentUser.contacts[index].number + '---' + req.body.number);
    if (currentUser.contacts[index].number !== currentContactNumber) {
      newArray.push(currentUser.contacts[index]);
    }
  }
  const updated = await User.findByIdAndUpdate(
    req.body.id,
    {
      contacts: newArray,
    },
    { new: true, runValidators: true }
  );
});

// exports.updateMe = async (req, res, next) => {
//   const updated = await User.findByIdAndUpdate(
//     req.user.id,
//     { name: '54' },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );
// };

// exports.deleteUser = (req, res) => {
//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// };
