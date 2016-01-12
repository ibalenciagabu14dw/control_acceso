var connection = require('../models/connection');
var time = require('../models/time');
var profesor = {};
var day;

time.diaDeLaSemana(function (error,data) {
	if (error) {
		throw error;
	}else{
		day = data;
	}//.else
});//.time.diaDeLaSemana

/*
*	devuelve el id,tarjeta_activada,presencia de profesor seguun numero de tarjeta
*/
profesor.buscarProfesorPorTarjeta = function(num_tarjeta,callback){
	if (connection){
		var sql = 'SELECT id_profesor,tarjeta_activada,presencia FROM profesores WHERE num_tarjeta = ' + connection.escape(num_tarjeta);
		connection.query(sql, function (error, row){
			if(error){
				throw error;
			}
			else{
				callback(null,row);
			}//.else
		});//.connection.query
	}//.if (connection)
}//.profesor.buscarProfesorPorTarjeta

/*
*	devuelve nombre y foto del profesor
*/
profesor.buscarProfesorPorId = function(id_profesor,callback){
	if(connection){
		var sql = 'SELECT nombre,foto,correo FROM profesores WHERE id_profesor ='+id_profesor;
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				var fotoFinal = row[0].foto.toString('base64');
				callback(null,row[0].nombre,fotoFinal,row[0].correo);
			}//.else
		});//.connection.query
	}//.if(connection)
}//.profesor.buscarProfesorPorId

/*
*	devuelve nombre y foto del profesor NO FUNCIONA
*/
profesor.buscarProfesorPorNombre = function(nombre,callback){
	if(connection){
		var sql = 'SELECT id_profesor,nombre FROM profesores WHERE nombre="profesor1"';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				console.log(row);
				callback(null,row);
			}//.else
		});//.connection.query
	}//.if(connection)
}//.profesor.buscarProfesorPorNombre

/*
*	devuelve profesor segun correo
*/
profesor.buscarProfesorPorCorreo = function(correo,callback) {
	if (connection) {
		var sql = 'SELECT id_profesor,nombre,apellidos,correo,password,foto,admin from profesores WHERE correo = "'+correo+'"';
		connection.query(sql, function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}
		});
	};//.if (connection)
}//.profesor.buscarProfesorPorCorreo 

/*
*	devuelve el id_aula en el que tiene que estar segun tarjeta dia de la semana y hora
*/
profesor.aulaEnLaQueTieneQueEstar = function (idT,curr_time,callback) {
	if (connection) {
		var sqlAula = 'SELECT id_aula FROM horario_grupos WHERE dia_semana = "'+day+'" and ("'+curr_time+'" BETWEEN hora_inicio and hora_final) and id_horario_grupo IN (SELECT id_horario_grupo FROM horario_profesores WHERE dia_semana = "'+day+'" and ("'+curr_time+'" BETWEEN hora_inicio and hora_final) and id_profesor IN (SELECT id_profesor FROM profesores WHERE num_tarjeta ="'+idT+'"))';
		connection.query(sqlAula, function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}
		});
	}//.if (connection)
}//.profesor.aulaEnLaQueTieneQueEstar

/*
*	conmuta la presencia del profesor a 0 o a 1
*/
profesor.updatePresenciaProfesor = function (idT,callback) {
	this.presenciaProfesor(idT,function (error,data) {
		if (data[0].presencia == 0) {
			var sqlUpdate = 'UPDATE profesores SET presencia = 1 WHERE num_tarjeta ="'+idT+'"';
			connection.query(sqlUpdate,function (error) {
				if (error) {
					throw error;
				}else{
					callback(null);
				}//.else
			});//.connection.query
		}else{
			var sqlUpdate = 'UPDATE profesores SET presencia = 0 WHERE num_tarjeta ="'+idT+'"';
			connection.query(sqlUpdate,function (error) {
				if (error) {
					throw error;
				}else{
					callback(null);
				}//.else
			});//.connection.query
		}
	});//.this.presenciaProfesor
}//.profesor.updatePresenciaProfesor

/*
*	devuelve el estado de presencia segun la tarjeta
*/
profesor.presenciaProfesor = function (idT,callback) {
	var sqlProfesorPresencia = 'SELECT presencia FROM profesores WHERE num_tarjeta ="'+idT+'"';
	connection.query(sqlProfesorPresencia, function (error,row) {
		if (error) {
			throw error;
		}else{
			callback(null,row);
		}//.else
	});//.connection.query
}//.profesor.presenciaProfesor


/*
*	devuelve los alumnos del profesor en la hora actual en esa clase
*/
profesor.losAlumnosDeSuClaseActual = function (idProfesor,curr_time,callback) {
	if (connection) {
		// sentencia sql original,comentar para hacer pruebas
		//var sqlProfesorClaseActual = 'SELECT nombre,apellidos,foto FROM alumnos WHERE id_alumno IN (SELECT id_alumno FROM alumno_grupos  WHERE id_grupo IN (SELECT id_grupo FROM horario_grupos WHERE id_horario_grupo and (dia_semana="'+day+'") and ("'+curr_time+'" between hora_inicio and hora_final) and id_horario_grupo IN (SELECT id_horario_grupo FROM horario_profesores WHERE id_profesor="'+idProfesor+'"  and (dia_semana="'+day+'") and ("'+curr_time+'" between hora_inicio and hora_final))))';
		//para hacer pruebas
		var sqlProfesorClaseActual = 'SELECT presencia,num_tarjeta,nombre,apellidos,foto FROM alumnos WHERE id_alumno IN (SELECT id_alumno FROM alumno_grupos  WHERE id_grupo IN (SELECT id_grupo FROM horario_grupos WHERE id_horario_grupo and (dia_semana="'+day+'") and ("'+curr_time+'" between hora_inicio and hora_final) and id_horario_grupo IN (SELECT id_horario_grupo FROM horario_profesores WHERE id_profesor="'+idProfesor+'"  and (dia_semana="'+day+'") and ("'+curr_time+'" between hora_inicio and hora_final))))';
		connection.query(sqlProfesorClaseActual, function (error,row) {
			if (error) {
				throw error;
			}else{
				//console.log(row);
				var presenciaArray = [];
				var idTArray = [];
				var nombreArray = [];
				var apellidosArray = [];
				var fotoArray = [];
				for (var i= 0;i<row.length;i++){
					//console.log (row[i]);
					var presencia = row[i].presencia;
					var idT = row[i].num_tarjeta;
					var nombre = row[i].nombre;
					var apellidos = row[i].apellidos;
					var foto = row[i].foto;//foto del alumno
					var fotofinal = foto.toString('base64');
					presenciaArray.push(presencia);
					idTArray.push(idT);
					nombreArray.push(nombre); 
					apellidosArray.push(apellidos);
					fotoArray.push(fotofinal);
					//console.log(nombre);
					//console.log(apellidos);
					//console.log(foto);
				}//.for (var i= 0;i<row.length;i++)
					//console.log(nombreArray); 
					//console.log(apellidosArray); 
					//console.log(fotoArray); 
				callback(null,presenciaArray,idTArray,nombreArray,apellidosArray,fotoArray);
			}//.else
		});//.connection.query
	}//.if (connection)
}//.profesor.losAlumnosDeSuClaseActual

/*
*	agregar un profesor (dni,nombre,apellidos,correo,password,fotoblob,num_tarjeta)
*/
profesor.insertarProfesor = function (dni,nombre,apellidos,correo,password,fotoblob,num_tarjeta,callback) {
								
	var profesor = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo , password: password , foto: fotoblob, tarjeta_activada: '0' , num_tarjeta: num_tarjeta, presencia: '0' , admin: '0' };
	var sqlinsertarProfesor = 'INSERT INTO profesores SET ?';

	connection.query(sqlinsertarProfesor,profesor, function(error){
	  if (error) {
			throw error;
		}else{
			console.log('insertarProfesor correctamente');
		}//.else
	});//.connection.query
}//.profesor.insertarProfesor

/*
*	modificar un profesor en la tabla profesores (dni,nombre,apellidos,correo,password,foto,num_tarjeta) con el id
*/
profesor.modificarProfesor = function (id,dni,nombre,apellidos,correo,password,foto,num_tarjeta,callback) {							
	var profesor = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo , foto: foto, tarjeta_activada: '0' , num_tarjeta: num_tarjeta, presencia: '0' };
	var sqlmodificarProfesor = 'UPDATE profesores SET ? WHERE id_profesor ="'+id+'"';
	connection.query(sqlmodificarProfesor,profesor, function(error){
	  if (error) {
			throw error;
			console.log(error);
		}else{
			console.log('modificarProfesor correctamente');
		}//.else
	});//.connection.query
}//.profesor.modificarProfesor

/*
*	borrar un profesor en la tabla profesores con el id
*/
profesor.borrarProfesor = function (id,callback) {							
	connection.query('DELETE FROM profesores WHERE id_profesor= "'+id+'"', function(error){
	  if (error) {
			throw error;
			console.log(error);
		}else{
			console.log('borrarProfesor correctamente');
		}//.else
	});//.connection.query
}//.profesor.borrarProfesor 

/*
*	muestra todos los id_profesor de la tabla profesores
*/
profesor.mostrarTodosLosIdProfesor = function (callback) {							
	connection.query('SELECT id_profesor FROM profesores', function(error,row){
	  if (error) {
			throw error;
			console.log(error);
		}else{
			//console.log(row);
			var id_profesorArray = [];
			for (var i= 0;i<row.length;i++){
					//console.log ("row : " + row[i].id_profesor);
					var id = row[i].id_profesor;
					id_profesorArray.push(id);
				}//.for (var i= 0;i<row.length;i++)
					//console.log(id_profesorArray);
					function compareNumbers(a, b) {
					  return a - b;
					} 
					id_profesorArray.sort(compareNumbers);
					//console.log("sort: " + id_profesorArray);
				callback(null,id_profesorArray);
			console.log('mostrarTodosLosIdProfesor correctamente');
		}//.else
	});//.connection.query
}//.profesor.mostrarTodosLosIdProfesor 

/*
*	devuelve el horario de un profesor segun correo
*/
profesor.horarioProfesorCompleto = function(correo,callback) {
	if (connection) {
		var sql = 'SELECT p.dia_semana, p.hora_inicio, p.hora_final, a.numero, s.nombre, g.nombre_grupo FROM horario_profesores p LEFT JOIN horario_grupos r ON (p.id_horario_grupo = r.id_horario_grupo) INNER JOIN asignaturas s ON (r.id_asignatura = s.id_asignatura) INNER JOIN grupos g ON (r.id_grupo = g.id_grupo) INNER JOIN aulas a ON (r.id_aula = a.id_aula) WHERE p.id_profesor =(SELECT id_profesor FROM profesores WHERE correo ="'+correo+'")';
		connection.query(sql, function(error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}
		})//connection.query
	}else{

	}//if connection
}//horarioProfesorCompleto

module.exports = profesor;