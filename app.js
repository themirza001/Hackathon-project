const express = require('express');
const morgan = require('morgan');
const doctorRouter = require('./routes/doctorRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

app.use('/api/v1/doctors', doctorRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  console.log('generic Function is called');
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
