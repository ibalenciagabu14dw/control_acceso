var connection = require('../models/connection')
 
var alumno = {};
var diasSemana = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];

/*
*	devuelve el id,tarjetaActivada,presencia de alumno seguun numero de tarjeta
*/
alumno.buscarAlumnoPorTarjeta = function(num_tarjeta,callback){
	if (connection){
		var sql = 'SELECT id_alumno,tarjetaActivada,presencia FROM alumnos WHERE num_tarjeta = ' + connection.escape(num_tarjeta);
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
}//buscarAlumnoPorTarjeta

/*
*	devuelve el id_aula en el que deberia de estar segun tarjeta, hora y dia de la semana
*/
alumno.aulaEnLaQueTieneQueEstar = function (idT,time,callback) {
	var now = new Date();
	var day = now.getDay();
	if (connection) {
		var sqlAula = 'SELECT id_aula FROM horario_grupo WHERE id_grupo IN (SELECT id_grupo FROM alumno_grupos WHERE dia_semana = "'+diasSemana[day]+'" and ("'+time+'" BETWEEN hora_inicio and hora_final) and id_alumno IN (SELECT id_alumno FROM alumnos WHERE num_tarjeta ='+idT+'))';
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
*	conmuta la presencia del alumno a 0 o a 1
*/
alumno.updatePresenciaAlumno = function (idT,callback) {
	this.presenciaAlumno(idT,function (error,data) {
		if (data[0].presencia == 0) {
			var sqlUpdate = 'UPDATE alumnos SET presencia = 1 WHERE num_tarjeta ='+idT;
			connection.query(sqlUpdate,function (error) {
				if (error) {
					throw error;
				}else{
					callback(null);
				}
			});
		}else{
			var sqlUpdate = 'UPDATE alumnos SET presencia = 0 WHERE num_tarjeta ='+idT;
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
*	devuelve el estado de la presencia del alumno
*/
alumno.presenciaAlumno = function (idT,callback) {
	var sqlAlumnoPresencia = 'SELECT presencia FROM alumnos WHERE num_tarjeta ='+idT;
	connection.query(sqlAlumnoPresencia, function (error,row) {
		if (error) {
			throw error;
		}else{
			callback(null,row);
		}
	});
}


module.exports = alumno;