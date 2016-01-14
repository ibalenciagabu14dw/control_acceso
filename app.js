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
//require (attach server on www.js)
app.io = require('socket.io')();
//importar alumno
var alumno = require('./models/alumno');
//configurar variable global io
app.set('io',app.io);
//escucha servidor io
app.io.on('connection', function(socket){  
  console.log('a user connected');
});
//escucha servidor io 2
app.io.on('connection', function(socket){
  console.log("conectado");
  //al escuchar cambiaCliente desde el cliente
  socket.on('cambiaCliente', function(msg){
    console.log(msg);
    //update presencia alumno
    alumno.updatePresenciaAlumno(msg, function (error) {
      if (error) {
        throw error;
      }else{
        //emitir cambiaServidor al cliente para cambiar color presencia alumno
        app.io.emit('cambiaServidor',msg);
        console.log("ok update presencia alumno por io");
      }
    })
  });
});
//*******************socket.io*fin*******************************

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
