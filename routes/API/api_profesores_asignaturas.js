var express = require('express');
var router = express.Router();
var time = require('../../models/time');
var aula = require('../../models/aula')
var alumno = require('../../models/alumno');
var alumno_grupos = require('../../models/alumno_grupos');
var asignatura = require('../../models/asignatura');
var convalidadas = require('../../models/convalidadas'); 
var falta = require('../../models/falta');
var horario_grupo = require('../../models/horario_grupo');
var profesor = require('../../models/profesor');
var profesores_asignaturas = require('../../models/profesores_asignaturas');

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR asignatura a un profesor OK
*/
router.post('/agregarAsignaturasProfesor', function(req, res, next) {
    profesor.buscarProfesorPorId(req.query.id_profesor,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('ese profesor no existe');
            }else{
                asignatura.buscarAsignaturaPorId(req.query.id_asignatura,function(error,row){
                    if(error){
                        res.send(error);
                    }else{
                        if(row.length==0){
                            res.send('esa asignatura no existe');
                        }else{
                            profesores_asignaturas.buscarAsignaturaPorIdAsignaturaYIdProfesor(req.query.id_asignatura,req.query.id_profesor,function(error,row){
                                if(error){
                                    res.send(error);
                                }else{
                                    if(row.length>0){
                                        res.send('ese profesor ya imparte esa asignatura');
                                    }else{
                                        profesores_asignaturas.agregarAsignaturasProfesor(req.query.id_asignatura,req.query.id_profesor,function(error,row){
                                            if(error){
                                                res.send(error);
                                            }else{
                                                res.send('asignatura agregada al profesor correctamente');
                                            }//else
                                        })//profesores_asignaturas.agregarAsignaturasProfesor
                                    }//else
                                }//else
                            })//profesores_asignaturas.buscarAsignaturaPorIdAsignaturaYIdProfesor
                        }//else
                    }//else
                })//asignatura.buscarAsignaturaPorId
            }//else
        }//else
    })//profesor.buscarProfesorPorId
});//router.post('/agregarAsignaturasProfesor

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE asignatura de un profesor OK
*/
router.post('/modificarProfesoresAsignaturas', function(req, res, next) {
    
});//router.post('/modificarProfesoresAsignaturas

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE asignatura de un profesor OK
*/
router.post('/borrarProfesoresAsignaturas', function(req, res, next) {
    profesores_asignaturas.buscarAsignaturaPorIdProfesorAsignatura(req.query.id_profesor_asignatura,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('ese profesor no imparte esa asignatura');
            }else{
                profesores_asignaturas.borrarProfesoresAsignaturas(req.query.id_profesor_asignatura,function(error,row){
                    if(error){
                        res.send(error);
                    }else{
                        res.send('asignatura borrada al profesor correctamente');
                    }//else
                })//profesores_asignaturas.borrarProfesoresAsignaturas
            }//else
        }//else
    })//profesores_asignaturas.buscarAsignaturaPorIdProfesorAsignatura
});//router.post('/borrarProfesoresAsignaturas

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
*   BUSCAR todas las asignaturas de los profesores
*/
router.post('/buscarTodosLosProfesoresAsignaturas', function(req,res,next) {
    profesores_asignaturas.buscarTodosLosProfesoresAsignaturas(function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('Lista de profesores asignaturas vacia');
            }
            res.send(row);
        }//else
    })//profesores_asignaturas.buscarTodosLosProfesoresAsignaturas
});//router.post('/buscarTodosLosProfesoresAsignaturas

/*
*   Buscar asignatura de un profesor por id_asignatura e id_profesor
*/
router.post('/buscarAsignaturaPorIdAsignaturaYIdProfesor', function(req,res,next) {
    profesor.buscarProfesorPorId(req.query.id_profesor,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('ese profesor no existe');
            }else{
                asignatura.buscarAsignaturaPorId(req.query.id_asignatura,function(error,row){
                    if(error){
                        res.send(error);
                    }else{
                        if(row.length==0){
                            res.send('esa asignatura no existe');
                        }else{
                            profesores_asignaturas.buscarAsignaturaPorIdAsignaturaYIdProfesor(req.query.id_asignatura,req.query.id_profesor,function(error,row) {
                                if (error) {
                                    res.send(error);
                                    throw error;
                                }else{
                                    if(row.length==0){
                                        res.send('el profesor no imparte esa asignatura');
                                    }else{
                                        res.send(row);
                                    }//else
                                }//else
                            })//profesores_asignaturas.buscarAsignaturaPorIdAsignaturaYIdProfesor
                        }//else
                    }//else
                })//asignatura.buscarAsignaturaPorId
            }//else
        }//else
    })//profesor.buscarProfesorPorId
});//router.post('/buscarAsignaturaPorIdAsignaturaYIdProfesor

/*
*   BUSCAR asignatura de un profesor por id_profesor_asignatura OK
*/
router.post('/buscarAsignaturaPorIdProfesorAsignatura', function(req,res,next) {
    profesores_asignaturas.buscarAsignaturaPorIdProfesorAsignatura(req.query.id_profesor_asignatura, function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('no existe ese id_profesor_asignatura');
            }else{
                res.send(row);
            }//else
        }//else
    })//profesores_asignaturas.buscarAsignaturaPorIdProfesorAsignatura
})//router.post('/buscarAsignaturaPorIdProfesorAsignatura

/*
*   BUSCAR las asignaturas que imparte un profesor por id_profesor
*/
router.post('/buscarAsignaturasQueImparte',function(req,res,next){
    profesor.buscarProfesorPorIdSinFoto(req.query.id_profesor,function(error,row) {
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('no hay profesor con ese id');    
            }else{
                profesores_asignaturas.buscarAsignaturasQueImparte(req.query.id_profesor,function(error,row){
                    if(error){
                        res.send(error);
                    }else{
                        if(row.length==0){
                            res.send('ese profesor no imparte ninguna asignatura');
                        }else{
                            res.send(row);
                        }//else
                    }//else
                })//profesores_asignaturas.buscarAsignaturasQueImparte
            }//else
        }//else
    })//profesor.buscarProfesorPorIdSinFoto
})//router.post('/buscarAsignaturasQueImparte

/*
*   BUSCAR las asignaturas que imparte un profesor por id_profesor
*/
router.post('/buscarAsignaturasQueNoImpartePorId',function(req,res,next){
    profesor.buscarProfesorPorIdSinFoto(req.query.id_profesor,function(error,row) {
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('no hay profesor con ese id');    
            }else{
                profesores_asignaturas.buscarAsignaturasQueNoImpartePorId(req.query.id_profesor,function(error,row){
                    if(error){
                        res.send(error);
                    }else{
                        if(row.length==0){
                            res.send('ese profesor no imparte ninguna asignatura');
                        }else{
                            res.send(row);
                        }//else
                    }//else
                })//profesores_asignaturas.buscarAsignaturasQueNoImpartePorId
            }//else
        }//else
    })//profesor.buscarProfesorPorIdSinFoto
})//router.post('/buscarAsignaturasQueNoImpartePorId

/****************************************************************************************************************************/

module.exports = router;