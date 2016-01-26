var express = require('express');
var router = express.Router();
var alumno = require('../models/alumno');
var multer = require('multer');

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR alumno
*/
router.post('/agregarAlumno', multer({}).single('foto'), function(req,res){
    var dni = req.body.dni;
	var nombre = req.body.nombre;
	var apellidos = req.body.apellidos;
	var correo = req.body.correo;
	var foto = req.file.buffer;
	var num_tarjeta = req.body.num_tarjeta;
	alumno.agregarAlumno(dni,nombre,apellidos,correo,foto,num_tarjeta, function (error) {
		if (error) {
			throw error;
		}else{ 
			//console.log("alumno.agregarAlumno (configFuncionamiento) correctamente");
		}//else
	});//alumno.agregarAlumno
});//router.post('/agregarAlumno

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE alumno
*/
router.post('/modificarAlumno',multer({}).single('foto'),  function(req,res,next){
    alumno_grupos.borrarAlumnoGrupos(req.body.id_alumno, function(error,row) {
        if (error) {
            throw error;
        }else{
            res.send(row);
        }
    })//alumno_grupos.borrarAlumnoGrupos
  
    var data= req.body.grupo;
    for (var i = 0; i < data.length; i++) {
        alumno_grupos.agregarAlumnoGrupo(data[i],req.body.id_alumno, function(error,row) {
            if (error) {
                throw error;
            }else{
                res.send(row);
            }//else
        })//alumno_grupos.agregarAlumnoGrupo
    }//for

    if(req.body.asignatura == undefined){
        //console.log("el alumno no tiene ninguna convalidada");
    }else {
        convalidadas.borrarAsignaturaConvalidada(req.body.id_alumno, function(error,row) {
            if (error) {
                throw error;
            }else{
                res.send(row);
            }//else
        })//convalidadas.borrarAsignaturaConvalidada
        
        var data2= req.body.asignatura;
        for (var i = 0; i < data2.length; i++) {
            convalidadas.agregarAsignaturaConvalidada(data2[i],req.body.id_alumno, function(error,row) {
                if (error) {
                    throw error;
                }else{
                    res.send(row);
                }//else
            })//convalidadas.agregarAsignaturaConvalidada
        }//for
    }//else

    var id_alumno = req.body.id_alumno;
    var dni = req.body.dni;
    var nombre = req.body.nombre;
    var apellidos = req.body.apellidos;
    var correo = req.body.correo;
    var tarjeta_activada = req.body.tarjeta_activada;
    var num_tarjeta = req.body.num_tarjeta;

    if(req.file == undefined){
        alumno.modificarAlumnoSinFoto(id_alumno,dni,nombre,apellidos,correo,tarjeta_activada,num_tarjeta, function(error,row) {
            if (error) {
                throw error;
            }else{
                res.send(row);
            }//else
        })//alumno.modificarAlumnoSinFoto
    }else {
        var foto = req.file.buffer;
        alumno.modificarAlumno(id_alumno,dni,nombre,apellidos,correo,foto,tarjeta_activada,num_tarjeta, function(error,row) {
            if (error) {
                throw error;
            }else{
                res.send(row);
            }//else
        })//alumno.modificarAlumno
    }//else
});//router.post('/modificarAlumno

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE alumno por id_alumno
*/
router.post('/borrarAlumno', function(req,res,next){
    var id_alumno = req.body.id_alumno;
    alumno.borrarAlumno(id_alumno, function(error,row) {
        if (error) {
            throw error;
        }else{
            res.send(row);
        }//else
    })//alumno.borrarAlumno
});//router.post('/borrarAlumno

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
* BUSCAR alumno por nombre
*/
router.post('/buscarAlumnoPorNombre', function(req,res,next) {
    var nombre = req.body.nombre;
    alumno.buscarAlumnoPorNombre(nombre, function(error,row) {
        if (error) {
            throw error;
        }else{
            res.send(row);
        }//else
    })//alumno.buscarAlumnoPorNombre
});//router.post('/buscarAlumnoPorNombre

/*
* BUSCAR alumno por id_alumno
*/
router.post('/buscarAlumnoPorId', function(req,res,next) {
    var id_alumno = req.body.id_alumno;
    alumno.buscarAlumnoPorId(id_alumno, function(error,row) {
        if (error) {
            throw error;
        }else{
            res.send(row);
        }//else
    })//alumno.buscarAlumnoPorId
});//router.post('/buscarAlumnoPorId

/****************************************************************************************************************************/

module.exports = router;