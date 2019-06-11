var dotenv = require('dotenv');
require('dotenv').config({path: __dirname + '/.env'})
var createError = require('http-errors');
var express = require('express');
var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
const uuidv1 = require('uuid/v1');
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const AI_SESSION_ID = uuidv1();
const dialogflow = require('apiai');
const ai = dialogflow(ACCESS_TOKEN);
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var orderRouter = require('./routes/order');

const mongoose = require('mongoose');
const Dishes = require('./models/orderModel');
var config = require('./config');

const url = config.mongoUrl;
const connect = mongoose.connect(url);
connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const server = app.listen(3001, function(){
	console.log('listening on  port %d', server.address().port);
});

const socketio = require('socket.io')(server);
socketio.on('connection', function(socket){
  console.log('a user connected');
});
app.get('/chat',(req,res)=> {
  res.sendFile(__dirname + '/views/app.html');
});
socketio.on('connection', function(socket) {
  socket.on('chat request', (text) => {
    console.log('Message: ' + text);

    // Get a reply from API.ai

    let aiReq = ai.textRequest(text, {
      sessionId: AI_SESSION_ID
    });

    aiReq.on('response', (response) => {
      let aiResponse = response.result.fulfillment.speech;
      console.log('AI Response: ' + aiResponse);
      socket.emit('ai response', aiResponse);
    });

    aiReq.on('error', (error) => {
      console.log(error);
    });

    aiReq.end();

  });
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/order', orderRouter);

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
