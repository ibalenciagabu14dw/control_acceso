var io;
var Alumno_socket = function () {};

Alumno_socket.prototype.connect = function (server) {
    io = require('socket.io')(server);
}

module.exports = Alumno_socket;



/*
* socket.io
*/
/* 
var io = require('socket.io')(server);

io.on('connection', function(socket){
  socket.on('cambiaCliente', function(msg){
    console.log(msg);
    alumno.updatePresenciaAlumno(msg, function (error) {
      if (error) {
        throw error;
      }else{
        console.log("ok update presencia alumno por io");
      }
    })
  });
});
*/
/*
* socket.io
*/