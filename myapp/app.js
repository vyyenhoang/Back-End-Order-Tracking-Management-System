var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customerRouter = require('./routes/customer');
var productRouter = require('./routes/product');
var orderRouter = require('./routes/order');

var mysql=require("mysql");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  res.locals.connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'tracking'
  });
    res.locals.connection.connect();
    next();

});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/customer', customerRouter);
app.use('/order', orderRouter);
app.use('/product', productRouter);

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
