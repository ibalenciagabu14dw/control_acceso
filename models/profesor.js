var connection = require('../models/connection')
 
var profesor = {};
var diasSemana = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];

/*
*	devuelve el id,tarjetaActivada,presencia de profesor seguun numero de tarjeta
*/
profesor.buscarProfesorPorTarjeta = function(num_tarjeta,callback){
	if (connection){
		var sql = 'SELECT id_profesor,tarjetaActivada,presencia FROM profesor WHERE num_tarjeta = ' + connection.escape(num_tarjeta);
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
		var sqlAula = 'SELECT id_aula FROM horario_grupo WHERE dia_semana = "'+diasSemana[day]+'" and ("'+time+'" BETWEEN hora_inicio and hora_final) and id_horario_grupo IN (SELECT id_horario_grupo FROM horario_profesor WHERE dia_semana = "'+diasSemana[day]+'" and ("'+time+'" BETWEEN hora_inicio and hora_final) and id_profesor IN (SELECT id_profesor FROM profesor WHERE num_tarjeta ='+idT+'))';
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
			var sqlUpdate = 'UPDATE profesor SET presencia = 1 WHERE num_tarjeta ='+idT;
			connection.query(sqlUpdate,function (error) {
				if (error) {
					throw error;
				}else{
					callback(null);
				}
			});
		}else{
			var sqlUpdate = 'UPDATE profesor SET presencia = 0 WHERE num_tarjeta ='+idT;
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
	var sqlProfesorPresencia = 'SELECT presencia FROM profesor WHERE num_tarjeta ='+idT;
	connection.query(sqlProfesorPresencia, function (error,row) {
		if (error) {
			throw error;
		}else{
			callback(null,row);
		}
	});
}


module.exports = profesor;