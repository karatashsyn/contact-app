const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const contactRouter = require('./routes/contactRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
//MIDDLEWARES

//Middleware(stands between the request and the response). Thanks to the middleware below(express.json()),
//data from the boddy is added to the request object. We are now able to access the request body
app.use(express.json());
//We said app.use(), so express.json() is added to the middleware stack

//Creating our own middleware
app.use((req, res, next) => {
  //When we passed the (rex,res,next), express knows that we define a middleware function
  console.log('Hello from the middleware ☀️');
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

//Viewer
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'views')));

//Set Security http headers
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  //app.use(morgan('tiny'));
} //morgan('tiny') returns a function }

//Limiting too many requests
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again later',
});

app.use('/api', limiter);

app.use(mongoSanitize());

app.use(xss());
app.use(express.json());
app.use(cookieParser());

//Routes

app.use('/', viewRouter);
app.use('/api/v1/contacts', contactRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  //   const err = new Error(`Can't find ${req.originalUrl} on this server`);
  //   err.status = 'fail';
  //   err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
