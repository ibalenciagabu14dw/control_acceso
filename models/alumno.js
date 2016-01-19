var connection = require('../models/connection');
var time = require('../models/time');
var alumno = {};

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
	var day;
	time.diaDeLaSemana(function (error,data) {
		if (error) {
			throw error;
		}else{
			day = data;
		}
	});
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
*	devuelve el id_aula en el que deberia de estar segun id_persona, hora y dia de la semana
*/
alumno.aulaEnLaQueTieneQueEstarPorId = function (id_alumno,curr_time,callback) {
	var day;
	time.diaDeLaSemana(function (error,data) {
		if (error) {
			throw error;
		}else{
			day = data;
		}
	});
	if (connection) {
		var sqlAula = 'SELECT id_aula FROM horario_grupos WHERE id_grupo IN (SELECT id_grupo FROM alumno_grupos WHERE dia_semana = "'+day+'" and ("'+curr_time+'" BETWEEN hora_inicio and hora_final) and id_alumno IN (SELECT id_alumno FROM alumnos WHERE id_alumno ="'+id_alumno+'"))';
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
	if(connection){
		this.presenciaAlumno(idT,function (error,data) {
			if (data[0].presencia == 0) {
				var sqlUpdate = 'UPDATE alumnos SET presencia = 1 WHERE num_tarjeta ="'+idT+'"';
				connection.query(sqlUpdate,function (error) {
					if (error) {
						throw error;
					}else{
						callback(null);
					}//.else
				});//.connection.query
			}else{
				var sqlUpdate = 'UPDATE alumnos SET presencia = 0 WHERE num_tarjeta ="'+idT+'"';
				connection.query(sqlUpdate,function (error) {
					if (error) {
						throw error;
					}else{
						callback(null);
					}//.else
				});//.connection.query
			}//.else
		});//.this.presenciaAlumno
	}//.if (connection)
}//.alumno.updatePresenciaAlumno


/*
*	devuelve el estado de la presencia del alumno por numero de tarjeta
*/
alumno.presenciaAlumno = function (idT,callback) {
	if(connection){
		var sqlAlumnoPresencia = 'SELECT presencia FROM alumnos WHERE num_tarjeta ="'+idT+'"';
		connection.query(sqlAlumnoPresencia, function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}//.else
		});//.connection.query
	}//.if (connection)
}//.alumno.presenciaAlumno


/*
*	agrega un alumno a la tabla alumnos (dni,nombre,apellidos,correo,foto,num_tarjeta)
*/
alumno.insertarAlumno = function (dni,nombre,apellidos,correo,foto,num_tarjeta,callback) {
	if(connection){							
		var alumno = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo , foto: foto, tarjeta_activada: '0' , num_tarjeta: num_tarjeta, presencia: '0' };
		var sqlinsertarAlumno = 'INSERT INTO alumnos SET ?';
		connection.query(sqlinsertarAlumno,alumno, function(error){
		  if (error) {
				throw error;
			}else{
				console.log('insertarAlumno correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.alumno.insertarAlumno

/*
*	modificar un alumno en la tabla alumnos (dni,nombre,apellidos,correo,foto,num_tarjeta) con el id
	falta cambiar el grupo
*/
alumno.modificarAlumno = function (id,dni,nombre,apellidos,correo,foto,num_tarjeta,callback) {
	if(connection){							
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
	}//.if (connection)
}//.alumno.modificarAlumno

alumno.modificarAlumnoSinFoto = function (id,dni,nombre,apellidos,correo,num_tarjeta,callback) {
	if(connection){							
		var alumno = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo, tarjeta_activada: '0' , num_tarjeta: num_tarjeta, presencia: '0' };
		var sqlmodificarAlumno = 'UPDATE alumnos SET ? WHERE id_alumno ="'+id+'"';
		connection.query(sqlmodificarAlumno,alumno, function(error){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('modificarAlumno correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.alumno.modificarAlumno

/*
*	borrar un alumno en la tabla alumnos con el id
*/
alumno.borrarAlumno = function (id,callback) {
	if(connection){							
		connection.query('DELETE FROM alumnos WHERE id_alumno= "'+id+'"', function(error){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('borrarAlumno correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.alumno.borrarAlumno

/*
*	muestra todos los id_alumno de la tabla alumnos
*/
alumno.mostrarTodosLosIdAlumno = function (callback) {
	if(connection){						
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
	}//.if (connection)
}//.alumno.mostrarTodosLosIdAlumno

/*
*	devuelve nombre y foto del alumno COMPROBAR
*/
alumno.buscarAlumnoPorNombre = function(nombre,callback){
	if(connection){
		var sql = 'SELECT id_alumno,dni,nombre,apellidos,correo,foto FROM alumnos WHERE nombre LIKE ' + connection.escape(nombre+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}//.else
		});//.connection.query
	}//.if(connection)
}//.alumno.buscarAlumnoPorNombre

/*
*	devuelve datos de alumno por nombre y apellido
*/
alumno.buscarAlumnoPorNombreYApellido = function(nombre,apellidos,callback) {
	if (connection) {
		var sql = 'SELECT num_tarjeta,id_alumno,dni,nombre,apellidos,correo,foto,presencia FROM alumnos WHERE nombre LIKE ' + connection.escape(nombre+'%')+' and apellidos LIKE '+ connection.escape(apellidos+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}
		})
	};
}//buscarAlumnoPorNombreYApellido

/*
*	devuelve los datos del alumno por id
*/
alumno.buscarAlumnoPorId = function(id_alumno,callback){
	if(connection){
		var sql = 'SELECT id_alumno,dni,nombre,apellidos,correo,num_tarjeta,foto,tarjeta_activada FROM alumnos WHERE id_alumno ='+connection.escape(id_alumno);
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
					var foto = row[0].foto.toString('base64');//foto del alumno
				    var row2 = {id_alumno : row[0].id_alumno,dni : row[0].dni,nombre : row[0].nombre,apellidos : row[0].apellidos,correo : row[0].correo,num_tarjeta : row[0].num_tarjeta,foto : foto,tarjeta_activada : row[0].tarjeta_activada};
				callback(null,row2);
			}//.else
		});//.connection.query
	}//.if(connection)
}//.alumno.buscarAlumnoPorId

alumno.insertarAlumnoGrupos =  function(id_grupo,id_alumno,callback) {
	if(connection){
		var alumno_grupos = { id_grupo: id_grupo, id_alumno: id_alumno};						
		var sqlinsertarAlumnoGrupos = 'INSERT INTO alumno_grupos SET ?';
		connection.query(sqlinsertarAlumnoGrupos,alumno_grupos, function(error){
		  if (error) {
				throw error;
			}else{
				console.log('insertarAlumnoGrupos correctamente');
			}//.else
		});//.connection.query
	}
}//.alumno.insertarAsignaturasProfesor

alumno.borrarAlumnoGrupos =  function(id_alumno,callback) {
	if(connection){					
		var sqlborrarAlumnoGrupos = 'DELETE FROM alumno_grupos WHERE id_alumno= "'+id_alumno+'"';
		connection.query(sqlborrarAlumnoGrupos, function(error){
		  if (error) {
				throw error;
			}else{
				console.log('borrarAlumnoGrupos correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.alumno.borrarAlumnoGrupos

alumno.insertarAsignaturaConvalidada =  function(id_asignatura,id_alumno,callback) {
	if(connection){
		var convalidadas = { id_asignatura: id_asignatura, id_alumno: id_alumno};						
		var sqlinsertarAsignaturaConvalidada = 'INSERT INTO convalidadas SET ?';
		connection.query(sqlinsertarAsignaturaConvalidada,convalidadas, function(error){
		  if (error) {
				throw error;
			}else{
				console.log('insertarAsignaturaConvalidada correctamente');
			}//.else
		});//.connection.query
	}
}//.alumno.insertarAsignaturasProfesor

alumno.borrarAsignaturaConvalidada =  function(id_alumno,callback) {
	if(connection){					
		var sqlborrarAsignaturaConvalidada = 'DELETE FROM convalidadas WHERE id_alumno= "'+id_alumno+'"';
		connection.query(sqlborrarAsignaturaConvalidada, function(error){
		  if (error) {
				throw error;
			}else{
				console.log('borrarAsignaturaConvalidada correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.alumno.borrarAsignaturaConvalidada

module.exports = alumno;