var connection = require('../models/connection')
 
var alumno = {};

/*
*	devuelve el id,tarjetaActivada,presencia de alumno seguun numero de tarjeta
*/
alumno.buscarAlumnoPorTarjeta = function(num_tarjeta,callback){
	if (connection){
		var sql = 'SELECT id_alumno,tarjetaActivada,presencia FROM alumnos WHERE num_tarjeta = ' + connection.escape(num_tarjeta);
		connection.query(sql, function(error, row){
			if(error){
				throw error;
			}
			else{
				console.log(row);
				console.log(row[0].presencia);
				callback(null,row);
			}
		});
	}
}//buscarAlumnoPorTarjeta


module.exports = alumno;