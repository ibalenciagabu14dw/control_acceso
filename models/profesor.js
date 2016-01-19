var connection = require('../models/connection');
var time = require('../models/time');
var profesor = {};
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
*	devuelve los datos del profesor on el id FUNCIONA
*/
profesor.buscarProfesorPorId2 = function(id_profesor,callback){
	//console.log(connection.escape(id_profesor));
	if(connection){
		var sql = 'SELECT id_profesor,dni,nombre,apellidos,correo,password,num_tarjeta,foto,tarjeta_activada,admin FROM profesores WHERE id_profesor ='+connection.escape(id_profesor);
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
					var foto = row[0].foto.toString('base64');//foto del alumno
				    var row2 = {id_profesor : row[0].id_profesor,dni : row[0].dni,nombre : row[0].nombre,apellidos : row[0].apellidos,correo : row[0].correo,password : row[0].password,num_tarjeta : row[0].num_tarjeta,foto : foto,tarjeta_activada : row[0].tarjeta_activada,admin : row[0].admin};
				callback(null,row2);
			}//.else
		});//.connection.query
	}//.if(connection)
}//.profesor.buscarProfesorPorId

/*
*	devuelve nombre y foto del profesor FUNCIONA
*/
profesor.buscarProfesorPorNombre = function(nombre,callback){
	if(connection){
		var sql = 'SELECT id_profesor,dni,nombre,apellidos,correo,foto FROM profesores WHERE nombre LIKE ' + connection.escape(nombre+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}//.else
		});//.connection.query
	}//.if(connection)
}//.profesor.buscarProfesorPorNombre

/*
*	devuelve datos profesor por nombre y apellido
*/
profesor.buscarProfesorPorNombreYApellido = function(nombre,apellidos,callback) {
	if (connection) {
		var sql = 'SELECT num_tarjeta,id_profesor,dni,nombre,apellidos,correo,foto,presencia FROM profesores WHERE nombre LIKE ' + connection.escape(nombre+'%')+' and apellidos LIKE '+ connection.escape(apellidos+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}
		})//connection.query
	}//if connection
}//buscarProfesorPorNombreYApellido

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
	var day;
	time.diaDeLaSemana(function (error,data) {
		if (error) {
			throw error;
		}else{
			day = data;
		}//.else
});//.time.diaDeLaSemana
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
*	devuelve el id_aula en el que tiene que estar segun id_profesor dia de la semana y hora
*/
profesor.aulaEnLaQueTieneQueEstarPorId = function (id_profesor,curr_time,callback) {
	var day;
	time.diaDeLaSemana(function (error,data) {
		if (error) {
			throw error;
		}else{
			day = data;
		}//.else
});//.time.diaDeLaSemana
	if (connection) {
		var sqlAula = 'SELECT id_aula FROM horario_grupos WHERE dia_semana = "'+day+'" and ("'+curr_time+'" BETWEEN hora_inicio and hora_final) and id_horario_grupo IN (SELECT id_horario_grupo FROM horario_profesores WHERE dia_semana = "'+day+'" and ("'+curr_time+'" BETWEEN hora_inicio and hora_final) and id_profesor IN (SELECT id_profesor FROM profesores WHERE id_profesor ="'+id_profesor+'"))';
		connection.query(sqlAula, function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}
		});
	}//.if (connection)
}//.profesor.aulaEnLaQueTieneQueEstarPorId

/*
*	conmuta la presencia del profesor a 0 o a 1
*/
profesor.updatePresenciaProfesor = function (idT,callback) {
	if(connection){
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
			}//.else
		});//.this.presenciaProfesor
	}//.if (connection)
}//.profesor.updatePresenciaProfesor

/*
*	devuelve el estado de presencia segun la tarjeta
*/
profesor.presenciaProfesor = function (idT,callback) {
	if(connection){	
		var sqlProfesorPresencia = 'SELECT presencia FROM profesores WHERE num_tarjeta ="'+idT+'"';
		connection.query(sqlProfesorPresencia, function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}//.else
		});//.connection.query
	}//.if (connection)
}//.profesor.presenciaProfesor


/*
*	devuelve los alumnos del profesor en la hora actual en esa clase
*/
profesor.losAlumnosDeSuClaseActual = function (idProfesor,curr_time,callback) {
	var day;
	time.diaDeLaSemana(function (error,data) {
		if (error) {
			throw error;
		}else{
			day = data;
		}//.else
	});//.time.diaDeLaSemana
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
				}//.for (var i= 0;i<row.length;i++)
				callback(null,presenciaArray,idTArray,nombreArray,apellidosArray,fotoArray);
			}//.else
		});//.connection.query
	}//.if (connection)
}//.profesor.losAlumnosDeSuClaseActual

/*
*	agregar un profesor (dni,nombre,apellidos,correo,password,fotoblob,num_tarjeta)
*/
profesor.insertarProfesor = function (dni,nombre,apellidos,correo,password,fotoblob,num_tarjeta,callback) {
	if(connection){							
		var profesor = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo , password: password , foto: fotoblob, tarjeta_activada: '0' , num_tarjeta: num_tarjeta, presencia: '0' , admin: '0' };
		var sqlinsertarProfesor = 'INSERT INTO profesores SET ?';
		connection.query(sqlinsertarProfesor,profesor, function(error){
		  if (error) {
				throw error;
			}else{
				console.log('insertarProfesor correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.profesor.insertarProfesor

/*
*	modificar un profesor en la tabla profesores (dni,nombre,apellidos,correo,password,foto,num_tarjeta) con el id
*/
profesor.modificarProfesor = function (id,dni,nombre,apellidos,correo,password,foto,tarjeta_activada,num_tarjeta,admin,callback) {
	//console.log(foto);
	if(connection){	
		var profesor = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo , password:password, foto: foto, tarjeta_activada: tarjeta_activada , num_tarjeta: num_tarjeta,presencia: '0' , admin: admin};
		var sqlmodificarProfesor = 'UPDATE profesores SET ? WHERE id_profesor ="'+id+'"';
		connection.query(sqlmodificarProfesor,profesor, function(error){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('modificarProfesor correctamente');
			}//.else
		});//.connection.query
	}
}//.profesor.modificarProfesor

/*
*	modificar un profesor en la tabla profesores (dni,nombre,apellidos,correo,password,foto,num_tarjeta) con el id
*/
profesor.modificarProfesorSinFoto = function (id,dni,nombre,apellidos,correo,password,tarjeta_activada,num_tarjeta,admin,callback) {
	//console.log(foto);
	if(connection){	
		var profesor = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo , password:password, tarjeta_activada: tarjeta_activada , num_tarjeta: num_tarjeta,presencia: '0' , admin: admin};
		var sqlmodificarProfesor = 'UPDATE profesores SET ? WHERE id_profesor ="'+id+'"';
		connection.query(sqlmodificarProfesor,profesor, function(error){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('modificarProfesor correctamente');
			}//.else
		});//.connection.query
	}
}//.profesor.modificarProfesor

/*
*	borrar un profesor en la tabla profesores con el id
*/
profesor.borrarProfesor = function (id,callback) {
	if(connection){						
		connection.query('DELETE FROM profesores WHERE id_profesor= "'+id+'"', function(error){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('borrarProfesor correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.profesor.borrarProfesor 

/*
*	muestra todos los id_profesor de la tabla profesores
*/
profesor.mostrarTodosLosIdProfesor = function (callback) {
	if(connection){						
		connection.query('SELECT id_profesor FROM profesores', function(error,row){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				var id_profesorArray = [];
				for (var i= 0;i<row.length;i++){
						var id = row[i].id_profesor;
						id_profesorArray.push(id);
					}//.for (var i= 0;i<row.length;i++)
						function compareNumbers(a, b) {
						  return a - b;
						} 
						id_profesorArray.sort(compareNumbers);
					callback(null,id_profesorArray);
				console.log('mostrarTodosLosIdProfesor correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
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


profesor.insertarAsignaturasProfesor =  function(id_asignatura,id_profesor,callback) {
	if(connection){
		var profesor_asignatura = { id_asignatura: id_asignatura, id_profesor: id_profesor};						
		var sqlinsertarAsignaturasProfesor = 'INSERT INTO profesores_asignaturas SET ?';
		connection.query(sqlinsertarAsignaturasProfesor,profesor_asignatura, function(error){
		  if (error) {
				throw error;
			}else{
				console.log('insertarAsignaturasProfesor correctamente');
			}//.else
		});//.connection.query
	}
}//.profesor.insertarAsignaturasProfesor

profesor.borrarAsignaturasProfesor =  function(id_profesor,callback) {
	if(connection){					
		var sqlinsertarAsignaturasProfesor = 'DELETE FROM profesores_asignaturas WHERE id_profesor= "'+id_profesor+'"';
		connection.query(sqlinsertarAsignaturasProfesor, function(error){
		  if (error) {
				throw error;
			}else{
				console.log('borrarAsignaturasProfesor correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.profesor.borrarAsignaturasProfesor

module.exports = profesor;
