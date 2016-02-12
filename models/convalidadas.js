var connection = require('../models/connection');
var app = require('../app');

var convalidadas = {};

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR asignatura convalidada
*/
convalidadas.agregarAsignaturaConvalidada =  function(id_asignatura,id_alumno,callback) {
	if(connection){
		var convalidadas = { id_asignatura: id_asignatura, id_alumno: id_alumno};						
		var sqlagregarAsignaturaConvalidada = 'INSERT INTO convalidadas SET ?';
		connection.query(sqlagregarAsignaturaConvalidada,convalidadas, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
			}//else
		});//connection.query
	}//if
}//convalidadas.agregarAsignaturaConvalidada

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE alumno_grupo
*/
convalidadas.modificarConvalidadas = function (id_convalidada,id_alumno,id_asignatura,callback) {
	if(connection){							
		var campos = { id_convalidada: id_convalidada, id_alumno: id_alumno, id_asignatura:id_asignatura };
		var sql = 'UPDATE convalidadas SET ? WHERE id_convalidada ="'+id_convalidada+'"';
		connection.query(sql,campos, function(error){
		  	if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//convalidadas.modificarConvalidadas

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE asignatura convalidada
*/
convalidadas.borrarAsignaturaConvalidada =  function(id_alumno,callback) {
	if(connection){					
		var sqlborrarAsignaturaConvalidada = 'DELETE FROM convalidadas WHERE id_alumno= "'+id_alumno+'"';
		connection.query(sqlborrarAsignaturaConvalidada, function(error){
		  if (error) {
				throw error;
				console.log(error);
			}else{
			}//else
		});//connection.query
	}//if (connection)
}//convalidadas.borrarAsignaturaConvalidada

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
*	BUSCAR todas las convalidadas
*/
convalidadas.buscarTodasLasConvalidadas = function (callback) {
	if(connection){							
		connection.query('SELECT id_convalidada, id_alumno,id_asignatura FROM convalidadas', function(error,row){
		  	if (error) {
				console.log(error);
				throw error;
			}else{
			    callback(null,row);
			}//else
		});//connection.query
	}//if
}//convalidadas.buscarTodasLasConvalidadas

/*
*	BUSCAR convalidada por id_convalidada
*/
convalidadas.buscarConvalidadaPorIdConvalidada = function(id_convalidada,callback){
	if(connection){
		var sql = 'SELECT id_convalidada, id_alumno,id_asignatura FROM convalidadas WHERE id_convalidada ="'+id_convalidada+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//convalidadas.buscarConvalidadaPorIdConvalidada

/*
*	BUSCAR convalidada por id_alumno
*/
convalidadas.buscarConvalidadaPorIdAlumno = function(id_alumno,callback){
	if(connection){
		var sql = 'SELECT id_convalidada, id_alumno,id_asignatura FROM convalidadas WHERE id_alumno ="'+id_alumno+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//convalidadas.buscarConvalidadaPorIdAlumno

/*
*	BUSCAR convalidada por id_asignatura
*/
convalidadas.buscarConvalidadaPorIdAsignatura = function(id_asignatura,callback){
	if(connection){
		var sql = 'SELECT id_convalidada, id_alumno,id_asignatura FROM convalidadas WHERE id_asignatura ="'+id_asignatura+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//convalidadas.buscarConvalidadaPorIdAsignatura

/*
*	BUSCAR convalidada por id_alumno e id_asignatura
*/
convalidadas.buscarConvalidadaPorIdAlumnoYIdAsignatura = function(id_alumno,id_asignatura,callback){
	if(connection){
		var sql = 'SELECT id_convalidada, id_alumno,id_asignatura FROM convalidadas WHERE id_alumno ="'+id_alumno+'" AND id_asignatura ="'+id_asignatura+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//convalidadas.buscarConvalidadaPorIdAlumnoYIdAsignatura

/****************************************************************************************************************************/

module.exports = convalidadas;


