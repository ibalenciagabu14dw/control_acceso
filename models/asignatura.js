var connection = require('../models/connection');
var app = require('../app');

var asignatura = {};

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR asignatura
*/
asignatura.agregarAsignatura = function (nombre,clave,obligatoria,tipo,callback) {
	if(connection){						
		var asignatura = { nombre: nombre, clave: clave ,obligatoria: obligatoria, tipo:tipo };
		var sqlagregarAsignatura = 'INSERT INTO asignaturas SET ?';
		connection.query(sqlagregarAsignatura,asignatura, function(error,row){
		  	if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//asignatura.agregarAsignatura

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE asignatura
*/
asignatura.modificarAsigntura = function (id_asignatura,nombre,clave,obligatoria,tipo,callback) {
	if(connection){							
		var asignatura = { nombre: nombre, clave: clave ,obligatoria: obligatoria, tipo:tipo };
		var sqlmodificarAsigntura = 'UPDATE asignaturas SET ? WHERE id_asignatura ="'+id_asignatura+'"';
		connection.query(sqlmodificarAsigntura,asignatura, function(error){
		  	if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//asignatura.modificarAsigntura

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE asignatura
*/
asignatura.borrarAsignatura = function (id_asignatura,callback) {
	if(connection){							
		connection.query('DELETE FROM asignaturas WHERE id_asignatura= "'+id_asignatura+'"', function(error){
		  	if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//asignatura.borrarAsignatura

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
*	BUSCAR todas las asignaturas
*/
asignatura.buscarTodasLasAsignaturas = function (callback) {
	if(connection){							
		connection.query('SELECT id_asignatura,nombre, clave, obligatoria, tipo FROM asignaturas', function(error,row){
		  	if (error) {
				console.log(error);
				throw error;
			}else{
			    callback(null,row);
			}//else
		});//connection.query
	}//if
}//asignatura.buscarTodasLasAsignaturas

/*
*	BUSCAR todos los id_asignatura
*/
asignatura.buscarTodosLosIdAsignatura = function (callback) {
	if(connection){							
		connection.query('SELECT id_asignatura FROM asignaturas', function(error,row){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				var id_AsignaturasArray = [];
				for (var i= 0;i<row.length;i++){
					id_AsignaturasArray.push(row[i].id_asignatura);
				}//for
				function compareNumbers(a, b) {
					return a - b;
				}//compareNumbers
				id_AsignaturasArray.sort(compareNumbers);
				callback(null,id_AsignaturasArray);
			}//else
		});//connection.query
	}//if
}//asignatura.buscarTodosLosIdAsignatura

/*
*	BUSCAR asignaturas por id_asignatura
*/
asignatura.buscarAsignaturaPorId = function(id_asignatura,callback){
	//console.log(connection.escape(id_asignatura));
	if(connection){
		var sql = 'SELECT id_asignatura,nombre,clave,obligatoria,tipo FROM asignaturas WHERE id_asignatura ='+connection.escape(id_asignatura);
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//asignatura.buscarAsignaturaPorId

/*
*	BUSCAR asignaturas por nombre
*/
asignatura.buscarAsignaturaPorNombre = function(nombre,callback){
	if (connection){
		var sql = 'SELECT id_asignatura,nombre,clave,obligatoria,tipo FROM asignaturas WHERE nombre LIKE ' + connection.escape(nombre+'%');
		connection.query(sql, function (error, row){
			if(error){
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//asignatura.buscarAsignaturaPorNombre

/*
*	BUSCAR asignaturas por clave
*/
asignatura.buscarAsignaturaPorClave = function(clave,callback){
	if (connection){
		var sql = 'SELECT id_asignatura,nombre,clave,obligatoria,tipo FROM asignaturas WHERE clave = ' + connection.escape(clave);
		connection.query(sql, function (error, row){
			if(error){
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//asignatura.buscarAsignaturaPorClave

/****************************************************************************************************************************/

module.exports = asignatura;