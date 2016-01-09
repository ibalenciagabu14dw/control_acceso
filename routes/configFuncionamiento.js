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

/* POST modificar alumno page. */
router.post('/modificar', multer({}).single('foto'), function(req,res){
	//console.log(req.body); form fields 
	//console.log(req.file); form files
	var id = req.body.id;
	var dni = req.body.dni;
	var nombre = req.body.nombre;
	var apellidos = req.body.apellidos;
	var correo = req.body.correo;
	var foto = req.file.buffer;
	var num_tarjeta = req.body.num_tarjeta;
	//var grupo = req.body.grupo;
	alumno.modificarAlumno(id,dni,nombre,apellidos,correo,foto,num_tarjeta, function (error) {
		if (error) {
			throw error;
		} else{ 
			console.log("alumno.modificarAlumno (configFuncionamiento) correctamente");
		}//.else
	});//.alumno.modificarAlumno
});//.router.post('/modificar', multer({}).single('foto')

/* POST modificar profesor page. */
router.post('/modificarProfesor', multer({}).single('foto'), function(req,res){
	//console.log(req.body); form fields 
	//console.log(req.file); form files
	var id = req.body.id;
	var dni = req.body.dni;
	var nombre = req.body.nombre;
	var apellidos = req.body.apellidos;
	var correo = req.body.correo;
	var password = req.body.password;
	var foto = req.file.buffer;
	var num_tarjeta = req.body.num_tarjeta;
	//var grupo = req.body.grupo;
	profesor.modificarProfesor(id,dni,nombre,apellidos,correo,password,foto,num_tarjeta, function (error) {
		if (error) {
			throw error;
		} else{ 
			console.log("profesor.modificarProfesor (configFuncionamiento) correctamente");
		}//.else
	});//.profesor.modificarProfesor
});//.router.post('/modificarProfesor', multer({}).single('foto')

/* POST borrar alumno page.*/
router.post('/borrar', function(req,res){
	//console.log(req.body); form fields 
	//console.log(req.file); form files
	var id = req.body.id;
	/*var dni = req.body.dni;
	var nombre = req.body.nombre;
	var apellidos = req.body.apellidos;
	var correo = req.body.correo;
	var password = req.body.password;
	var foto = req.file.buffer;
	var num_tarjeta = req.body.num_tarjeta;
	//var grupo = req.body.grupo;*/
	alumno.borrarAlumno(id, function (error) {
		if (error) {
			throw error;
		} else{ 
			console.log("alumno.borrarAlumno (configFuncionamiento) correctamente");
		}//.else
	});//.alumno.borrarAlumno
});//.router.post('/borrar', function(req,res)

/* POST borrar profesor page.*/
router.post('/borrarProfesor', function(req,res){
	//console.log(req.body); form fields 
	//console.log(req.file); form files
	var id = req.body.id;
	/*var dni = req.body.dni;
	var nombre = req.body.nombre;
	var apellidos = req.body.apellidos;
	var correo = req.body.correo;
	var password = req.body.password;
	var foto = req.file.buffer;
	var num_tarjeta = req.body.num_tarjeta;
	//var grupo = req.body.grupo;*/
	profesor.borrarProfesor(id, function (error) {
		if (error) {
			throw error;
		} else{ 
			console.log("profesor.borrarProfesor (configFuncionamiento) correctamente");
		}//.else
	});//.profesor.borrarAlumno
});//.router.post('/borrar', function(req,res)

module.exports = router;


