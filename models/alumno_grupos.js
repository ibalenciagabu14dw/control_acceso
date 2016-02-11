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
				throw error;
				console.log(error);
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
		var campos = { fecha: fecha, id_alumno: id_alumno, id_horario_grupo: id_horario_grupo, observaciones: observaciones };
		var sql = 'UPDATE alumno_grupos SET ? WHERE id_alumno_grupos ="'+id_alumno_grupos+'"';
		connection.query(sql,campos, function(error){
		  	if (error) {
				throw error;
				console.log(error);
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
				throw error;
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//alumno_grupos.borrarAlumnoGrupos

/****************************************************************************************************************************/
module.exports = alumno_grupos;