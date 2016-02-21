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
				console.log(error);
				throw error;
			}else{
			}//else
		});//connection.query
	}//if
}//convalidadas.agregarAsignaturaConvalidada

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE convalidadas
*/
convalidadas.modificarConvalidadas = function (id_convalidada,id_alumno,id_asignatura,callback) {
	if(connection){
		var campos = { id_convalidada: id_convalidada, id_alumno: id_alumno, id_asignatura: id_asignatura };
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
		var sql = 'DELETE FROM convalidadas WHERE id_alumno= "'+id_alumno+'"';
		connection.query(sql, function(error){
			if (error) {
		  		console.log(error);
				throw error;	
			}else{
			}//else
		});//connection.query
	}//if (connection)
}//convalidadas.borrarAsignaturaConvalidada

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
*	BUSCAR todos los id_aula y numero
*/
convalidadas.buscarTodasLasConvalidadas = function (callback) {
	if(connection){							
		connection.query('SELECT id_convalidada,id_alumno,id_asignatura FROM convalidadas', function(error,row){
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
*	BUSCAR asignaturas que tiene el alumno para convalidar
*/
convalidadas.buscarNoConvalidadasPorIdAlumno = function(id_alumno,callback){
	if(connection){
		var sql = 'SELECT id_asignatura,nombre FROM asignaturas WHERE id_asignatura NOT IN (SELECT id_asignatura from convalidadas where id_alumno = ' + connection.escape(id_alumno)+') AND id_asignatura IN (SELECT id_asignatura FROM horario_grupos WHERE id_grupo IN (SELECT id_grupo FROM grupos WHERE id_grupo  IN (SELECT id_grupo FROM alumno_grupos WHERE id_alumno ="'+id_alumno+'")))';
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//convalidadas.buscarNoConvalidadasPorIdAlumno

/*
*	BUSCAR convalidadass convalidadas por id_alumno
*/
convalidadas.buscarConvalidadasPorIdAlumno = function(id_alumno,callback){
	if(connection){
		var sql = 'SELECT id_asignatura,nombre FROM asignaturas WHERE id_asignatura in (SELECT id_asignatura from convalidadas where id_alumno = ' + connection.escape(id_alumno)+') AND id_asignatura IN (SELECT id_asignatura FROM horario_grupos WHERE id_grupo IN (SELECT id_grupo FROM grupos WHERE id_grupo  IN (SELECT id_grupo FROM alumno_grupos WHERE id_alumno ="'+id_alumno+'")))';
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//convalidadas.buscarConvalidadasPorIdAlumno

/*
*	BUSCAR convalidadass convalidadas por id_convalidadas
*/
convalidadas.buscarConvalidadasPorIdConvalidada = function(id_convalidada,callback){
	if(connection){
		var sql = 'SELECT id_convalidada,id_alumno,id_asignatura FROM convalidadas WHERE id_convalidada = ' + connection.escape(id_convalidada);
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//convalidadas.buscarConvalidadasPorIdConvalidada

/*
*	BUSCAR convalidadass convalidadas por id_asignatura
*/
convalidadas.buscarConvalidadasPorIdAsignatura = function(id_asignatura,callback){
	if(connection){
		var sql = 'SELECT id_convalidada,id_alumno,id_asignatura FROM convalidadas WHERE id_asignatura = ' + connection.escape(id_asignatura);
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//convalidadas.buscarConvalidadasPorIdAsignatura

/*
*	BUSCAR asignaturas por id_alumno y id_asignatura
*/
convalidadas.buscarConvalidadaPorIdAlumnoYIdAsignatura = function(id_alumno,id_asignatura,callback){
	if (connection) {
		var sql = 'SELECT id_convalidada,id_alumno,id_asignatura FROM convalidadas WHERE id_alumno = ' + connection.escape(id_alumno)+' and id_asignatura ='+ connection.escape(id_asignatura);
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		})//connection.query
	};//if
}//convalidadas.buscarConvalidadaPorIdAlumnoYIdAsignatura

/***********************************************************************************************/

module.exports = convalidadas;


