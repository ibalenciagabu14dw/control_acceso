var express = require('express');
var router = express.Router();
var profesor = require('../models/profesor');
var alumno = require('../models/alumno');
var multer = require('multer');
var asignatura = require('../models/asignatura');

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

/*
* devuelve el nombre del profesor(modificarProfesor) FUNCIONA
*/
router.post('/buscarProfesorNombre', function(req,res,next) {
  var nombre = req.body.nombre;
  profesor.buscarProfesorPorNombre(nombre, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarProfesorPorNombre
});//get /configPersonas/modificarProfesor/buscarProfesorNombre

/*
* devuelve el id del profesor(modificarProfesor) FUNCIONA
*/
router.post('/buscarProfesorId', function(req,res,next) {
  var id_profesor = req.body.id_profesor;
 // console.log("id: "+ id_profesor);
  profesor.buscarProfesorPorId2(id_profesor, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarProfesorPorNombre
});//get /configPersonas/modificarProfesor/buscarProfesorNombre

/*
* UPDATE PROFESOR COMPROBAR
*/
router.post('/updateProfesor',multer({}).single('foto'),  function(req,res,next){
  console.log(req.file);
  console.log(req.body);
  console.log("file: "+req.file.buffer);
  var id_profesor = req.body.id_profesor;
  var dni = req.body.dni;
  var nombre = req.body.nombre;
  var apellidos = req.body.apellidos;
  var correo = req.body.correo;
  var password = req.body.password;
  var foto = req.file.buffer;
  var tarjeta_activada = req.body.tarjeta_activada;
  var num_tarjeta = req.body.num_tarjeta;
  var admin = req.body.admin;
 console.log("id: "+ id_profesor);
 console.log("dni: "+ dni);
 console.log("nombre: "+ nombre);
 console.log("apellidos: "+ apellidos);
 console.log("correocorreo: "+ correo);
 console.log("password: "+ password);
 console.log("foto: "+ foto);
 console.log("tarjeta_activada: "+ tarjeta_activada);
 console.log("num_tarjeta: "+ num_tarjeta);
 console.log("admin: "+ admin);
  profesor.modificarProfesor(id_profesor,dni,nombre,apellidos,correo,password,foto,tarjeta_activada,num_tarjeta,admin, function(error,row) {
    if (error) {
      throw error;
    }else{
      console.log(row);
      res.send(row);
    }
  })//buscarProfesorPorNombre
});//get /configPersonas/modificarProfesor/buscarProfesorNombre


router.post('/borrarProfesor', function(req,res,next){
  var id_profesor = req.body.id_profesor;
 console.log("id: "+ id_profesor);

  profesor.borrarProfesor(id_profesor, function(error,row) {
    if (error) {
      throw error;
    }else{
      console.log(row);
      res.send(row);
    }
  })//buscarProfesorPorNombre
});//get /configPersonas/modificarProfesor/buscarProfesorNombre

/*
* devuelve el nombre del profesor(modificarProfesor) FUNCIONA
*/
router.post('/buscarAsignaturas', function(req,res,next) {
  asignatura.mostrarTodosLosIdNombreAsigntura(function(error,row) {
    if (error) {
      throw error;
    }else{
      console.log(row);
      res.send(row);
    }
  })//mostrarTodosLosIdNombreAsigntura
});//router.post('/buscarAsignaturas', function(req,res,next) {

module.exports = router;


