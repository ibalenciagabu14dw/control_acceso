var express = require('express');
var router = express.Router();
var time = require('../../models/time');
var aula = require('../../models/aula')
var alumno = require('../../models/alumno');
var alumno_grupos = require('../../models/alumno_grupos');
var asignatura = require('../../models/asignatura');
var convalidadas = require('../../models/convalidadas');
var profesor = require('../../models/profesor');

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR convalidada OK
*/
router.post('/agregarAsignaturaConvalidada', function(req, res, next) {
    alumno.buscarAlumnoPorId(req.query.id_alumno,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('no hay alumnos con ese id');
            }else{
                asignatura.buscarAsignaturaPorId(req.query.id_asignatura,function(error,row){
                    if(error){
                        res.send(error);
                    }else{
                        if(row.length==0){
                            res.send('no hay asignaturas con ese id');
                        }else{
                            convalidadas.agregarAsignaturaConvalidada(req.query.id_asignatura,req.query.id_alumno,function(error,row){
                                if(error){
                                    res.send(error);
                                }else{
                                    res.send('asignatura convalidada correctamente');
                                }//else
                            })//convalidadas.agregarAsignaturaConvalidada
                        }//else
                    }//else
                })//asignatura.buscarAsignaturaPorId
            }//else
        }//else
    })//alumno.buscarAlumnoPorId
});//router.post('/agregarAsignaturaConvalidada

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE convalidadas OK
*/
router.post('/modificarConvalidadas', function(req, res, next) {
    
    var id_alumno_antiguo;
    var id_asignatura_antiguo;

    convalidadas.buscarConvalidadasPorIdConvalidada(req.query.id_convalidada, function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('No hay ninguna convalidada con ese id');
            }else{
                id_alumno_antiguo = row[0].id_alumno;
                id_asignatura_antiguo = row[0].id_asignatura;

                convalidadas.buscarConvalidadaPorIdAlumnoYIdAsignatura(req.query.id_alumno,req.query.id_asignatura, function(error,row){
                    if((row.length>0)&&((id_alumno_antiguo!=req.query.id_alumno)&&(id_asignatura_antiguo!=req.query.id_asignatura))){
                        res.send('ese alumno ya tiene convalidada esa asignatura');
                    }
                    else{
                        convalidadas.modificarConvalidadas(req.query.id_convalidada,req.query.id_alumno,req.query.id_asignatura,function(error,row){
                            if (error) {
                                res.send(error);
                                throw error;
                            }else {
                                res.send('convalidada modificada correctamente');
                            }//else
                        });//convaliadas.modificarConvalidadas
                    }//else
                })//convalidadas.buscarConvalidadaPorIdAlumnoYIdAsignatura
            }//else
        }//else
    })//convalidadas.buscarConvalidadasPorIdConvalidada
});//router.post('/modificarConvalidadas

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE convalidada por id_convalidadas OK
*/
router.post('/borrarAsignaturaConvalidada', function(req, res, next) {
    convalidadas.buscarConvalidadasPorIdConvalidada(req.query.id_convalidada, function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('Ese id_convalidada no existe');
            }else{
                convalidadas.borrarAsignaturaConvalidada(req.query.id_convalidada, function(error,row) {
                    if (error) {
                        res.send('error borrando asignatura convalidada');
                        throw error;
                    }else{
                        res.send('convalidada borrada correctamente');
                    }//else
                })//convalidadas.borrarAsignaturaConvalidada
            }//else
        }//else
    })//convalidadas.buscarConvalidadasPorIdConvalidada
});//router.post('/borrarAsignaturaConvalidada

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
* BUSCAR todas las convalidadas OK
*/
router.post('/buscarTodasLasConvalidadas', function(req,res,next) {
    convalidadas.buscarTodasLasConvalidadas(function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('no hay convalidadas')
            }
            res.send(row);
        }//else
    })//convalidadas.buscarTodasLasConvalidadas
});//router.post('/buscarTodasLasConvalidadas

/*
*   BUSCAR convalidada por id_convalidadas OK
*/
router.post('/buscarConvalidadasPorIdConvalidada', function(req,res,next) {
    convalidadas.buscarConvalidadasPorIdConvalidada(req.query.id_convalidada, function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('No hay convalidadas con ese id');
            }else{
                res.send(row);
            }//else
        }//else
    })//convalidadas.buscarConvalidadasPorIdConvalidada
});//router.post('/buscarConvalidadasPorIdConvalidada

/*
*   BUSCAR asignaturas que tiene el alumno para convalidar  por id_alumno OK
*/
router.post('/buscarNoConvalidadasPorIdAlumno', function(req,res,next) {
    convalidadas.buscarNoConvalidadasPorIdAlumno(req.query.id_alumno, function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('No hay convalidadas con ese id_alumno');
            }else{
                res.send(row);
            }//else
        }//else
    })//convalidadas.buscarNoConvalidadasPorIdAlumno
});//router.post('/buscarNoConvalidadasPorIdAlumno
/*
*   BUSCAR convalidadass convalidadas por id_alumno OK
*/
router.post('/buscarConvalidadasPorIdAlumno', function(req,res,next) {
    convalidadas.buscarConvalidadasPorIdAlumno(req.query.id_alumno, function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('No hay convalidadas con ese id_alumno');
            }else{
                res.send(row);
            }//else
        }//else
    })//convalidadas.buscarConvalidadasPorIdAlumno
});//router.post('/buscarConvalidadasPorIdAlumno

/*
*   BUSCAR convalidadass convalidadas por id_asignatura OK
*/
router.post('/buscarConvalidadasPorIdAsignatura', function(req,res,next) {
    convalidadas.buscarConvalidadasPorIdAsignatura(req.query.id_asignatura, function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('No hay convalidadas con ese id_asignatura');
            }else{
                res.send(row);
            }//else
        }//else
    })//convalidadas.buscarConvalidadasPorIdAsignatura
});//router.post('/buscarConvalidadasPorIdAsignatura

/****************************************************************************************************************************/

module.exports = router;