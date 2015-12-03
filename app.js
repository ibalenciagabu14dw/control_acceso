var express = require('express');
//require handlebars
//exphbs = require('express-handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var config = require('./routes/config');
var vistaProfesor = require('./routes/vistaProfesor');
var configApariencia = require('./routes/configApariencia');
var configBasedeDatos = require('./routes/configBasedeDatos');
var configClases = require('./routes/configClases');
var configDispositivos = require('./routes/configDispositivos');
var configGlobal = require('./routes/configGlobal');
var configHorario = require('./routes/configHorario');
var configMaterias = require('./routes/configMaterias');
var configPersonas = require('./routes/configPersonas');


var app = express();

// view engine setup Cambio Jade por handlebars
//app.engine('handlebars', exphbs());
//app.set('view engine', 'handlebars');
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
app.use('/users', users);
app.use('/config',config);
app.use('/vistaProfesor',vistaProfesor);
app.use('/configApariencia',configApariencia);
app.use('/configBasedeDatos', configBasedeDatos);
app.use('/configClases',configClases);
app.use('/configDispositivos',configDispositivos);
app.use('/configGlobal',configGlobal);
app.use('/configHorario',configHorario);
app.use('/configMaterias',configMaterias);
app.use('/configPersonas',configPersonas);

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
