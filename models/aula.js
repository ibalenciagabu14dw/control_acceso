var connection = require('../models/connection');
var app = require('../app');
var aula = {};

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR aula
*/
aula.agregarAula = function (numero,piso,capacidad,callback) {
	if(connection){
		var aula = { numero: numero, piso: piso, capacidad: capacidad };
		var sqlagregarAula = 'INSERT INTO aulas SET ?';
		connection.query(sqlagregarAula,aula, function(error){
		  	if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//aula.agregarAula

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE aula
*/
aula.modificarAula = function (id,numero,piso,capacidad,callback) {
	if(connection){
		var aula = { numero: numero, piso: piso, capacidad: capacidad };
		var sqlmodificarAula = 'UPDATE aulas SET ? WHERE id_aula ="'+id+'"';
		connection.query(sqlmodificarAula,aula, function(error){
		  	if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//aula.modificarAula

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE aula
*/
aula.borrarAula = function (id,callback) {
	if(connection){							
		connection.query('DELETE FROM aulas WHERE id_aula= "'+id+'"', function(error){
		  	if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//aula.borrarAula

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
*	BUSCAR todos los id_aula
*/
aula.buscarTodosLosIdAula = function (callback) {
	if(connection){							
		connection.query('SELECT id_aula FROM aulas', function(error,row){
			if (error) {
				console.log(error);
				throw error;
			}else{
				var id_AulaArray = [];
				for (var i= 0;i<row.length;i++){
					id_AulaArray.push(row[i].id_aula);
				}//for
				function compareNumbers(a, b) {
					return a - b;
				}//compareNumbers
				id_AulaArray.sort(compareNumbers);
				callback(null,id_AulaArray);
			}//else
		});//connection.query
	}//if
}//aula.buscarTodosLosIdAula

/*
*	BUSCAR todos los id_aula y numero
*/
aula.buscarTodosLosIdYNumero = function (callback) {
	if(connection){							
		connection.query('SELECT id_aula,numero FROM aulas ORDER BY numero', function(error,row){
		  	if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//aula.buscarTodosLosIdYNumero

/*
*	BUSCAR aula por id_aula
*/
aula.buscarAulaPorId = function(id_aula,callback){
	if(connection){
		var sql = 'SELECT id_aula,numero,piso,capacidad FROM aulas WHERE id_aula ="'+id_aula+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//aula.buscarAulaPorId

/*
*	BUSCAR aula por numero
*/
aula.buscarAulaPorNumero = function(numero,callback){
	if (connection){
		var sql = 'SELECT id_aula,numero,piso,capacidad FROM aulas WHERE numero LIKE ' + connection.escape(numero+'%');
		connection.query(sql, function (error, row){
			if(error){
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//aula.buscarAulaPorNumero

/*
*	BUSCAR aula por id_aula y numero
*/
aula.buscarAulaPorIdYNumero = function(id_aula,numero,callback){
	if(connection){
		var sql = 'SELECT id_aula,numero,piso,capacidad FROM aulas WHERE id_aula ="'+id_aula+'" AND numero ="'+numero+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//aula.buscarAulaPorIdYNumero

/****************************************************************************************************************************/

module.exports = aula;