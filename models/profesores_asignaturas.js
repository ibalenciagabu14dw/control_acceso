var connection = require('../models/connection');
var time = require('../models/time');
var profesores_asignaturas = {};

/***********************************************************INSERT*********************************************************/

/*
* INSERT profesor_asignatura
*/
profesores_asignaturas.agregarAsignaturasProfesor =  function(id_asignatura,id_profesor,callback) {
	if(connection){
		var campos = { id_asignatura: id_asignatura, id_profesor: id_profesor};						
		var sql = 'INSERT INTO profesores_asignaturas SET ?';
		connection.query(sql,campos, function(error){
		  if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//profesores_asignaturas.agregarAsignaturasProfesor

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE profesores_asignaturas
*/
profesores_asignaturas.modificarProfesoresAsignaturas = function (id_profesor_asignatura,id_asignatura,id_profesor,callback) {
	if(connection){
		var campos = { id_profesor_asignatura: id_profesor_asignatura, id_asignatura: id_asignatura, id_profesor: id_profesor };
		var sql = 'UPDATE profesores_asignaturas SET ? WHERE id_profesor_asignatura ="'+id_profesor_asignatura+'"';
		connection.query(sql,campos, function(error){
		  	if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//profesores_asignaturas.modificarProfesoresAsignaturas


/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE profesor_asignatura
*/
profesores_asignaturas.borrarProfesoresAsignaturas =  function(id_profesor_asignatura,callback) {
	if(connection){					
		var sql = 'DELETE FROM profesores_asignaturas WHERE id_profesor_asignatura= "'+id_profesor_asignatura+'"';
		connection.query(sql, function(error){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//profesores_asignaturas.borrarProfesoresAsignaturas

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
*	BUSCAR todas las asignaturas de los profesores
*/
profesores_asignaturas.buscarTodosLosProfesoresAsignaturas = function (callback) {
	if(connection){							
		connection.query('SELECT id_profesor_asignatura,id_asignatura,id_profesor FROM profesores_asignaturas', function(error,row){
		  	if (error) {
				console.log(error);
				throw error;
			}else{
			    callback(null,row);
			}//else
		});//connection.query
	}//if
}//profesores_asignaturas.buscarTodosLosProfesoresAsignaturas

/*
*	BUSCAR asignatura del profesor por id_asignatura y id_profesor
*/
profesores_asignaturas.buscarAsignaturaPorIdProfesorAsignatura = function(id_profesor_asignatura,callback){
	if(connection){
		var sql = 'SELECT id_profesor_asignatura,id_asignatura,id_profesor FROM profesores_asignaturas WHERE id_profesor_asignatura ="'+id_profesor_asignatura+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//profesores_asignaturas.buscarAsignaturaPorIdProfesorAsignatura

/*
*	BUSCAR asignatura del profesor por id_asignatura y id_profesor
*/
profesores_asignaturas.buscarAsignaturaPorIdAsignaturaYIdProfesor = function(id_asignatura,id_profesor,callback){
	if(connection){
		var sql = 'SELECT id_profesor_asignatura,id_asignatura,id_profesor FROM profesores_asignaturas WHERE id_asignatura ="'+id_asignatura+'" AND id_profesor ="'+id_profesor+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//profesores_asignaturas.buscarAsignaturaPorIdAsignaturaYIdProfesor

/*
*	BUSCAR las asignaturas que imparte un profesor por id_profesor
*/
profesores_asignaturas.buscarAsignaturasQueImparte = function(id_profesor,callback){
	if(connection){
		var sql = 'SELECT id_asignatura,nombre FROM asignaturas WHERE id_asignatura IN (SELECT id_asignatura FROM profesores_asignaturas WHERE id_profesor ="'+id_profesor+'")';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//profesores_asignaturas.buscarAsignaturasQueImparte

/*
*	BUSCAR las asignaturas que no imparte un profesor por id_profesor
*/
profesores_asignaturas.buscarAsignaturasQueNoImpartePorId = function (id_profesor,callback){
	console.log(id_profesor);
	if(connection){						
		var sqllasAsignaturasQueFaltan = 'SELECT id_asignatura,nombre FROM asignaturas WHERE id_asignatura NOT IN (SELECT id_asignatura FROM profesores_asignaturas WHERE id_profesor ="'+id_profesor+'")';
		connection.query(sqllasAsignaturasQueFaltan, function(error,row){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//profesores_asignaturas.buscarAsignaturasQueNoImpartePorId

/*
*	BUSCAR las asignaturas que no imparte un profesor por tipo
*/
profesores_asignaturas.buscarAsignaturasQueNoImpartePorTipo = function (id_profesor,tipo,callback){
	if(connection){						
		var sql = 'SELECT id_asignatura,nombre FROM asignaturas WHERE tipo="'+tipo+'" and id_asignatura NOT IN (SELECT id_asignatura FROM profesores_asignaturas WHERE id_profesor ="'+id_profesor+'")';
		connection.query(sql, function(error,row){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//profesores_asignaturas.buscarAsignaturasQueNoImpartePorTipo

/****************************************************************************************************************************/

module.exports = profesores_asignaturas;