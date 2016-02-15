var dispositivo = {};
var connection = require('../models/connection');
var time = require('../models/time');

dispositivo.updateUltimaConexion = function (id,callback) {
	var diaCompleto;
	var hora;
	time.diaCompleto(function (error,data) {
		if (error) {
			console.log(error);
			throw error;
		}else{
			diaCompleto = data;
			time.horaActual(function (error,data2) {
				if (error) {
					console.log(error);
					throw error;
				}else{
					hora = data2;
					if (connection) {
						var sql = 'UPDATE dispositivos SET ultima_conexion="'+diaCompleto+'T'+hora+'" WHERE numero_dispositivo='+id;
						connection.query(sql,function (error) {
							if (error) {
								console.log(error);
								throw error;
							}else{
								callback(null);	
							}
						})//connection.query
					};//if connection
				}
			})//horaActual
		}//else error
	})//diaCompleto
}//updateUltimaConexion

module.exports = dispositivo;