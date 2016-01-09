var express = require('express');
var router = express.Router();
var profesor = require('../models/profesor');
var alumno = require('../models/alumno');
var multer = require('multer');

/* POST agregar alumno page. */
router.post('/agregar', multer({}).single('foto'), function(req,res){
	//console.log(req.body); form fields 
	//console.log(req.file); form files
	var dni = req.body.dni;
	var nombre = req.body.nombre;
	var apellidos = req.body.apellidos;
	var correo = req.body.correo;
	var foto = req.file.buffer;
	var num_tarjeta = req.body.num_tarjeta;
	alumno.insertarAlumno(dni,nombre,apellidos,correo,foto,num_tarjeta, function (error) {
		if (error) {
			throw error;
		} else{ 
			console.log("alumno.insertarAlumno (configFuncionamiento) correctamente");
		}//.else
	});//.alumno.insertarAlumno
});//.router.post('/agregar', multer({}).single('foto')

/* POST agregar profesor page. */
router.post('/agregarProfesor', multer({}).single('foto'), function(req,res){
	var dni = req.body.dni;
	var nombre = req.body.nombre;
	var apellidos = req.body.apellidos;
	var correo = req.body.correo;
	var password = req.body.password;
	var foto = req.file.buffer;
	var num_tarjeta = req.body.num_tarjeta;
	profesor.insertarProfesor(dni,nombre,apellidos,correo,password,foto,num_tarjeta, function (error) {
		if (error) {
			throw error;
		} else{ 
			console.log("profesor.insertarProfesor (configFuncionamiento) correctamente");
		}//.else
	});//.profesor.insertarProfesor
});//.router.post('/agregarProfesor', multer({}).single('foto')

module.exports = router;


