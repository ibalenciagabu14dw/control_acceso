var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var configFuncionamiento = require('./routes/configFuncionamiento');
var config = require('./routes/config');
var vistaProfesor = require('./routes/vistaProfesor');
var presencia = require('./routes/presencia');

var app = express();
//*******************socket.io***********************************
app.io = require('socket.io')();
console.log(app.io);
/*var alumno = require('./models/alumno');
app.io.on('connection', function(socket){  
  console.log('a user connected');
  console.log(app.io);
  socket.on('cambiaCliente', function(msg){
    alumno.updatePresenciaAlumno(msg, function (error) {
      if (error) {
        console.log("error");
      }else{
        console.log("update ok io");
      }
    })
    console.log(msg);
  });
});*/
//*******************socket.io***********************************

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/', configFuncionamiento )
app.use('/users', users);
app.use('/config',config);
app.use('/vistaProfesor',vistaProfesor);
app.use('/presencia', presencia);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
