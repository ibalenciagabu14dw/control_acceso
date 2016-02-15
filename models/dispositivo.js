var dispositivo = {};
var connection = require('../models/connection');
var time = require('../models/time');

dispositivo.modificarUltimaConexion = function (id,callback) {
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
}//modificarUltimaConexion

dispositivo.buscarTodosLosDispositivos = function (callback) {
	if (connection) {
		var sql = 'SELECT numero_dispositivo,ultima_conexion FROM dispositivos';
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				var dispositivosArray = [];
				var ultimaConexionArray =[];
				for (var i = 0; i < row.length; i++) {
					dispositivosArray.push(row[i].numero_dispositivo);
					ultimaConexionArray.push(row[i].ultima_conexion);
				};
				callback(null,dispositivosArray,ultimaConexionArray);
			}
		})//connection.query
	};
}//buscarTodosLosDispositivos

module.exports = dispositivo;