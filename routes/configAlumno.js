var express = require('express');
var router = express.Router();
var multer = require('multer');
var alumno = require('../models/alumno');

/* POST agregar alumno page. */
router.post('/agregarAlumno', multer({}).single('foto'), function(req,res){
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

/*
* devuelve el nombre del alumno(modificarAlumno) FUNCIONA
*/
router.post('/buscarAlumnoNombre', function(req,res,next) {
  var nombre = req.body.nombre;
  alumno.buscarAlumnoPorNombre(nombre, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarProfesorPorNombre
});//get /configPersonas/modificarProfesor/buscarProfesorNombre

/*
* devuelve el id del alumno(modificarAlumno) FUNCIONA
*/
router.post('/buscarAlumnoId', function(req,res,next) {
  var id_alumno = req.body.id_alumno;
  alumno.buscarAlumnoPorId(id_alumno, function(error,row) {
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
router.post('/updateAlumno',multer({}).single('foto'),  function(req,res,next){
  var id_alumno = req.body.id_alumno;
  var dni = req.body.dni;
  var nombre = req.body.nombre;
  var apellidos = req.body.apellidos;
  var correo = req.body.correo;
  var foto = req.file.buffer;
  var tarjeta_activada = req.body.tarjeta_activada;
  var num_tarjeta = req.body.num_tarjeta;
 alumno.modificarAlumno(id_alumno,dni,nombre,apellidos,correo,foto,tarjeta_activada,num_tarjeta, function(error,row) {
    if (error) {
      throw error;
    }else{
      //console.log(row);
      res.send(row);
    }
  })//buscarProfesorPorNombre
});//get /configPersonas/modificarProfesor/buscarProfesorNombre

router.post('/borrarAlumno', function(req,res,next){
  var id_alumno = req.body.id_alumno;
  alumno.borrarAlumno(id_alumno, function(error,row) {
    if (error) {
      throw error;
    }else{
      //console.log(row);
      res.send(row);
    }
  })//buscarProfesorPorNombre
});//get /configPersonas/modificarProfesor/buscarProfesorNombre