var express = require('express');
var router = express.Router();
var time = require('../models/time');
var alumno = require('../models/alumno');
var asignatura = require('../models/asignatura');

//http://localhost:3000/API/modificarAlumno?id=28&dni=00000&nombre=peep&apellidos=peep&correo=peep@peep.com&num_tarjeta=a69


/***********************************************************INSERT*********************************************************/

/*
* INSERTAR alumno sin foto
*/
router.post('/agregarAlumno', function(req, res, next) {
	alumno.buscarAlumnoPorDni(req.query.dni, function (error,row) {
        if (error) {
            res.send('error conectando con la base de datos');
            throw error;
        }else{
            if(row.length>0){
                res.send('ya existe ese DNI');
            }else{
                alumno.buscarAlumnoPorCorreo(req.query.correo, function (error,row) {
                    if (error) {
                        res.send('error conectando con la base de datos');
                        throw error;
                    }else{
                        if(row.length>0){
                            res.send('ya existe ese correo');
                        }else{
                            alumno.buscarAlumnoPorTarjeta(req.query.num_tarjeta, function (error,row) {
                                if (error) {
                                    res.send('error conectando con la base de datos');
                                    throw error;
                                }else{
                                    if(row.length>0){
                                        res.send('ya existe esa tarjeta');
                                    }else{
                                        alumno.agregarAlumnoSinFoto(req.query.dni,req.query.nombre,req.query.apellidos,req.query.correo,req.query.num_tarjeta, function (error,row) {
                                            if (error) {
                                                res.send('error conectando con la base de datos');
                                                throw error;
                                            }else{
                                                res.send('alumno agregado correctamente');
                                            }//else
                                        });//alumno.agregarAlumnoSinFoto
                                    }//else
                                }//else
                            });//alumno.buscarAlumnoPorTarjeta
                        }//else
                    }//else
                });//alumno.buscarAlumnoPorCorreo
            }//else
        }//else
    });//alumno.buscarAlumnoPorDni
});//router.post('/agregarAlumno

/*
* INSERT asignatura ****NO FUNCIONA****
*/
router.post('/agregarAsignatura', function(req,res,next){
    asignatura.buscarAsignaturaPorClave(req.query.clave, function (error,row) {
        if (error) {
            res.send({err:'bd'});
            throw error;
        }else{
            if(row.length>0){
                res.send({err:'existe'});
            }else{
                asignatura.agregarAsignatura(req.query.nombre,req.query.clave,req.query.obligatoria,req.query.tipo, function (error,row) {
                    if (error) {
                        res.send({err:'bd'});
                        throw error;
                    }else{
                        res.send(row);
                    }//else
                });//asignatura.agregarAsignatura
            }//else
        }//else
    });//asignatura.buscarAsignaturaPorClave
});//router.post('/agregarAsignatura

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE alumno 
*/
router.post('/modificarAlumno', function(req, res, next) {

});//router.post('/modificarAlumno

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE alumno por id_alumno ****NO FUNCIONA****
*/
router.post('/borrarAlumno', function(req,res,next){
    alumno.borrarAlumno(req.query.id_alumno, function(error,row) {
        if (error) {
            throw error;
        }else{
            res.send("borrado del alumno OK");
        }//else
    })//alumno.borrarAlumno
});//router.post('/borrarAlumno


/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
* BUSCAR alumno por nombre ****NO FUNCIONA****ERROR DE FOTO
*/
router.post('/buscarAlumnoPorNombre', function(req,res,next) {
    alumno.buscarAlumnoPorNombre(req.query.nombre, function(error,row) {
        if (error) {
            throw error;
        }else{
            res.send(row);
        }//else
    })//alumno.buscarAlumnoPorNombre
});//router.post('/buscarAlumnoPorNombre

/*
* BUSCAR alumno por id_alumno ****NO FUNCIONA****ERROR DE FOTO
*/
router.post('/buscarAlumnoPorId', function(req,res,next) {
    alumno.buscarAlumnoPorId(req.query.id_alumno, function(error,row) {
        if (error) {
            throw error;
        }else{
            res.json(row);
        }//else
    })//alumno.buscarAlumnoPorId
});//router.post('/buscarAlumnoPorId


/****************************************************************************************************************************/


/*
******************************MOSTAR********************************


router.get('/mostrar/buscarTodoslosAlumnos', function(req, res, next) {
	alumno.buscarTodoslosAlumnos(function (error,data) {
		if (error) {
			res.send("ko");
			console.log("Fallo update presencia alumno");
			throw error;
		}else{
			//emitir al cliente para cambiar color presencia alumno
			res.json(data);
		}//else error
	});//modificarPresenciaDelAlumno
});//


******************************AGREGAR********************************
*/

module.exports = router;