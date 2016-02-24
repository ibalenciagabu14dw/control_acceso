var dispositivo = {};
var connection = require('../models/connection');
var time = require('../models/time');

/************************ Agregar *******************************/
dispositivo.agregarDispositivo = function (id_aula,numero_dispositivo,callback) {
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
						var sql = 'INSERT INTO dispositivos(id_aula,numero_dispositivo,ultima_conexion) VALUES('+id_aula+','+numero_dispositivo+',"'+diaCompleto+'T'+hora+'")';
						connection.query(sql,function (error) {
							if (error) {
								console.log(error);
								throw error;
							}else{
								callback(null,{dato:"ok"});
							}//else
						})//connection.query
					};//if connection
				}//else idf error 2
			})//horaActual
		}//else if error
	})//diaCompleto	
}//agregarDispositivo
/****************************************************************/

/************************ Modificar *****************************/
/*
* UPDATE dispositivo
*/
dispositivo.modificarDispositivo = function (id_aula,numero_dispositivo,callback) {
	if(connection){
		var dispositivo = { id_aula: id_aula, numero_dispositivo: numero_dispositivo };
		var sql = 'UPDATE dispositivos SET ? WHERE numero_dispositivo ="'+numero_dispositivo+'"';
		connection.query(sql,dispositivo, function(error){
		  	if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//dispositivo.modificarDispositivo

/*
* UPDATE ultima conexion
*/
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

/********************************** Borrar ***********************************/
dispositivo.borrarDispositivo = function (id_dispositivo,callback) {
	if (connection) {
		var sql = 'DELETE FROM dispositivos WHERE numero_dispositivo = '+id_dispositivo;
		connection.query(sql,function (error) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null);
			}
		})//connection.query
	};//if connection
}//borrarDispositivo
/*****************************************************************************/

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
		var sql = 'SELECT id_aula,numero,piso FROM aulas WHERE id_aula NOT IN(SELECT id_aula FROM dispositivos);';
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

dispositivo.buscarIdsDispositivos = function (id_dispositivo,callback) {
	if (connection) {
		var sql = 'SELECT numero_dispositivo FROM dispositivos';
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				var encontrado = 0;
				for (var i = 0; i < row.length; i++) {
					if (row[i].numero_dispositivo == id_dispositivo) {
						encontrado = 1;
					};
				};//for
				if (encontrado == 1) {
					callback(null,{resultado:'noOk'});
				}else{
					callback(null,{resultado:'ok'});
				}//if encontrado
			}//else if error
		})//connection.query
	};//if connection
}//buscarIdsDispositivos

/*
*	BUSCAR dispositivo por id_aula
*/
dispositivo.buscarDispositivoPorIdAula = function(id_aula,callback){
	if(connection){
		var sql = 'SELECT id_aula,numero_dispositivo FROM dispositivos WHERE id_aula ="'+id_aula+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//dispositivo.buscarDispositivoPorIdAula

/*
*	BUSCAR dispositivo por numero_dispositivo
*/
dispositivo.buscarDispositivoPorNumeroDispositivo = function(numero_dispositivo,callback){
	if(connection){
		var sql = 'SELECT id_aula,numero_dispositivo FROM dispositivos WHERE numero_dispositivo ="'+numero_dispositivo+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				console.log(row);
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//dispositivo.buscarDispositivoPorNumeroDispositivo

/*
*	BUSCAR asignaturas por id_alumno y id_asignatura
*/
dispositivo.buscarDispositivoPorIdAulaYNumeroDispositivo = function(id_aula,numero_dispositivo,callback){
	if (connection) {
		var sql = 'SELECT id_aula,numero_dispositivo FROM dispositivos WHERE id_aula = ' + connection.escape(id_aula)+' and numero_dispositivo ='+ connection.escape(numero_dispositivo);
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		})//connection.query
	};//if
}//dispositivo.buscarDispositivoPorIdAulaYNumeroDispositivo


/*****************************************************************************/

module.exports = dispositivo;