var connection = require('../models/connection');
var app = require('../app');

var alumno_grupos = {};

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR alumno en un grupo
*/
alumno_grupos.agregarAlumnoGrupo =  function(id_grupo,id_alumno,callback) {
	if(connection){
		var alumno_grupos = { id_grupo: id_grupo, id_alumno: id_alumno};						
		var sqlagregarAlumnoGrupo = 'INSERT INTO alumno_grupos SET ?';
		connection.query(sqlagregarAlumnoGrupo,alumno_grupos, function(error){
		  	if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//alumno_grupos.agregarAlumnoGrupo

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE alumno_grupo
*/
alumno_grupos.modificarAlumnoGrupo = function (id_alumno_grupos,id_alumno,id_grupo,callback) {
	if(connection){							
		var campos = { id_alumno_grupos: id_alumno_grupos, id_alumno: id_alumno, id_grupo:id_grupo };
		var sql = 'UPDATE alumno_grupos SET ? WHERE id_alumno_grupos ="'+id_alumno_grupos+'"';
		connection.query(sql,campos, function(error){
		  	if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//alumno_grupos.modificarAlumnoGrupo

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE alumno de un grupo
*/
alumno_grupos.borrarAlumnoGrupos =  function(id_alumno,callback) {
	if(connection){					
		var sqlborrarAlumnoGrupos = 'DELETE FROM alumno_grupos WHERE id_alumno= "'+id_alumno+'"';
		connection.query(sqlborrarAlumnoGrupos, function(error){
		  if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//alumno_grupos.borrarAlumnoGrupos

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
*	BUSCAR todas los alumno_grupos
*/
alumno_grupos.buscarTodosLosAlumnoGrupos = function (callback) {
	if(connection){							
		connection.query('SELECT id_alumno_grupos, id_alumno,id_grupo FROM alumno_grupos', function(error,row){
		  	if (error) {
				console.log(error);
				throw error;
			}else{
			    callback(null,row);
			}//else
		});//connection.query
	}//if
}//alumno_grupos.buscarTodosLosAlumnoGrupos

/*
*	BUSCAR un id_alumno_grupos por id_alumno_grupos
*/
alumno_grupos.buscarAlumnoGrupoPorIdAlumnoGrupo = function(id_alumno_grupos,callback){
	if(connection){
		var sql = 'SELECT id_alumno_grupos, id_alumno,id_grupo FROM alumno_grupos WHERE id_alumno_grupos ="'+id_alumno_grupos+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//alumno_grupos.buscarAlumnoGrupoPorIdAlumnoYIdGrupo

/*
*	BUSCAR un id_alumno_grupos por id_alumno
*/
alumno_grupos.buscarAlumnoGrupoPorIdAlumno = function(id_alumno,callback){
	if(connection){
		var sql = 'SELECT id_alumno_grupos, id_alumno,id_grupo FROM alumno_grupos WHERE id_alumno ="'+id_alumno+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//alumno_grupos.buscarAlumnoGrupoPorIdAlumno

/*
*	BUSCAR un id_alumno_grupos por id_grupo
*/
alumno_grupos.buscarAlumnoGrupoPorIdGrupo = function(id_grupo,callback){
	if(connection){
		var sql = 'SELECT id_alumno_grupos, id_alumno,id_grupo FROM alumno_grupos WHERE id_grupo ="'+id_grupo+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//alumno_grupos.buscarAlumnoGrupoPorIdGrupo

/*
*	BUSCAR un id_grupo por id_alumno e id_grupo
*/
alumno_grupos.buscarAlumnoGrupoPorIdAlumnoYIdGrupo = function(id_alumno,id_grupo,callback){
	if(connection){
		var sql = 'SELECT id_alumno_grupos FROM alumno_grupos WHERE id_alumno ="'+id_alumno+'" AND id_grupo ="'+id_grupo+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//alumno_grupos.buscarAlumnoGrupoPorIdAlumnoYIdGrupo

/****************************************************************************************************************************/

module.exports = alumno_grupos;