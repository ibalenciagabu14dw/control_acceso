var connection = require('../models/connection');
var time = require('../models/time');
var io = require('socket.io')();
console.log(io);
var alumno = {};
var day;


io.on('connection', function(socket){
	console.log("conectado");
  socket.on('cambiaCliente', function(msg){
    console.log(msg);
    this.updatePresenciaAlumno(msg, function (error) {
      if (error) {
        throw error;
      }else{
        console.log("ok update presencia alumno por io");
      }
    })
  });
});

time.diaDeLaSemana(function (error,data) {
	if (error) {
		throw error;
	}else{
		day = data;
	}
});

/*
*	devuelve el id,tarjeta_activada,presencia de alumno seguun numero de tarjeta
*/
alumno.buscarAlumnoPorTarjeta = function(num_tarjeta,callback){
	if (connection){
		var sql = 'SELECT id_alumno,tarjeta_activada,presencia FROM alumnos WHERE num_tarjeta = ' + connection.escape(num_tarjeta);
		connection.query(sql, function (error, row){
			if(error){
				throw error;
			}else{
				callback(null,row);
			}//.else
		});//.connection.query
	}//.if (connection)
}//.alumno.buscarAlumnoPorTarjeta

/*
*	devuelve el id_aula en el que deberia de estar segun tarjeta, hora y dia de la semana
*/
alumno.aulaEnLaQueTieneQueEstar = function (idT,curr_time,callback) {
	if (connection) {
		var sqlAula = 'SELECT id_aula FROM horario_grupos WHERE id_grupo IN (SELECT id_grupo FROM alumno_grupos WHERE dia_semana = "'+day+'" and ("'+curr_time+'" BETWEEN hora_inicio and hora_final) and id_alumno IN (SELECT id_alumno FROM alumnos WHERE num_tarjeta ="'+idT+'"))';
		connection.query(sqlAula, function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}//.else
		});//.connection.query
	}//.if (connection)
}//.alumno.aulaEnLaQueTieneQueEstar

/*
*	conmuta la presencia del alumno a 0 o a 1 por numero de tarjeta
*/

alumno.updatePresenciaAlumno = function (idT,callback) {
	this.presenciaAlumno(idT,function (error,data) {
		if (data[0].presencia == 0) {
			var sqlUpdate = 'UPDATE alumnos SET presencia = 1 WHERE num_tarjeta ="'+idT+'"';
			connection.query(sqlUpdate,function (error) {
				if (error) {
					throw error;
				}else{
					io.emit('cambiaServidor',idT);
					console.log(io);
					callback(null);
				}//.else
			});//.connection.query
		}else{
			var sqlUpdate = 'UPDATE alumnos SET presencia = 0 WHERE num_tarjeta ="'+idT+'"';
			connection.query(sqlUpdate,function (error) {
				if (error) {
					throw error;
				}else{
					io.emit('cambiaServidor',idT);
					callback(null);
				}//.else
			});//.connection.query
		}//.else
	});//.this.presenciaAlumno
}//.alumno.updatePresenciaAlumno


/*
*	devuelve el estado de la presencia del alumno por numero de tarjeta
*/
alumno.presenciaAlumno = function (idT,callback) {
	var sqlAlumnoPresencia = 'SELECT presencia FROM alumnos WHERE num_tarjeta ="'+idT+'"';
	connection.query(sqlAlumnoPresencia, function (error,row) {
		if (error) {
			throw error;
		}else{
			callback(null,row);
		}//.else
	});//.connection.query
}//.alumno.presenciaAlumno


/*
*	agrega un alumno a la tabla alumnos (dni,nombre,apellidos,correo,foto,num_tarjeta)
*/
alumno.insertarAlumno = function (dni,nombre,apellidos,correo,foto,num_tarjeta,callback) {							
	var alumno = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo , foto: foto, tarjeta_activada: '0' , num_tarjeta: num_tarjeta, presencia: '0' };
	var sqlinsertarAlumno = 'INSERT INTO alumnos SET ?';
	connection.query(sqlinsertarAlumno,alumno, function(error){
	  if (error) {
			throw error;
		}else{
			console.log('insertarAlumno correctamente');
		}//.else
	});//.connection.query
}//.alumno.insertarAlumno

/*
*	modificar un alumno en la tabla alumnos (dni,nombre,apellidos,correo,foto,num_tarjeta) con el id
	falta cambiar el grupo
*/
alumno.modificarAlumno = function (id,dni,nombre,apellidos,correo,foto,num_tarjeta,callback) {							
	var alumno = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo , foto: foto, tarjeta_activada: '0' , num_tarjeta: num_tarjeta, presencia: '0' };
	var sqlmodificarAlumno = 'UPDATE alumnos SET ? WHERE id_alumno ="'+id+'"';
	connection.query(sqlmodificarAlumno,alumno, function(error){
	  if (error) {
			throw error;
			console.log(error);
		}else{
			console.log('modificarAlumno correctamente');
		}//.else
	});//.connection.query
}//.alumno.modificarAlumno

/*
*	borrar un alumno en la tabla alumnos con el id
*/
alumno.borrarAlumno = function (id,callback) {							
	connection.query('DELETE FROM alumnos WHERE id_alumno= "'+id+'"', function(error){
	  if (error) {
			throw error;
			console.log(error);
		}else{
			console.log('borrarAlumno correctamente');
		}//.else
	});//.connection.query
}//.alumno.borrarAlumno

/*
*	muestra todos los id_alumno de la tabla alumnos
*/
alumno.mostrarTodosLosIdAlumno = function (callback) {							
	connection.query('SELECT id_alumno FROM alumnos', function(error,row){
	  if (error) {
			throw error;
			console.log(error);
		}else{
			//console.log(row);
			var id_alumnoArray = [];
			for (var i= 0;i<row.length;i++){
					//console.log ("row : " + row[i].id_alumno);
					var id = row[i].id_alumno;
					id_alumnoArray.push(id);
				}//.for (var i= 0;i<row.length;i++)
					//console.log(id_alumnoArray);
					function compareNumbers(a, b) {
					  return a - b;
					} 
					id_alumnoArray.sort(compareNumbers);
					//console.log("sort: " + id_alumnoArray);
				callback(null,id_alumnoArray);
			console.log('mostrarTodosLosIdAlumno correctamente');
		}//.else
	});//.connection.query
}//.alumno.mostrarTodosLosIdAlumno 

module.exports = alumno;