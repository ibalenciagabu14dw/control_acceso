var mongo = {};
var mongoose = require('mongoose');
var falta = require('../models/falta');
var user = 'controlaccesozubiri';//process.env.USER;
var password = 'zubiridw32'//process.env.PASSWORD;

// database connection
//mongoose.connect('mongodb://'+user+':'+password+'@ds059215.mongolab.com:59215/faltas');
mongoose.connect('mongodb://pepe:'+password+'@ds059215.mongolab.com:59215/faltas');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log('Database connection OK!');
});

// schema
var alumnoSchema = mongoose.Schema({
	fecha: String,
    nombre: String,
    apellidos: String,
    asignatura: String,
    hora_inicio: String,
    hora_final: String,
    aula: String,
},{ collection : 'faltas' });

//model
var Alumno = mongoose.model('Alumno', alumnoSchema);

/*
*	Agregar faltas del dia en la BD de mongolabs y borrar tabla faltas
*/
mongo.agregarFaltaHistorico = function (alumno,callback) {
	console.log(alumno.nombre);
	var alumno = new Alumno({ fecha:alumno.fecha, nombre:alumno.nombre, apellidos:alumno.apellidos, asignatura:alumno.clave, hora_inicio:alumno.hora_inicio, hora_final:alumno.hora_final, aula:alumno.numero});
		alumno.save(function (error, alumnoAdded, numberAffected) {
    	if (error) {
    		console.error(error);
    		throw error;
    	}else{
    		console.log(alummnoAdded);
    		callback(null);
    	}//else if error
  	});//alumno.save
}//agregarFaltasHistorico

module.exports = mongo;