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
* INSERTAR asignatura convalidada a un alumno OK
*/
router.post('/agregarConvalidada', function(req, res, next) {
    //comprobar que el alumno introducido existe
    alumno.buscarAlumnoPorIdSinFoto(req.query.id_alumno, function(error,row){
        if(error){
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('ese alumno no existe');
            }else{
                //comprobar que el asignatura introducido existe
                asignatura.buscarAsignaturaPorId(req.query.id_asignatura,function(error,row){
                    if(error){
                        res.send(error);
                        throw error;
                    }else{
                        if(row.length==0){
                            res.send('esa asignatura no existe');
                        }else{
                            //comprobamos que ese alumno no tenga ya esa asignatura convalidada
                            convalidadas.buscarConvalidadaPorIdAlumnoYIdAsignatura(req.query.id_alumno,req.query.id_asignatura, function (error,row) {
                                if (error) {
                                    res.send('error conectando con la base de datos');
                                    throw error;
                                }else{
                                    if(row.length>0){
                                        res.send('ese alumno ya tiene convalidada esa asignatura');
                                    }else{
                                        console.log("feo");
                                        convalidadas.agregarAsignaturaConvalidada(req.query.id_asignatura,req.query.id_alumno, function (error,row) {
                                            if (error) {
                                                res.send('error agregando convalidada');
                                                throw error;
                                            }else{
                                                res.send('convalidada agregada correctamente');
                                            }//else
                                        });//convalidadas.agregarAsignaturaConvalidada
                                    }//else
                                }//else
                            });//convalidadas.buscarConvalidadaPorIdAlumnoYIdAsignatura
                        }//else
                    }//else
                })//asignatura.buscarAsignaturaPorId
            }//else
        }//else
    })//alumno.buscarAlumnoPorIdSinFoto
});//router.post('/agregarConvalidada

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE convalidadas OK
*/
router.post('/modificarConvalidadas', function(req, res, next) {
    var id_alumno_antiguo;
    var id_asignatura_antiguo;
    convalidadas.buscarConvalidadaPorIdConvalidada(req.query.id_convalidada,function(error,row){
        if(error){
            res.send(error);
            throw error;
        }else{
            id_alumno_antiguo = row[0].id_alumno;
            id_asignatura_antiguo = row[0].id_asignatura;
        }//else
    })//convalidadas.buscarConvalidadaPorIdConvalidada

    //comprobar que el alumno introducido existe
    alumno.buscarAlumnoPorIdSinFoto(req.query.id_alumno, function(error,row){
        if(error){
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('ese alumno no existe');
            }else{
                //comprobar que el asignatura introducido existe
                asignatura.buscarAsignaturaPorId(req.query.id_asignatura,function(error,row){
                    if(error){
                        res.send(error);
                        throw error;
                    }else{
                        if(row.length==0){
                            res.send('esa asignatura no existe');
                        }else{
                            //comprobamos que ese alumno no tenga ya esa asignatura convalidada
                            convalidadas.buscarConvalidadaPorIdAlumnoYIdAsignatura(req.query.id_alumno,req.query.id_asignatura, function (error,row) {
                                if (error) {
                                    res.send('error conectando con la base de datos');
                                    throw error;
                                }else{
                                    console.log("req.query.id_alumno:"+req.query.id_alumno);
                                    console.log("id_alumno_antiguo:"+id_alumno_antiguo);
                                    console.log("req.query.id_asignatura:"+req.query.id_asignatura);
                                    console.log("id_asignatura_antiguo:"+id_asignatura_antiguo);
                                    if((row.length>0)&&(req.query.id_alumno!=id_alumno_antiguo)&&(req.query.id_asignatura!=id_asignatura_antiguo)){
                                        res.send('ese alumno ya tiene convalidada esa asignatura');
                                    }else{
                                        convalidadas.modificarConvalidadas(req.query.id_convalidada,req.query.id_alumno,req.query.id_asignatura, function (error,row) {
                                            if (error) {
                                                res.send('error modificando convalidada');
                                                throw error;
                                            }else{
                                                res.send('convalidada modificada correctamente');
                                            }//else
                                        });//convalidadas.modificarConvalidadas
                                    }//else
                                }//else
                            });//convalidadas.buscarConvalidadaPorIdAlumnoYIdAsignatura
                        }//else
                    }//else
                })//asignatura.buscarAsignaturaPorId
            }//else
        }//else
    })//alumno.buscarAlumnoPorIdSinFoto
});//router.post('/modificarConvalidadas

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE aula por id_aula OK
*/
router.post('/borrarAsignaturaConvalidada', function(req, res, next) {
    aula.buscarAulaPorId(req.query.id_aula, function(error,row) {
        if (error) {
            res.send('error conectando con la base de datos');
            throw error;
        }else{
            if(row.length==0){
                res.send('Ese id no existe');
            }else{
                aula.borrarAula(req.query.id_aula, function(error,row) {
                    if (error) {
                        throw error;
                        res.send('error borrando aula');
                    }else{
                        res.send('aula borrada correctamente');
                    }//else
                })//aula.borrarAula
            }//else
        }//else
    })//aula.buscarAulaPorId
});//router.post('/borrarAula


/****************************************************************************************************************************/

module.exports = router;