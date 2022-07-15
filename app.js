const path = require('path');
const express = require('express');
const app = express();
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const contactRouter = require('./routes/contactRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const html = require('html');

//MIDDLEWARES

app.use(express.json());

// //Viewer
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'assets')));

app.set('view engine', 'ejs');


// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('tiny'));
// } //morgan('tiny') returns a function }

//Limiting too many requests
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again later',
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

//Routes

app.use('/', viewRouter);
app.use('/api/v1/contacts', contactRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = 'fail';
  err.statusCode = 404;

  next();
  new AppError(`Can't find ${req.originalUrl} on this server`, 404);
});
app.use(globalErrorHandler);
module.exports = app;
