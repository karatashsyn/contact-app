const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const AppError = require('../utils/appError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    // expires: new Date(
    //   Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 3600000
    // ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  //Removing the password from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorazitaon &&
    req.headers.authorazitaon.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError('Please log in first to get access.', 401));
  }
});

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    passwordconfirm: req.body.passwordconfirm,
    contacts: req.body.contacts,
  });
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // email and password exist ?
  if (!email || !password) {
    return next(new AppError('Please provide email and password !', 400));
  }
  // user exists && password is correct ?
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // if the conditions above are true, send token to the client
  //   const token = signToken(user._id);
  //   res.status(200).json({
  //     status: 'success',
  //     token,
  //   });
  createSendToken(user, 201, res);
});

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      let decoded;
      if (req.cookies.jwt) {
        //2 Verify token
        decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_SECRET
        );

        //3 Check if user still exists
        const freshUser = await User.findById(decoded.id);
        if (!freshUser) {
          return next(
            new AppError('This user does not exist anymore, log in ')
          );
        }
        //4 Check if user changed password after the JWT was issued
        if (freshUser.changedPasswordAfter(decoded.iat)) {
          return next(
            new AppError('This user changed password recently, log in again')
          );
        }

        //MEANS THERE IS A LOGGED IN USER

        res.locals.user = freshUser;
        req.body = { ...req.body, id: freshUser.id };
        return next();
      }
    } catch (err) {
      return next();
    }
  }
  next();
};


exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};
