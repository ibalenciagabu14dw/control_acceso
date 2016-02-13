var express = require('express');
var router = express.Router();
var alumno = require('../../models/alumno');
var grupo =require('../../models/grupo');
var alumno_grupos = require('../../models/alumno_grupos');

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR alumno en un nuevo grupo OK
*/
router.post('/agregarAlumnoGrupo', function(req, res, next) {
    //comprobar que el alumno introducido existe
    alumno.buscarAlumnoPorIdSinFoto(req.query.id_alumno, function(error,row){
        if(error){
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('ese alumno no existe');
            }else{
                //comprobar que el grupo introducido existe
                grupo.buscarGrupoPorId(req.query.id_grupo,function(error,row){
                    if(error){
                        res.send(error);
                        throw error;
                    }else{
                        if(row.length==0){
                            res.send('ese grupo no existe');
                        }else{
                            //comprobamos que ese alumno no este ya en ese grupo
                            alumno_grupos.buscarAlumnoGrupoPorIdAlumnoYIdGrupo(req.query.id_alumno,req.query.id_grupo, function (error,row) {
                                if (error) {
                                    res.send('error conectando con la base de datos');
                                    throw error;
                                }else{
                                    if(row.length>0){
                                        res.send('ese alumno ya esta asignado a ese grupo');
                                    }else{
                                        alumno_grupos.agregarAlumnoGrupo(req.query.id_grupo,req.query.id_alumno, function (error,row) {
                                            if (error) {
                                                res.send('error agregando el alumno_grupos');
                                                throw error;
                                            }else{
                                                res.send('alumno agregado al grupo correctamente');
                                            }//else
                                        });//alumno_grupos.agregarAlumnoGrupo
                                    }//else
                                }//else
                            });//alumno_grupos.buscarAulaPorNumero
                        }//else
                    }//else
                })//grupo.buscarGrupoPorId
            }//else
        }//else
    })//alumno.buscarAlumnoPorId
});//router.post('/agregarAlumnoGrupo

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE alumno_grupo OK
*/
router.post('/modificarAlumnoGrupo', function(req, res, next) {
    var id_alumno_antiguo;
    var id_grupo_antiguo;
    alumno_grupos.buscarAlumnoGrupoPorIdAlumnoGrupo(req.query.id_alumno_grupos,function(error,row){
        if(error){
            res.send(error);
            throw error;
        }else{
            id_alumno_antiguo = row[0].id_alumno;
            id_grupo_antiguo = row[0].id_grupo;
        }//else
    })//alumno_grupos.buscarAlumnoGrupoPorIdAlumnoGrupo


    //comprobar que el alumno introducido existe
    alumno.buscarAlumnoPorIdSinFoto(req.query.id_alumno, function(error,row){
        if(error){
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('ese alumno no existe');
            }else{
                //comprobar que el grupo introducido existe
                grupo.buscarGrupoPorId(req.query.id_grupo,function(error,row){
                    if(error){
                        res.send(error);
                        throw error;
                    }else{
                        if(row.length==0){
                            res.send('ese grupo no existe');
                        }else{
                            //comprobamos que ese alumno no este ya en ese grupo
                            alumno_grupos.buscarAlumnoGrupoPorIdAlumnoYIdGrupo(req.query.id_alumno,req.query.id_grupo, function (error,row) {
                                if (error) {
                                    res.send('error conectando con la base de datos');
                                    throw error;
                                }else{
                                    if((row.length>0)&&(req.query.id_alumno!=id_alumno_antiguo)&&(req.query.id_grupo!=id_grupo_antiguo)){
                                        res.send('ese alumno ya esta asignado a ese grupo');
                                    }else{
                                        alumno_grupos.modificarAlumnoGrupo(req.query.id_alumno_grupos,req.query.id_alumno,req.query.id_grupo, function (error,row) {
                                            if (error) {
                                                res.send('error agregando el alumno_grupos');
                                                throw error;
                                            }else{
                                                res.send('alumno_grupo modificado correctamente');
                                            }//else
                                        });//alumno_grupos.modificarAlumnoGrupo
                                    }//else
                                }//else
                            });//alumno_grupos.buscarAlumnoGrupoPorIdAlumnoYIdGrupo
                        }//else
                    }//else
                })//grupo.buscarGrupoPorId
            }//else
        }//else
    })//alumno.buscarAlumnoPorIdSinFoto
});//router.post('/modificarAlumnoGrupo

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE aula por id_aula OK
*/
router.post('/borrarAlumnoGrupos', function(req, res, next) {
    alumno_grupos.buscarAlumnoGrupoPorIdAlumnoGrupo(req.query.id_alumno_grupos, function(error,row) {
        if (error) {
            res.send('error conectando con la base de datos');
            throw error;
        }else{
            if(row.length==0){
                res.send('Ese id no existe');
            }else{
                alumno_grupos.borrarAlumnoGrupos(req.query.id_alumno_grupos, function(error,row) {
                    if (error) {
                        throw error;
                        res.send('error borrando alumno_grupos');
                    }else{
                        res.send('alumno_grupos borrado correctamente');
                    }//else
                })//alumno_grupos.borrarAlumnoGrupos
            }//else
        }//else
    })//alumno_grupos.buscarAlumnoGrupoPorIdAlumnoGrupo
});//router.post('/borrarAlumnoGrupos


/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
*   BUSCAR un id_alumno_grupos por id_alumno_grupo OK
*/
router.post('/buscarAlumnoGrupoPorIdAlumnoGrupo', function(req,res,next) {
    alumno_grupos.buscarAlumnoGrupoPorIdAlumnoGrupo(req.query.id_alumno_grupos, function(error,row) {
        if (error) {
            throw error;
        }else{
            if(row.length==0){
                res.send('No hay ningun alumno_grupo con en ese id_alumno_grupos');
            }else{
                res.send(row);
            }//else
        }//else
    })//alumno_grupos.buscarAlumnoGrupoPorIdAlumnoGrupo
});//router.post('/buscarAlumnoGrupoPorIdAlumnoGrupo

/*
*   BUSCAR un id_alumno_grupos por id_alumno OK
*/
router.post('/buscarAlumnoGrupoPorIdAlumno', function(req,res,next) {
    alumno_grupos.buscarAlumnoGrupoPorIdAlumno(req.query.id_alumno, function(error,row) {
        if (error) {
            throw error;
        }else{
            if(row.length==0){
                res.send('No hay ningun alumno_grupo con en ese id_alumno');
            }else{
                res.send(row);
            }//else
        }//else
    })//alumno_grupos.buscarAlumnoGrupoPorIdAlumno
});//router.post('/buscarAlumnoGrupoPorIdAlumno

/*
*   BUSCAR un id_alumno_grupos por id_grupo OK
*/
router.post('/buscarAlumnoGrupoPorIdGrupo', function(req,res,next) {
    alumno_grupos.buscarAlumnoGrupoPorIdGrupo(req.query.id_grupo, function(error,row) {
        if (error) {
            throw error;
        }else{
            if(row.length==0){
                res.send('No hay ningun alumno_grupo con en ese id_grupo');
            }else{
                res.send(row);
            }//else
        }//else
    })//alumno_grupos.buscarAlumnoGrupoPorIdGrupo
});//router.post('/buscarAlumnoGrupoPorIdGrupo

/*
*   BUSCAR un alumno en un grupo por id_alumno e id_grupo OK
*/
router.post('/buscarAlumnoGrupoPorIdAlumnoYIdGrupo', function(req,res,next) {
    alumno_grupos.buscarAlumnoGrupoPorIdAlumnoYIdGrupo(req.query.id_alumno,req.query.id_grupo, function(error,row) {
        if (error) {
            throw error;
        }else{
            if(row.length==0){
                res.send('No hay ningun alumno en ese grupo');
            }else{
                res.send(row);
            }//else
        }//else
    })//alumno_grupos.buscarAlumnoGrupoPorIdAlumnoYIdGrupo
});//router.post('/buscarAlumnoGrupoPorIdAlumnoYIdGrupo

/****************************************************************************************************************************/

module.exports = router;