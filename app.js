var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminloginRouter = require('./routes/adminlogin');
var getorderRouter = require('./routes/getorder');
var addorderRouter = require('./routes/addorder');
var getquoteRouter = require('./routes/getquote');
// var orderhistoryRouter = require('./routes/orderhistory');
var updatequoteRouter = require('./routes/updatequote');

var mysql=require("mysql");
var app = express();
app.use(cors())

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
app.use('/adminlogin', adminloginRouter);
app.use('/getorder', getorderRouter);
app.use('/addorder', addorderRouter);
app.use('/getquote', getquoteRouter);
app.use('/updatequote', updatequoteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    res.header('Access-Control-Allow-Headers: x-my-custom-header');
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
	res.setHeader('Content-Type', 'multipart/form-data');
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
