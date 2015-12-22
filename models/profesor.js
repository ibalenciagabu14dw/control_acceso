var connection = require('../models/connection')
 
var profesor = {};
var diasSemana = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];

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
				console.log(row);
				callback(null,row);
			}
		});
	}
}//buscarProfesorPorTarjeta

/*
*	devuelve el id_aula en el que tiene que estar segun tarjeta dia de la semana y hora
*/
profesor.aulaEnLaQueTieneQueEstar = function (idT,time,callback) {
	var now = new Date();
	var day = now.getDay();
	if (connection) {
		var sqlAula = 'SELECT id_aula FROM horario_grupos WHERE dia_semana = "'+diasSemana[day]+'" and ("'+time+'" BETWEEN hora_inicio and hora_final) and id_horario_grupo IN (SELECT id_horario_grupo FROM horario_profesores WHERE dia_semana = "'+diasSemana[day]+'" and ("'+time+'" BETWEEN hora_inicio and hora_final) and id_profesor IN (SELECT id_profesor FROM profesores WHERE num_tarjeta ="'+idT+'"))';
		connection.query(sqlAula, function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}
		});
	}//if connection
}//aulaEnLaQueTieneQueEstar


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
				}
			});
		}else{
			var sqlUpdate = 'UPDATE profesores SET presencia = 0 WHERE num_tarjeta ="'+idT+'"';
			connection.query(sqlUpdate,function (error) {
				if (error) {
					throw error;
				}else{
					callback(null);
				}
			});
		}
	});
}

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
		}
	});
}


/*
*	devuelve los alumnos del profesor en la hora actual en esa clase
*/
profesor.losAlumnosDeSuClaseActual = function (idProfesor,time,callback) {
	var now = new Date();
	var day = now.getDay();
	var current_hour = now.getHours();

	if (connection) {

		/*'SELECT id_aula FROM horario_grupos WHERE dia_semana = "'+diasSemana[day]+'" and 
		("'+time+'" BETWEEN hora_inicio and hora_final) and id_horario_grupo IN 
		(SELECT id_horario_grupo FROM horario_profesores WHERE dia_semana = "'+diasSemana[day]+'" and
			("'+time+'" BETWEEN hora_inicio and hora_final) and id_profesor IN 
			(SELECT id_profesor FROM profesores WHERE num_tarjeta ="'+idT+'"))';*/

		var sqlProfesorClaseActual = 'SELECT nombre,apellidos,foto FROM alumnos WHERE id_alumno IN (SELECT id_alumno FROM alumno_grupos  WHERE id_grupo IN (SELECT id_grupo FROM horario_grupos WHERE id_horario_grupo and (dia_semana="'+diasSemana[day]+'") and ("'+time+'" between hora_inicio and hora_final) and id_horario_grupo IN (SELECT id_horario_grupo FROM horario_profesores WHERE id_profesor="'+idProfesor+'"  and (dia_semana="'+diasSemana[day]+'") and ("'+time+'" between hora_inicio and hora_final))))';
		connection.query(sqlProfesorClaseActual, function (error,row) {
			if (error) {
				throw error;
			}else{
				console.log("hora actual" + current_hour);
				//console.log(row);
				callback(null,row);
			}
		});
	}//if connection
}//losAlumnosDeSuClaseActual

module.exports = profesor;