'use strict';

var express = require('express');
var path = require('path');
var session = require('express-session');
let logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("html",require("ejs").__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(__dirname + '/public'));

app.use(session({
  name: 'homework3',
  secret: '123456',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 60 * 1000, httpOnly: true}
}));


app.use(bodyParser.urlencoded({extended: false}));
app.use('/', indexRouter);
app.use('/users', usersRouter);



module.exports = app;
