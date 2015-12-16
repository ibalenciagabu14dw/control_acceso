var connection = require('../models/connection');

var aula = {};
var diasSemana = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];

aula.buscarAulaPorGrupo = function (grupo,time,callback) {
	var now = new Date();
	var day = now.getDay();
	if (connection){
		var sql = 'SELECT id_aula FROM horario_grupo WHERE dia_semana = "'+ connection.escape(diasSemana[day])+'" and ('+connection.escape(time)+' between hora_inicio and hora_final) and id_grupo ='+connection.escape(grupo);
		connection.query(sql, function(error, row){
			if(error){
				throw error;
			}
			else{
				console.log(row);
				callback(null,row);
			}
		});
	}
}

module.exports = aula;