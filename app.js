const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const security = require('./routes/security');
const admin = require('./routes/admin');
const page = require('./routes/page');
const app = express();
// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.set('view options', { layout: 'layout' });


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use('/', page);
app.use('/security', security);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).render('error.hbs', {error: {message: 'Not found', status: 404}});
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.status(err.status).render('error.hbs', {error: {message: err.message, status: err.status}});
});

module.exports = app;
