var connection = require('../models/connection');

var grupo = {};

grupo.buscarGrupoPorAlumno = function (id_alumno,callback) {
	if (connection){
		var sql = 'SELECT id_grupo FROM alumno_grupos WHERE id_alumno = ' + connection.escape(id_alumno);
		connection.query(sql, function(error, row){
			if(error){
				throw error;
			}else{
				console.log(row);
				callback(null,row);
			}
		});
	}
}//buscarGrupoPorAlumno

module.exports = grupo;