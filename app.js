var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var emailValidator = require('./middlewares/email-validator');
var middlewares = require('./middlewares');

var index = require('./routes/index');
var user = require('./routes/user');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
app.use('/user', middlewares.emailValidator,  user);
app.use('/user', user);

module.exports = app;