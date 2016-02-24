var connection = require('../models/connection');
var time = require('../models/time');
var profesor = {};

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR profesor
*/
profesor.agregarProfesor = function (dni,nombre,apellidos,correo,password,fotoblob,num_tarjeta,callback) {
	if(connection){							
		var profesor = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo , password: password , foto: fotoblob, tarjeta_activada: '0' , num_tarjeta: num_tarjeta, presencia: '0' , admin: '0' };
		var sqlinsertarProfesor = 'INSERT INTO profesores SET ?';
		connection.query(sqlinsertarProfesor,profesor, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//profesor.agregarProfesor

/*
* INSERTAR profesor sin foto
*/
profesor.agregarProfesorSinFoto = function (dni,nombre,apellidos,correo,password,num_tarjeta,callback) {
	if(connection){							
		var profesor = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo , password: password , tarjeta_activada: '0' , num_tarjeta: num_tarjeta, presencia: '0' , admin: '0' };
		var sqlinsertarProfesor = 'INSERT INTO profesores SET ?';
		connection.query(sqlinsertarProfesor,profesor, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//profesor.agregarProfesorSinFoto

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE profesor
*/
profesor.modificarProfesor = function (id_profesor,dni,nombre,apellidos,correo,password,foto,tarjeta_activada,num_tarjeta,admin,callback) {
	if(connection){	
		var profesor = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo , password:password, foto: foto, tarjeta_activada: tarjeta_activada , num_tarjeta: num_tarjeta,presencia: '0' , admin: admin};
		var sqlmodificarProfesor = 'UPDATE profesores SET ? WHERE id_profesor ="'+id_profesor+'"';
		connection.query(sqlmodificarProfesor,profesor, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//profesor.modificarProfesor

/*
* UPDATE profesor sin foto
*/
profesor.modificarProfesorSinFoto = function (id_profesor,dni,nombre,apellidos,correo,password,tarjeta_activada,num_tarjeta,admin,callback) {
	if(connection){	
		var profesor = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo , password:password, tarjeta_activada: tarjeta_activada , num_tarjeta: num_tarjeta,presencia: '0' , admin: admin};
		var sqlmodificarProfesor = 'UPDATE profesores SET ? WHERE id_profesor ="'+id_profesor+'"';
		connection.query(sqlmodificarProfesor,profesor, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//profesor.modificarProfesorSinFoto

/*
* UPDATE presencia profesor
*/
profesor.modificarPresenciaProfesor = function (num_tarjeta,callback) {
	if(connection){
		this.buscarPresenciaProfesor(num_tarjeta,function (error,data) {
			if (data[0].presencia == 0) {
				var sqlUpdate = 'UPDATE profesores SET presencia = 1 WHERE num_tarjeta ="'+num_tarjeta+'"';
				connection.query(sqlUpdate,function (error) {
					if (error) {
						throw error;
						console.log(error);
					}else{
						callback(null);
					}//else
				});//connection.query
			}else{
				var sqlUpdate = 'UPDATE profesores SET presencia = 0 WHERE num_tarjeta ="'+num_tarjeta+'"';
				connection.query(sqlUpdate,function (error) {
					if (error) {
						throw error;
						console.log(error);
					}else{
						callback(null);
					}//else
				});//connection.query
			}//else
		});//this.buscarPresenciaProfesor
	}//if
}//profesor.modificarPresenciaProfesor

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE profesor
*/
profesor.borrarProfesor = function (id_profesor,callback) {
	if(connection){						
		connection.query('DELETE FROM profesores WHERE id_profesor= "'+id_profesor+'"', function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//profesor.borrarProfesor

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
* BUSCAR todos los nombre y apellido de todos los profesores
*/
profesor.mostrarTodosLosIdNombreApellidosProfesor = function (callback) {
	if(connection){						
		connection.query('SELECT id_profesor,nombre,apellidos FROM profesores', function(error,row){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//profesor.mostrarTodosLosIdNombreApellidosProfesor

/*
* BUSCAR profesor por id_profesor
*/
profesor.buscarProfesorPorId = function(id_profesor,callback){
	if(connection){
		var sql = 'SELECT id_profesor,dni,nombre,apellidos,correo,password,num_tarjeta,foto,tarjeta_activada,admin FROM profesores WHERE id_profesor ='+connection.escape(id_profesor);
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				for (i=0;i<row.length;i++){
					row[i].foto = row[i].foto.toString('base64');
				}
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//profesor.buscarProfesorPorId

/*
* BUSCAR profesor por id_profesor sin devolver la foto
*/
profesor.buscarProfesorPorIdSinFoto = function(id_profesor,callback){
	if(connection){
		var sql = 'SELECT id_profesor,dni,nombre,apellidos,correo,password,num_tarjeta,tarjeta_activada,admin FROM profesores WHERE id_profesor ='+connection.escape(id_profesor);
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//profesor.buscarProfesorPorId

/*
* BUSCAR profesor por dni
*/
profesor.buscarProfesorPorDni = function(dni,callback) {
	if (connection) {
		var sql = 'SELECT num_tarjeta,id_profesor,dni,nombre,apellidos,correo,foto,presencia FROM profesores WHERE dni LIKE ' + connection.escape(dni+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}
		})//connection.query
	}//if connection
}//buscarProfesorPorDni

/*
* BUSCAR profesor por dni sin foto
*/
profesor.buscarProfesorPorDniSinFoto = function(dni,callback) {
	if (connection) {
		var sql = 'SELECT num_tarjeta,id_profesor,dni,nombre,apellidos,correo,presencia FROM profesores WHERE dni LIKE ' + connection.escape(dni+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}
		})//connection.query
	}//if connection
}//buscarProfesorPorDniSinFoto

/*
* BUSCAR profesor por nombre y apellidos
*/
profesor.buscarProfesorPorNombreYApellido = function(nombre,apellidos,callback) {
	if (connection) {
		var sql = 'SELECT num_tarjeta,id_profesor,dni,nombre,apellidos,correo,foto,presencia FROM profesores WHERE nombre = ' + connection.escape(nombre)+' and apellidos LIKE '+ connection.escape(apellidos+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}
		})//connection.query
	}//if connection
}//buscarProfesorPorNombreYApellido

/*
* BUSCAR profesor por nombre y apellidos sin foto
*/
profesor.buscarProfesorPorNombreYApellidosinFoto = function(nombre,apellidos,callback) {
	if (connection) {
		var sql = 'SELECT num_tarjeta,id_profesor,dni,nombre,apellidos,correo,presencia FROM profesores WHERE nombre = ' + connection.escape(nombre)+' and apellidos LIKE '+ connection.escape(apellidos+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}
		})//connection.query
	}//if connection
}//buscarProfesorPorNombreYApellidosinFoto

/*
* BUSCAR profesor por correo
*/
profesor.buscarProfesorPorCorreo = function(correo,callback) {
	if (connection) {
		var sql = 'SELECT num_tarjeta,id_profesor,nombre,apellidos,correo,password,foto,admin,presencia from profesores WHERE correo = "'+correo+'"';
		connection.query(sql, function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}//else
		});//connection.query
	};//if
}//profesor.buscarProfesorPorCorreo

/*
* BUSCAR profesor por correo sin foto
*/
profesor.buscarProfesorPorCorreoSinFoto = function(correo,callback) {
	if (connection) {
		var sql = 'SELECT num_tarjeta,id_profesor,nombre,apellidos,correo,password,admin,presencia from profesores WHERE correo = "'+correo+'"';
		connection.query(sql, function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}//else
		});//connection.query
	};//if
}//profesor.buscarProfesorPorCorreoSinFoto

/*
* BUSCAR profesor por num_tarjeta
*/
profesor.buscarProfesorPorTarjeta = function(num_tarjeta,callback){
	if (connection){
		var sql = 'SELECT id_profesor,tarjeta_activada,presencia FROM profesores WHERE num_tarjeta = "'+num_tarjeta+'"';
		connection.query(sql, function (error, row){
			if(error){
				throw error;
				console.log(error);
			}
			else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//profesor.buscarProfesorPorTarjeta

/*
* BUSCAR profesor por nombre
*/
profesor.buscarProfesorPorNombre = function(nombre,callback){
	if(connection){
		var sql = 'SELECT id_profesor,dni,nombre,apellidos,correo,foto FROM profesores WHERE nombre LIKE ' + connection.escape(nombre+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				for (i=0;i<row.length;i++){
					row[i].foto = row[i].foto.toString('base64');
				}
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//profesor.buscarProfesorPorNombre

/*
* BUSCAR profesor por nombre sin foto
*/
profesor.buscarProfesorPorNombreSinFoto = function(nombre,callback){
	if(connection){
		var sql = 'SELECT id_profesor,dni,nombre,apellidos,correo FROM profesores WHERE nombre LIKE ' + connection.escape(nombre+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//profesor.buscarProfesorPorNombre

/*
* BUSCAR todos los id_profesor
*/
profesor.buscarTodosLosIdProfesor = function (callback) {
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
				}//for
				function compareNumbers(a, b) {
					return a - b;
				} 
				id_profesorArray.sort(compareNumbers);
				callback(null,id_profesorArray);
			}//else
		});//connection.query
	}//if
}//profesor.buscarTodosLosIdProfesor

/*
* BUSCAR el estado de la presencia del profesor por num_tarjeta
*/
profesor.buscarPresenciaProfesor = function (num_tarjeta,callback) {
	if(connection){	
		var sqlProfesorPresencia = 'SELECT presencia FROM profesores WHERE num_tarjeta ="'+num_tarjeta+'"';
		connection.query(sqlProfesorPresencia, function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//profesor.buscarPresenciaProfesor

/*
* BUSCAR aula en la que tiene que estar el profesor en ese momento por tarjeta
*/
profesor.buscarAulaEnLaQueTieneQueEstarPorTarjeta = function (num_tarjeta,curr_time,callback) {
	console.log("num_tarjeta");
	var day;
	time.diaDeLaSemana(function (error,data) {
		if (error) {
			throw error;
			console.log(error);
		}else{
			day = data;
		}//else
	});//time.diaDeLaSemana
	if (connection) {
		var sqlAula = 'SELECT id_aula FROM horario_grupos WHERE dia_semana = "'+day+'" and ("'+curr_time+'" BETWEEN hora_inicio and hora_final) and id_horario_grupo IN (SELECT id_horario_grupo FROM horario_profesores WHERE dia_semana = "'+day+'" and ("'+curr_time+'" BETWEEN hora_inicio and hora_final) and id_profesor IN (SELECT id_profesor FROM profesores WHERE num_tarjeta ="'+num_tarjeta+'"))';
		connection.query(sqlAula, function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//profesor.buscarAulaEnLaQueTieneQueEstarPorTarjeta

/*
* BUSCAR aula en la que tiene que estar el profesor en ese momento por id_profesor
*/
profesor.buscarAulaEnLaQueTieneQueEstarPorId = function (id_profesor,curr_time,callback) {
	var day;
	time.diaDeLaSemana(function (error,data) {
		if (error) {
			throw error;
			console.log(error);
		}else{
			day = data;
		}//.else
});//.time.diaDeLaSemana
	if (connection) {
		var sqlAula = 'SELECT id_aula FROM horario_grupos WHERE dia_semana = "'+day+'" and ("'+curr_time+'" BETWEEN hora_inicio and hora_final) and id_horario_grupo IN (SELECT id_horario_grupo FROM horario_profesores WHERE dia_semana = "'+day+'" and ("'+curr_time+'" BETWEEN hora_inicio and hora_final) and id_profesor IN (SELECT id_profesor FROM profesores WHERE id_profesor ="'+id_profesor+'"))';
		connection.query(sqlAula, function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}
		});
	}//.if (connection)
}//.profesor.buscarAulaEnLaQueTieneQueEstarPorId

/*
* BUSCAR los alumnos que deben estar en su clase en ese momento
*/
profesor.buscarLosAlumnosDeSuClaseActual = function (idProfesor,curr_time,callback) {
	var day;
	time.diaDeLaSemana(function (error,data) {
		if (error) {
			throw error;
			console.log(error);
		}else{
			day = data;
		}//else
	});//time.diaDeLaSemana
	if (connection) {
		var sqlProfesorClaseActual = 'SELECT presencia,num_tarjeta,nombre,apellidos,foto FROM alumnos WHERE id_alumno NOT IN (SELECT id_alumno FROM convalidadas WHERE id_asignatura IN (SELECT id_asignatura FROM horario_grupos WHERE id_horario_grupo and (dia_semana="'+day+'") and ("'+curr_time+'" between hora_inicio and hora_final) and id_horario_grupo IN (SELECT id_horario_grupo FROM horario_profesores WHERE id_profesor="'+idProfesor+'"  and (dia_semana="'+day+'") and ("'+curr_time+'" between hora_inicio and hora_final)))) and  id_alumno IN (SELECT id_alumno FROM alumno_grupos  WHERE id_grupo IN (SELECT id_grupo FROM horario_grupos WHERE id_horario_grupo and (dia_semana="'+day+'") and ("'+curr_time+'" between hora_inicio and hora_final) and id_horario_grupo IN (SELECT id_horario_grupo FROM horario_profesores WHERE id_profesor="'+idProfesor+'"  and (dia_semana="'+day+'") and ("'+curr_time+'" between hora_inicio and hora_final))))';
		connection.query(sqlProfesorClaseActual, function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				var presenciaArray = [];
				var num_tarjetaArray = [];
				var nombreArray = [];
				var apellidosArray = [];
				var fotoArray = [];
				for (var i= 0;i<row.length;i++){
					var presencia = row[i].presencia;
					var num_tarjeta = row[i].num_tarjeta;
					var nombre = row[i].nombre;
					var apellidos = row[i].apellidos;
					var foto = row[i].foto;//foto del alumno
					var fotofinal = foto.toString('base64');
					presenciaArray.push(presencia);
					num_tarjetaArray.push(num_tarjeta);
					nombreArray.push(nombre); 
					apellidosArray.push(apellidos);
					fotoArray.push(fotofinal);
				}//for
				callback(null,presenciaArray,num_tarjetaArray,nombreArray,apellidosArray,fotoArray);
			}//else
		});//connection.query
	}//if
}//profesor.buscarLosAlumnosDeSuClaseActual

/*
* BUSCAR los alumnos que deben estar en su clase en ese momento
*/
profesor.buscarLosAlumnosDeSuClaseActualSinFoto = function (idProfesor,curr_time,callback) {
	console.log(idProfesor);
	var day;
	time.diaDeLaSemana(function (error,data) {
		if (error) {
			throw error;
			console.log(error);
		}else{
			day = data;
		}//else
	});//time.diaDeLaSemana
	if (connection) {
		var sqlProfesorClaseActual = 'SELECT presencia,num_tarjeta,nombre,apellidos FROM alumnos WHERE id_alumno NOT IN (SELECT id_alumno FROM convalidadas WHERE id_asignatura IN (SELECT id_asignatura FROM horario_grupos WHERE id_horario_grupo and (dia_semana="'+day+'") and ("'+curr_time+'" between hora_inicio and hora_final) and id_horario_grupo IN (SELECT id_horario_grupo FROM horario_profesores WHERE id_profesor="'+idProfesor+'"  and (dia_semana="'+day+'") and ("'+curr_time+'" between hora_inicio and hora_final)))) and  id_alumno IN (SELECT id_alumno FROM alumno_grupos  WHERE id_grupo IN (SELECT id_grupo FROM horario_grupos WHERE id_horario_grupo and (dia_semana="'+day+'") and ("'+curr_time+'" between hora_inicio and hora_final) and id_horario_grupo IN (SELECT id_horario_grupo FROM horario_profesores WHERE id_profesor="'+idProfesor+'"  and (dia_semana="'+day+'") and ("'+curr_time+'" between hora_inicio and hora_final))))';
		connection.query(sqlProfesorClaseActual, function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				var presenciaArray = [];
				var num_tarjetaArray = [];
				var nombreArray = [];
				var apellidosArray = [];
				for (var i= 0;i<row.length;i++){
					var presencia = row[i].presencia;
					var num_tarjeta = row[i].num_tarjeta;
					var nombre = row[i].nombre;
					var apellidos = row[i].apellidos;
					presenciaArray.push(presencia);
					num_tarjetaArray.push(num_tarjeta);
					nombreArray.push(nombre); 
					apellidosArray.push(apellidos);
				}//for
				callback(null,presenciaArray,num_tarjetaArray,nombreArray,apellidosArray);
			}//else
		});//connection.query
	}//if
}//profesor.buscarLosAlumnosDeSuClaseActualSinFoto

/*
* BUSCAR profesor por id_profesor, dni, correo y num_tarjeta
*/
profesor.buscarProfesorPorIdDniCorreoNum_tarj = function(id_profesor,dni,correo,num_tarjeta,callback) {
	if (connection) {
		var sql = 'SELECT id_profesor,dni,nombre,apellidos,correo,foto,presencia FROM profesores WHERE id_profesor = ' + connection.escape(id_profesor)+' and dni = '+ connection.escape(dni)+' and correo = '+ connection.escape(correo)+' and num_tarjeta = '+ connection.escape(num_tarjeta);
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}//else
		})//connection.query
	};//if
}//profesor.buscarProfesorPorIdDniCorreoNum_tarj

/*
* BUSCAR el horario del profesor por correo
*/
profesor.buscarHorarioProfesorPorCorreo = function(correo,callback) {
	if (connection) {
		var sql = 'SELECT p.dia_semana, p.hora_inicio, p.hora_final, a.numero, s.nombre, g.nombre_grupo FROM horario_profesores p LEFT JOIN horario_grupos r ON (p.id_horario_grupo = r.id_horario_grupo) INNER JOIN asignaturas s ON (r.id_asignatura = s.id_asignatura) INNER JOIN grupos g ON (r.id_grupo = g.id_grupo) INNER JOIN aulas a ON (r.id_aula = a.id_aula) WHERE p.id_profesor =(SELECT id_profesor FROM profesores WHERE correo ="'+correo+'")';
		connection.query(sql, function(error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}//else
		})//connection.query
	}//if
}//profesor.buscarHorarioProfesorPorCorreo

/*
* BUSCAR el id_profesor del profesor que deberia estar en una aula a una hora concreta
*/
profesor.buscarProfesorPorIdAulaEnUnaHora = function (id_aula,curr_time,callback){
	var day;
	time.diaDeLaSemana(function (error,data) {
		if (error) {
			throw error;
			console.log(error);
		}else{
			day = data;
		}//else
	});//time.diaDeLaSemana
	if (connection) {
		var sql = 'SELECT id_profesor FROM horario_profesores WHERE id_horario_grupo IN (SELECT id_horario_grupo FROM horario_grupos WHERE id_aula=' + connection.escape(id_aula)+' AND dia_semana="'+day+'" AND ('+ connection.escape(curr_time)+' between hora_inicio AND hora_final))';
		connection.query(sql,function (error,row) {
			console.log(row);
			if (error) {
				throw error;
				console.log(error);
			}else{
				console.log(row);
				callback(null,row);
			}//else
		})//connection.query
	};//if
}//profesor.buscarProfesorPorIdAulaEnUnaHora

/*
*	BUSCAR las asignaturas que imparte un profesor por id_profesor
*/
profesor.buscarAsignaturasQueImparte = function(id_profesor,callback){
	if(connection){
		var sql = 'SELECT id_asignatura,nombre FROM asignaturas WHERE id_asignatura IN (SELECT id_asignatura FROM profesores_asignaturas WHERE id_profesor ="'+id_profesor+'")';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//profesor.buscarAsignaturasQueImparte

/*
*	BUSCAR las asignaturas que no imparte un profesor por id_profesor
*/
profesor.buscarAsignaturasQueNoImpartePorId = function (id_profesor,callback){
	console.log(id_profesor);
	if(connection){						
		var sqllasAsignaturasQueFaltan = 'SELECT id_asignatura,nombre FROM asignaturas WHERE id_asignatura NOT IN (SELECT id_asignatura FROM profesores_asignaturas WHERE id_profesor ="'+id_profesor+'")';
		connection.query(sqllasAsignaturasQueFaltan, function(error,row){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//profesor.buscarAsignaturasQueNoImpartePorId

/*
*	BUSCAR las asignaturas que no imparte un profesor por tipo
*/
profesor.buscarAsignaturasQueNoImpartePorTipo = function (id_profesor,tipo,callback){
	if(connection){						
		var sql = 'SELECT id_asignatura,nombre FROM asignaturas WHERE tipo="'+tipo+'" and id_asignatura NOT IN (SELECT id_asignatura FROM profesores_asignaturas WHERE id_profesor ="'+id_profesor+'")';
		connection.query(sql, function(error,row){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//profesor.buscarAsignaturasQueNoImpartePorTipo

/****************************************************************************************************************************/

module.exports = profesor;
