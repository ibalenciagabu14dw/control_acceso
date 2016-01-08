var express = require('express');
var router = express.Router();
var profesor = require('../models/profesor');
var alumno = require('../models/alumno');

router.post('/agregar',function(req,res) {

	var dni = req.body.dni;
	var nombre = req.body.nombre;
	var apellidos = req.body.apellidos;
	var correo = req.body.correo;
	var foto = req.body.foto;
	var num_tarjeta = req.body.num_tarjeta;

	var b = new Buffer(foto);
	var fotobase64 = b.toString('base64');
	console.log("la foto en base64 es " + fotobase64);
 	
	var fotoblob = fotobase64.toString('binary');

	console.log("la foto en blob es " + fotoblob);

	alumno.insertarAlumno(dni,nombre,apellidos,correo,fotoblob,num_tarjeta, function (error) {

		if (error) {
			throw error;
		} else{ 
			console.log("alumno.insertarAlumno (configFuncionamiento) correctamente");
		}
	});
});

module.exports = router;


