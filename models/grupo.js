var connection = require('../models/connection');
var app = require('../app');

var grupo = {};

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR grupo
*/
grupo.agregarGrupo = function (nombre_grupo,tipo,callback) {
	if(connection){							
		var grupo = { nombre_grupo: nombre_grupo, tipo: tipo };
		var sqlagregarGrupo = 'INSERT INTO grupos SET ?';
		connection.query(sqlagregarGrupo, grupo, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,{dato:"ok"});
				console.log('agregarGrupo OK');
			}//else
		});//connection.query
	}//if
}//grupo.agregarGrupo

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE grupo
*/
grupo.modificarGrupo = function (id_grupo,nombre_grupo,tipo,callback) {
	if(connection){							
		var grupo = { nombre_grupo: nombre_grupo, tipo: tipo };
		var sqlmodificarGrupo = 'UPDATE grupos SET ? WHERE id_grupo ="'+id_grupo+'"';
		connection.query(sqlmodificarGrupo,grupo, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,{dato:"ok"});
				console.log('modificarGrupo OK');
			}//else
		});//connection.query
	}//if
}//grupo.modificarGrupo

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE grupo
*/
grupo.borrarGrupo = function (id_grupo,callback) {
	if(connection){							
		connection.query('DELETE FROM grupos WHERE id_grupo= "'+id_grupo+'"', function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('agregarGrupo OK');
			}//else
		});//connection.query
	}//if
}//grupo.borrarGrupo

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
*	BUSCAR todos los id_grupo
*/
grupo.buscarTodosLosIdGrupo = function (callback) {
	if(connection){							
		connection.query('SELECT id_grupo FROM grupos', function(error,row){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				var id_GrupoArray = [];
				for (var i= 0;i<row.length;i++){
					id_GrupoArray.push(row[i].id_grupo);
				}//for
				function compareNumbers(a, b) {
					return a - b;
				}//compareNumbers
				id_GrupoArray.sort(compareNumbers);
				callback(null,id_GrupoArray);
				console.log('agregarGrupo OK');
			}//else
		});//connection.query
	}//if
}//grupo.buscarTodosLosIdGrupo

/****************************************************************************************************************************/


/*
*	BUSCAR asignaturas de un grupo
*/
grupo.buscarAsignaturasDeUnGrupo = function (id_grupo,callback) {
	if(connection){
			var sql = 'SELECT id_asignatura,nombre FROM asignaturas WHERE id_asignatura IN (SELECT id_asignatura FROM horario_grupos WHERE id_grupo IN (SELECT id_grupo FROM grupos WHERE id_grupo ="'+id_grupo+'"))';
			connection.query(sql,function (error,row) {
				if (error) {
					throw error;
					console.log(error);
				}else{
					callback(null,row);
					console.log('buscarAsignaturasDeUnGrupo OK');
				}//else
			});//connection.query
		}//if
	}//grupo.buscarAsignaturasDeUnGrupo

grupo.mostrarTodosLosIdNombreGrupo = function (callback) {
	if(connection){							
		connection.query('SELECT id_grupo,nombre_grupo FROM grupos', function(error,row){
		  if (error) {
				throw error;
				console.log(error);
			}else{
			    callback(null,row);
				console.log('agregarGrupo OK');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.grupo.mostrarTodosLosIdNombreGrupo

grupo.losGruposQueFaltan = function (id_alumno,callback){
	if(connection){						
		var sqllosGruposQueFaltan = 'SELECT id_grupo,nombre_grupo,tipo FROM grupos WHERE id_grupo NOT IN (SELECT id_grupo FROM alumno_grupos WHERE id_alumno = "'+id_alumno+'")';
		connection.query(sqllosGruposQueFaltan,grupo, function(error,row){
		  if (error) {
				throw error;
			}else{
				callback(null,row);
				console.log('agregarGrupo OK');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.grupo.losGruposQueFaltan

/*
*	devuelve nombre , id de la asignatura
*/
grupo.buscarGrupoDelAlumno = function(id_alumno,callback){
	if(connection){
		var sql = 'SELECT id_grupo,nombre_grupo,tipo FROM grupos WHERE id_grupo IN (SELECT id_grupo FROM alumno_grupos WHERE id_alumno ="'+id_alumno+'")';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
				console.log('agregarGrupo OK');
			}//.else
		});//.connection.query
	}//.if(connection)
}//.grupo.buscarGrupoDelAlumno

grupo.buscarGrupoPorNombre = function(nombre_grupo,callback){
	if(connection){
		var sql = 'SELECT id_grupo,nombre_grupo,tipo FROM grupos WHERE nombre_grupo LIKE ' + connection.escape(nombre_grupo+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
				console.log('agregarGrupo OK');
			}//.else
		});//.connection.query
	}//.if(connection)
}//.grupo.buscarGrupoPorNombre


grupo.buscarGrupoPorIdNombre = function(id_grupo,nombre_grupo,callback){
	if(connection){
		var sql = 'SELECT id_grupo,nombre_grupo,tipo FROM grupos WHERE id_grupo ="'+id_grupo+'" AND nombre_grupo ="'+nombre_grupo+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
				console.log('agregarGrupo OK');
			}//.else
		});//.connection.query
	}//.if(connection)
}//.grupo.buscarGrupoPorIdNombre

grupo.buscarGrupoPorId = function(id_grupo,callback){
	if(connection){
		var sql = 'SELECT id_grupo,nombre_grupo,tipo FROM grupos WHERE id_grupo ="'+id_grupo+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
				console.log('agregarGrupo OK');
			}//.else
		});//.connection.query
	}//.if(connection)
}//.grupo.buscarGrupoPorId

//METODO PARA AGREGAR HORARIO GRUPO
grupo.mostrarTodosLosIdNombreGrupo = function (callback) {
	if(connection){							
		connection.query('SELECT id_grupo,nombre_grupo FROM grupos', function(error,row){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('agregarGrupo OK');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.grupo.mostrarTodosLosIdNombreGrupo 

module.exports = grupo;

