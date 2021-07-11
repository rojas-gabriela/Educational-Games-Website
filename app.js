var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const app = express()

// static files
app.use(express.static('public'))
app.use('/stylesheets', express.static(__dirname + 'public/stylesheets'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/javascripts', express.static(__dirname + 'public/stylesheets'))

// view engine setup
app.set('views', __dirname + '/src/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// Routes
const indexRouter = require('./src/routes/index')
app.use('/', indexRouter)

const apiRouter = require('./src/routes/api')
app.use('/api', apiRouter)

const fruitsRouter = require('./src/routes/fruits')
app.use('/fruits4kids', fruitsRouter)

const geoRouter = require('./src/routes/geo')
app.use('/geo4kids', geoRouter)

const mathRouter = require('./src/routes/math')
app.use('/math4kids', mathRouter)


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
