var express = require('express');
var router = express.Router();
var alumno = require('../models/alumno');
var multer = require('multer');
var convalidadas = require('../models/convalidadas');
var alumno_grupos = require('../models/alumno_grupos');

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR alumno
*/
router.post('/agregarAlumno', multer({}).single('foto'), function(req,res){
    console.log(req.body);
    console.log(req.file);
    var dni = req.body.dni;
    var nombre = req.body.nombre;
    var apellidos = req.body.apellidos;
    var correo = req.body.correo;
    var num_tarjeta = req.body.num_tarjeta;

        //buscarAlumnoPorDni
        //buscarAlumnoPorTarjeta
        //buscarAlumnoPorCorreo

    if (req.file == undefined){
        //agregarAlumnoSinFoto
        alumno.buscarAlumnoPorDni(dni, function (error,row) {
            if (error) {
                res.send({err:'bd'});
                throw error;
            }else{
                if(row.length>0){
                    res.send({err:'existeDNI'});
                }else{
                    alumno.buscarAlumnoPorCorreo(correo, function (error,row) {
                        if (error) {
                            res.send({err:'bd'});
                            throw error;
                        }else{
                            if(row.length>0){
                                res.send({err:'existeCorreo'});
                            }else{
                                alumno.buscarAlumnoPorTarjeta(num_tarjeta, function (error,row) {
                                    if (error) {
                                        res.send({err:'bd'});
                                        throw error;
                                    }else{
                                        if(row.length>0){
                                            res.send({err:'existeTarjeta'});
                                        }else{
                                            alumno.agregarAlumnoSinFoto(dni,nombre,apellidos,correo,num_tarjeta, function (error,row) {
                                                if (error) {
                                                    res.send({err:'bd'});
                                                    throw error;
                                                }else{
                                                    res.send(row);
                                                }//else  alumno.agregarAlumnoSinFoto
                                            });//.alumno.agregarAlumnoSinFoto
                                        }//.else if(row.length>0) alumno.buscarAlumnoPorTarjeta
                                    }//.else if (error)
                                });//.alumno.buscarAlumnoPorTarjeta
                            }//.else if(row.length>0)alumno.buscarAlumnoPorCorreo
                        }//.else if (error)
                    });//.alumno.buscarAlumnoPorCorreo
                }//.else if(row.length>0) alumno.buscarAlumnoPorDni
            }//.else if (error)
        });//.alumno.buscarAlumnoPorDni
    } else {
        //tratar cuando mandemos la foto
    }
});//router.post('/agregarAsignatura


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