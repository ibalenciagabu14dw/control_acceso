var dispositivo = {};
var connection = require('../models/connection');
var time = require('../models/time');

/************************ Modificar *****************************/
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

/****************************************************************************/

/***************************** Buscar ***************************************/
dispositivo.buscarTodosLosDispositivos = function (callback) {
	if (connection) {
		var sql = 'SELECT d.numero_dispositivo,d.ultima_conexion,a.numero FROM dispositivos d LEFT JOIN aulas a ON (a.id_aula = d.id_aula);';
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				var dispositivosArray = [];
				var ultimaConexionArray =[];
				var aulasArray =[];
				for (var i = 0; i < row.length; i++) {
					dispositivosArray.push(row[i].numero_dispositivo);
					var datos = String(row[i].ultima_conexion).split(" ");
					var fecha = datos[0]+" "+datos[1]+" "+datos[2]+" "+datos[3]+" "+datos[4];
					ultimaConexionArray.push(fecha);
					aulasArray.push(row[i].numero);
				};
				callback(null,dispositivosArray,ultimaConexionArray,aulasArray);
			}
		})//connection.query
	};
}//buscarTodosLosDispositivos

dispositivo.buscarDispositivosSinConfigurar = function (callback) {
	if (connection) {
		var sql = 'SELECT id_aula,numero FROM aulas WHERE id_aula NOT IN(SELECT id_aula FROM dispositivos);';
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}
		})//connection.query
	};
}//buscarDispositivosSinConfigurar

/*****************************************************************************/
module.exports = dispositivo;