var express = require('express');
var router = express.Router();
var time = require('../../models/time');
var aula = require('../../models/aula')
var alumno = require('../../models/alumno');
var alumno_grupos = require('../../models/alumno_grupos');
var asignatura = require('../../models/asignatura');
var convalidadas = require('../../models/convalidadas');
var horario_grupo = require('../../models/horario_grupo');
var horario_profesor = require('../../models/horario_profesor');
var dispositivo = require('../../models/dispositivo');
var grupo = require('../../models/grupo');
var profesor = require('../../models/profesor');

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR horario_profesor OK
*/
router.post('/agregarHorarioProfesor', function(req, res, next) {
    profesor.buscarProfesorPorId(req.query.id_profesor,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('no hay profesor con ese id');
            }else{
                horario_grupo.buscarHorarioGrupoPorId(req.query.id_horario_grupo,function(error,row){
                    if(error){
                        res.send(error);
                    }else{
                        if(row.length==0){
                            res.send('no hay horario grupo con ese id');
                        }else{
                            horario_profesor.agregarHorarioProfesor(req.query.dia_semana,req.query.hora_inicio,req.query.hora_final,req.query.id_profesor,req.query.id_horario_grupo,function(error,row){
                                if(error){
                                    res.send(error);
                                }else{
                                    res.send('horario profesor agregado correctamente');
                                }//else
                            })//horario_profesor.agregarHorarioProfesor
                        }//else
                    }//ele
                })//horario_grupo.buscarHorarioGrupoPorId
            }//else
        }//else
    })//profesor.buscarProfesorPorId
});//router.post('/agregarHorarioProfesor

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE dispositivo OK
*/
router.post('/modificarHorarioProfesor', function(req, res, next) {
    
});//router.post('/modificarHorarioProfesor

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE horario_profesor por id_horario_profesor OK
*/
router.post('/borrarHorarioProfesor', function(req, res, next) {
    horario_profesor.buscarHorarioProfesorPorId(req.query.id_horario_profesor, function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('Ese horario_profesor no existe');
            }else{
                horario_profesor.borrarHorarioProfesor(req.query.id_horario_profesor, function(error,row) {
                    if (error) {
                        throw error;
                        res.send('error borrando horario profesor');
                    }else{
                        res.send('horario profesor borrado correctamente');
                    }//else
                })//horario_profesor.borrarHorarioProfesor
            }//else
        }//else
    })//horario_profesor.buscarHorarioProfesorPorId
});//router.post('/borrarHorarioProfesor


/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
* BUSCAR horario profesor por id_horario_profesor OK
*/
router.post('/buscarHorarioProfesorPorId', function(req,res,next) {
    horario_profesor.buscarHorarioProfesorPorId(req.query.id_horario_profesor,function(error,row){
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('No hay horario profesor con ese id');
            }else{
                res.send(row);
            }//else
        }//else
    })//horario_profesor.buscarHorarioProfesorPorId    
});//router.post('/buscarHorarioProfesorPorId

/*
* BUSCAR horario_profesor por nombre del profesor OK
*/
router.post('/buscarHorarioProfesorPorNombre', function(req,res,next) {
    profesor.buscarProfesorPorNombreSinFoto(req.query.nombre,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('no hay profesor no ese nombre');
            }else{
                horario_profesor.buscarHorarioProfesorPorNombre(req.query.nombre, function(error,row) {
                    if (error) {
                        res.send(error);
                        throw error;
                    }else{
                        if(row.length==0){
                            res.send('No hay horario_profesor con ese nombre');
                        }else{
                            res.send(row);
                        }//else
                    }//else
                })//horario_profesor.buscarHorarioProfesorPorNombre
            }//else
        }//else
    })//profesor.buscarProfesorPorNombreSinFoto
});//router.post('/buscarHorarioProfesorPorNombre

/*
* BUSCAR todos los id_horariogrupo OK
*/
router.post('/buscarTodosLosHorarioProfesor', function(req,res,next) {
    horario_profesor.buscarTodosLosHorarioProfesor(function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('no hay horarios de profesores');
            }
            res.send(row);
        }//else
    })//horario_profesor.buscarTodosLosHorarioProfesor
});//router.post('/buscarTodosLosHorarioProfesor

/*
* BUSCAR todos los horarios de los profesores OK
*/
router.post('/buscarTodosLosIdHorarioProfesor', function(req,res,next) {
    horario_profesor.buscarTodosLosIdHorarioProfesor(function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('no hay horarios de profesores');
            }
            res.send(row);
        }//else
    })//horario_profesor.buscarTodosLosIdHorarioProfesor
});//router.post('/buscarTodosLosIdHorarioProfesor



/****************************************************************************************************************************/

module.exports = router;