var connection = require('../models/connection');
var app = require('../app');

var alumno_grupos = {};

alumno_grupos.agregarAlumnoGrupo =  function(id_grupo,id_alumno,callback) {
	if(connection){
		var alumno_grupos = { id_grupo: id_grupo, id_alumno: id_alumno};						
		var sqlagregarAlumnoGrupo = 'INSERT INTO alumno_grupos SET ?';
		connection.query(sqlagregarAlumnoGrupo,alumno_grupos, function(error){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('agregarAlumnoGrupo OK');
			}//else
		});//connection.query
	}//if
}//alumno_grupos.agregarAlumnoGrupo

alumno_grupos.borrarAlumnoGrupos =  function(id_alumno,callback) {
	if(connection){					
		var sqlborrarAlumnoGrupos = 'DELETE FROM alumno_grupos WHERE id_alumno= "'+id_alumno+'"';
		connection.query(sqlborrarAlumnoGrupos, function(error){
		  if (error) {
				throw error;
			}else{
				//console.log('borrarAlumnoGrupos correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//alumno_grupos.borrarAlumnoGrupos

module.exports = alumno_grupos;