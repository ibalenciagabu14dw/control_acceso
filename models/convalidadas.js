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
*	BUSCAR asignaturas que tiene el alumno para convalidar
*/
asignatura.buscarNoConvalidadasPorIdAlumno = function(id_alumno,callback){
	if(connection){
		var sql = 'SELECT id_asignatura,nombre FROM asignaturas WHERE id_asignatura NOT IN (SELECT id_asignatura from convalidadas where id_alumno = ' + connection.escape(id_alumno)+') AND id_asignatura IN (SELECT id_asignatura FROM horario_grupos WHERE id_grupo IN (SELECT id_grupo FROM grupos WHERE id_grupo  IN (SELECT id_grupo FROM alumno_grupos WHERE id_alumno ="'+id_alumno+'")))';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//asignatura.buscarNoConvalidadasPorIdAlumno

/*
*	BUSCAR asignaturas convalidadas por id_alumno
*/
asignatura.buscarConvalidadasPorIdAlumno = function(id_alumno,callback){
	if(connection){
		var sql = 'SELECT id_asignatura,nombre FROM asignaturas WHERE id_asignatura in (SELECT id_asignatura from convalidadas where id_alumno = ' + connection.escape(id_alumno)+') AND id_asignatura IN (SELECT id_asignatura FROM horario_grupos WHERE id_grupo IN (SELECT id_grupo FROM grupos WHERE id_grupo  IN (SELECT id_grupo FROM alumno_grupos WHERE id_alumno ="'+id_alumno+'")))';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//asignatura.buscarConvalidadasPorIdAlumno

/***********************************************************************************************/

module.exports = convalidadas;


