var connection = require('../models/connection');

var aula = {};
var diasSemana = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];

aula.buscarAulaPorGrupo = function (grupo,time,callback) {
	var now = new Date();
	var day = now.getDay();
	callback(null,diasSemana[day]);
}

module.exports = aula;