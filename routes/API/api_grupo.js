var express = require('express');
var router = express.Router();
var time = require('../../models/time');
var aula = require('../../models/aula')
var alumno = require('../../models/alumno');
var alumno_grupos = require('../../models/alumno_grupos');
var asignatura = require('../../models/asignatura');
var convalidadas = require('../../models/convalidadas');
var dispositivo = require('../../models/dispositivo');
var grupo = require('../../models/grupo');
var profesor = require('../../models/profesor');

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR grupo
*/
router.post('/agregarGrupo', function(req, res, next) {
    grupo.buscarGrupoPorNombre(req.query.nombre_grupo,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length>0){
                res.send('ese grupo ya existe');
            }else{
                if((req.query.tipo!="bachiller")&&(req.query.tipo!="fp")){
                    res.send('el tipo tiene que ser bachiller o fp');
                }else{
                    grupo.agregarGrupo(req.query.nombre_grupo,req.query.tipo,function(error,row){
                        if(error){
                            res.send(error);
                        }else{
                            res.send('grupo agregado correctamente');
                        }//else
                    })//grupo.agregarGrupo
                }//else
            }//else
        }//
    })
});//router.post('/agregarGrupo

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE dispositivo OK
*/
router.post('/modificarGrupo', function(req, res, next) {
    var nombre_grupo_antiguo;
    grupo.buscarGrupoPorId(req.query.id_grupo, function (error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('No hay ningun grupo con ese id');
            }else{
                nombre_grupo_antiguo = row[0].nombre_grupo;
                grupo.buscarGrupoPorNombre(req.query.nombre_grupo, function(error,row){
                    if((row.length>0)&&(nombre_grupo_antiguo!=req.query.nombre_grupo)){
                        res.send('ya hay un grupo con ese nombre');
                    }
                    else{
                        if((req.query.tipo!="bachiller")&&(req.query.tipo!="fp")){
                            res.send('el tipo tiene que ser bachiller o fp');
                        }else{
                            grupo.modificarGrupo(req.query.id_grupo,req.query.nombre_grupo,req.query.tipo,function(error,row){
                                if(error){
                                    res.send(error);
                                }else{
                                    res.send('grupo modificado correctamente');
                                }//else
                            })//grupo.modificarGrupo
                        }//else
                    }//else
                })//grupo.buscarGrupoPorNombre
            }//else
        }//else
    })//grupo.buscarGrupoPorId
});//router.post('/modificarGrupo

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE dispositivo por numero_dispositivo OK
*/
router.post('/borrarGrupo', function(req, res, next) {
    grupo.buscarGrupoPorId(req.query.id_grupo, function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('Ese grupo no existe');
            }else{
                grupo.borrarGrupo(req.query.id_grupo, function(error,row) {
                    if (error) {
                        throw error;
                        res.send('error borrando grupo');
                    }else{
                        res.send('grupo borrado correctamente');
                    }//else
                })//grupo.borrarGrupo
            }//else
        }//else
    })//grupo.buscarGrupoPorId
});//router.post('/borrarGrupo


/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
* BUSCAR grupo por id_grupo OK
*/
router.post('/buscarGrupoPorId', function(req,res,next) {
    grupo.buscarGrupoPorId(req.query.id_grupo,function(error,row){
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('No hay grupo con ese id');
            }else{
                res.send(row);
            }//else
        }//else
    })//grupo.buscarGrupoPorId    
});//router.post('/buscarGrupoPorId

/*
* BUSCAR grupo por nombre OK
*/
router.post('/buscarGrupoPorNombre', function(req,res,next) {
    grupo.buscarGrupoPorNombre(req.query.nombre_grupo, function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('No hay grupo con ese nombre');
            }else{
                res.send(row);
            }//else
        }//else
    })//grupo.buscarGrupoPorNombre
});//router.post('/buscarGrupoPorNombre

/*
* BUSCAR todos los id_aula OK
*/
router.post('/buscarTodosLosIdGrupo', function(req,res,next) {
    grupo.buscarTodosLosIdGrupo(function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('no hay grupos');
            }
            res.send(row);
        }//else
    })//grupo.buscarTodosLosIdGrupo
});//router.post('/buscarTodosLosIdGrupo

/*
* BUSCAR todos los grupos OK
*/
router.post('/buscarTodosLosGrupos', function(req,res,next) {
    grupo.buscarTodosLosGrupos(function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('no hay grupos');
            }
            res.send(row);
        }//else
    })//grupo.buscarTodosLosGrupos
});//router.post('/buscarTodosLosGrupos

/*
* BUSCAR grupos a los que no pertenece un alumno
*/
router.post('/buscarGruposQueNoPerteneceUnAlumno', function(req,res,next) {
    alumno.buscarAlumnoPorId(req.query.id_alumno,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('ese alumno no existe');
            }else{
                grupo.buscarGruposQueNoPerteneceUnAlumno(req.query.id_alumno, function(error,row) {
                    if (error) {
                        res.send(error);
                        throw error;
                    }else{
                        if(row.length==0){
                            res.send('Ese alumno esta asociado a todos los grupos');
                        }else{
                            res.send(row);
                        }//else
                    }//else
                })//grupo.buscarGruposQueNoPerteneceUnAlumno
            }//else
        }//else
    })//alumno.buscarAlumnoPorId
});//router.post('/buscarGruposQueNoPerteneceUnAlumno

/*
* BUSCAR grupos a los que no pertenece un alumno
*/
router.post('/buscarGruposQuePerteneceUnAlumno', function(req,res,next) {
    alumno.buscarAlumnoPorId(req.query.id_alumno,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('ese alumno no existe');
            }else{
                grupo.buscarGruposQuePerteneceUnAlumno(req.query.id_alumno, function(error,row) {
                    if (error) {
                        res.send(error);
                        throw error;
                    }else{
                        if(row.length==0){
                            res.send('Ese alumno no esta asociado a ningun grupo');
                        }else{
                            res.send(row);
                        }//else
                    }//else
                })//grupo.buscarGruposQuePerteneceUnAlumno
            }//else
        }//else
    })//alumno.buscarAlumnoPorId
});//router.post('/buscarGruposQuePerteneceUnAlumno

/*
* BUSCAR asignaturas de un grupo
*/
router.post('/buscarAsignaturasDeUnGrupo', function(req,res,next) {
    grupo.buscarGrupoPorId(req.query.id_grupo,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('ese grupo no existe');
            }else{
                grupo.buscarAsignaturasDeUnGrupo(req.query.id_grupo, function(error,row) {
                    if (error) {
                        res.send(error);
                        throw error;
                    }else{
                        if(row.length==0){
                            res.send('Ese grupo no tiene asignaturas');
                        }else{
                            res.send(row);
                        }//else
                    }//else
                })//grupo.buscarAsignaturasDeUnGrupo
            }//else
        }//else
    })//grupo.buscarGrupoPorId
});//router.post('/buscarAsignaturasDeUnGrupo

/****************************************************************************************************************************/

module.exports = router;