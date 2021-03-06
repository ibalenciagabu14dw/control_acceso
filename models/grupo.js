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
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//grupo.borrarGrupo

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
*	BUSCAR todos los grupos
*/
grupo.buscarTodosLosGrupos = function(callback){
	if(connection){
		var sql = 'SELECT id_grupo,nombre_grupo,tipo FROM grupos';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//grupo.buscarTodosLosGrupos

/*
*	BUSCAR grupo por id_grupo
*/
grupo.buscarGrupoPorId = function(id_grupo,callback){
	if(connection){
		var sql = 'SELECT id_grupo,nombre_grupo,tipo FROM grupos WHERE id_grupo ="'+id_grupo+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//grupo.buscarGrupoPorId

/*
*	BUSCAR grupo por nombre_grupo
*/
grupo.buscarGrupoPorNombre = function(nombre_grupo,callback){
	if(connection){
		var sql = 'SELECT id_grupo,nombre_grupo,tipo FROM grupos WHERE nombre_grupo LIKE ' + connection.escape(nombre_grupo+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//grupo.buscarGrupoPorNombre

/*
*	BUSCAR grupo por id_grupo y nombre_grupo
*/
grupo.buscarGrupoPorIdYNombre = function(id_grupo,nombre_grupo,callback){
	if(connection){
		var sql = 'SELECT id_grupo,nombre_grupo,tipo FROM grupos WHERE id_grupo ="'+id_grupo+'" AND nombre_grupo ="'+nombre_grupo+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//grupo.buscarGrupoPorIdYNombre

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
			}//else
		});//connection.query
	}//if
}//grupo.buscarTodosLosIdGrupo

/*
*	BUSCAR todos los  id_grupo y nombre de un grupo
*/
grupo.buscarTodosLosIdYNombreGrupo = function (callback) {
	if(connection){							
		connection.query('SELECT id_grupo,nombre_grupo FROM grupos', function(error,row){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
			    callback(null,row);
			}//else
		});//connection.query
	}//if
}//grupo.buscarTodosLosIdYNombreGrupo

/*
*	BUSCAR grupos a los que no pertenece un alumno
*/
grupo.buscarGruposQueNoPerteneceUnAlumno = function (id_alumno,callback){
	if(connection){						
		var sqlbuscarGruposQueNoPerteneceUnAlumno = 'SELECT id_grupo,nombre_grupo,tipo FROM grupos WHERE id_grupo NOT IN (SELECT id_grupo FROM alumno_grupos WHERE id_alumno = "'+id_alumno+'")';
		connection.query(sqlbuscarGruposQueNoPerteneceUnAlumno,grupo, function(error,row){
		  if (error) {
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//grupo.buscarGruposQueNoPerteneceUnAlumno

/*
*	BUSCAR grupos a los que pertenece un alumno
*/
grupo.buscarGruposQuePerteneceUnAlumno = function(id_alumno,callback){
	if(connection){
		var sql = 'SELECT id_grupo,nombre_grupo,tipo FROM grupos WHERE id_grupo IN (SELECT id_grupo FROM alumno_grupos WHERE id_alumno ="'+id_alumno+'")';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//grupo.buscarGruposQuePerteneceUnAlumno

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
				}//else
			});//connection.query
		}//if
	}//grupo.buscarAsignaturasDeUnGrupo

/*
*	BUSCAR asignaturas de un grupo
*/
grupo.buscarAsignaturasDeLosGrupos = function (id_GrupoArray,callback) {
	var array = id_GrupoArray;
	var string = JSON.stringify(array);
	var string2 = string.slice(14);
	string2 = string2.replace('}','');
	string2 = string2.replace('[','(');
	string2 = string2.replace(']',')');
	var i=0;
	do {
	   i += 1;
	   string2 = string2.replace('"','');
	} while (i < string2.length);
	if (string2.length == 1){
		if(connection){
			var sql = 'SELECT id_asignatura,nombre FROM asignaturas WHERE id_asignatura IN (SELECT id_asignatura FROM horario_grupos WHERE id_grupo IN (SELECT id_grupo FROM grupos WHERE id_grupo ="'+string2+'"))';
			connection.query(sql,function (error,row) {
				if (error) {
					throw error;
					console.log(error);
				}else{
					callback(null,row);
				}//else
			});//connection.query
		}//if
	} else if ((string2.length > 1)) {
		if(connection){
				var sql = 'SELECT id_asignatura,nombre FROM asignaturas WHERE id_asignatura IN (SELECT id_asignatura FROM horario_grupos WHERE id_grupo IN (SELECT id_grupo FROM grupos WHERE id_grupo IN '+string2+'))';
				connection.query(sql,function (error,row) {
					if (error) {
						throw error;
						console.log(error);
					}else{
						callback(null,row);
					}//else
				});//connection.query
		}//if
	}//.else	
	}//grupo.buscarAsignaturasDeUnGrupo

/****************************************************************************************************************************/

module.exports = grupo;

