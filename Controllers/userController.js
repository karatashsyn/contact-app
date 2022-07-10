const { resourceLimits } = require('worker_threads');
const AppError = require('../utils/appError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await User.find();

  res.status(200).json({
    status: 'success',
    results: allUsers.length,
    data: {
      allUsers,
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

// exports.createUser = (req, res) => {
//   const newId = allUsers[allUsers.length - 1].id + 1;
//   const newUser = Object.assign({ id: newId }, req.body);
//   allUsers.push(newUser);
//   fs.writeFile(
//     `${__dirname}/../users.json`,
//     JSON.stringify(allUsers),
//     (err) => {
//       res.status(201).json({
//         status: 'success',
//         data: {
//           user: newUser,
//         },
//       });
//     }
//   );
// };

// exports.updateUser = (req, res) => {
//   res.status(200).json({
//     status: 'success',
//   });
// };

// exports.deleteUser = (req, res) => {
//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// };
