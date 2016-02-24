var express = require('express');
var router = express.Router();
var time = require('../../models/time');
var aula = require('../../models/aula')
var alumno = require('../../models/alumno');
var alumno_grupos = require('../../models/alumno_grupos');
var asignatura = require('../../models/asignatura');
var convalidadas = require('../../models/convalidadas');
var dispositivo = require('../../models/dispositivo');
var profesor = require('../../models/profesor');

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR dispositivo
*/
router.post('/agregarDispositivo', function(req, res, next) {
    dispositivo.buscarDispositivoPorNumeroDispositivo(req.query.numero_dispositivo, function (error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length>0){
                res.send('ese numero de dispositivo ya existe');
            }else{
                aula.buscarAulaPorId(req.query.id_aula,function(error,row){
                    if(error){
                        res.send(error);
                        throw error;
                    }else{
                        if(row.length==0){
                            res.send('ese aula no existe');
                        }else{
                            dispositivo.buscarDispositivoPorIdAula(req.query.id_aula,function(error,row){
                                if(error){
                                    res.send(error);
                                    throw error;
                                }else{
                                    if(row.length>0){
                                        res.send('ese numero de aula ya tiene un dispositivo');
                                    }else{
                                        dispositivo.agregarDispositivo(req.query.id_aula,req.query.numero_dispositivo,function (error,row) {
                                            if (error) {
                                                res.send('error agregando el dispositivo');
                                                throw error;
                                            }else{
                                                res.send('dispositivo agregado correctamente');
                                            }//else
                                        });//dispositivo.agregarDispositivo
                                    }//else   
                                }//else
                            })//dispositivo.buscarDispositivoPorIdAula 
                        }//else
                    }//else
                })//aula.buscarAulaPorId
            }//else
        }//else
    });//dispositivo.buscarDispositivoPorNumeroDispositivo
});//router.post('/agregarDispositivo

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE dispositivo OK
*/
router.post('/modificarDispositivo', function(req, res, next) {
    var id_aula_antiguo;
    dispositivo.buscarDispositivoPorNumeroDispositivo(req.query.numero_dispositivo, function (error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('No hay ningun dispositivo con ese id');
            }else{
                id_aula_antiguo = row[0].id_aula;
                aula.buscarAulaPorId(req.query.id_aula,function(error,row){
                    if(error){
                        res.send(error);
                    }else{
                        if(row.length==0){
                            res.send('no hay ninguna aula con ese id');
                        }else{
                            dispositivo.buscarDispositivoPorIdAula(req.query.id_aula,function(error,row){
                                if(error){
                                    res.send(error);
                                }else{
                                    if((row.length>0)&&(id_aula_antiguo!=req.query.id_aula)){
                                        res.send('esa aula ya tiene otro dispositivo asociado');
                                    }else{
                                        dispositivo.modificarDispositivo(req.query.id_aula,req.query.numero_dispositivo,function(error,row){
                                            if (error) {
                                                res.send(error);
                                                throw error;
                                            }else {
                                                res.send('dispositivo modificado correctamente');
                                            }//else
                                        });//dispositivo.modificarDispositivo
                                    }//else
                                }//else
                            })//dispositivo.buscarDispositivoPorIdAula
                        }//else
                    }//else
                })//aula.buscarAulaPorId
            }//else
        }//else
    })//dispositivo.buscarDispositivoPorNumeroDispositivo
});//router.post('/modificarDispositivo

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE dispositivo por numero_dispositivo OK
*/
router.post('/borrarDispositivo', function(req, res, next) {
    dispositivo.buscarDispositivoPorNumeroDispositivo(req.query.numero_dispositivo, function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('Ese dispositivo no existe');
            }else{
                dispositivo.borrarDispositivo(req.query.numero_dispositivo, function(error,row) {
                    if (error) {
                        throw error;
                        res.send('error borrando dispositivo');
                    }else{
                        res.send('dispositivo borrado correctamente');
                    }//else
                })//dispositivo.borrarDispositivo
            }//else
        }//else
    })//dispositivo.buscarAulaPorId
});//router.post('/borrarDispositivo


/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
* BUSCAR todos los dispositivos OK
*/
router.post('/buscarTodosLosDispositivos', function(req,res,next) {
    dispositivo.buscarTodosLosDispositivos(function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('no hay dispositivos');
            }
            res.send(row);
        }//else
    })//dispositivo.buscarTodosLosDispositivos
});//router.post('/buscarTodosLosDispositivos

/*
* BUSCAR las aulas que no tengan dispositivos OK
*/
router.post('/buscarAulasSinDispositivos', function(req,res,next) {
    dispositivo.buscarDispositivosSinConfigurar(function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('no hay dispositivos sin configurar');
            }
            res.send(row);
        }//else
    })//dispositivo.buscarDispositivosSinConfigurar
});//router.post('/buscarDispositivosSinConfigurar

/*
* BUSCAR dispositivo por numero_dispositivo OK
*/
router.post('/buscarDispositivoPorNumeroDispositivo', function(req,res,next) {
    dispositivo.buscarDispositivoPorNumeroDispositivo(req.query.numero_dispositivo, function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('No hay dispositivo con ese id');
            }else{
                res.send(row);
            }//else
        }//else
    })//dispositivo.buscarDispositivoPorNumeroDispositivo
});//router.post('/buscarDispositivoPorNumeroDispositivo

/*
* BUSCAR dispositivo por id_aula OK
*/
router.post('/buscarDispositivoPorIdAula', function(req,res,next) {
    aula.buscarAulaPorId(req.query.id_aula,function(error,row){
        if(error){
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('no existe aula con ese id');
            }else{
                dispositivo.buscarDispositivoPorIdAula(req.query.id_aula, function(error,row) {
                    if (error) {
                        res.send(error);
                        throw error;
                    }else{
                        if(row.length==0){
                            res.send('No hay dispositivo con ese id_aula');
                        }else{
                            res.send(row);
                        }//else
                    }//else
                })//dispositivo.buscarDispositivoPorIdAula
            }//else
        }//else
    })//aula.buscarAulaPorId    
});//router.post('/buscarDispositivoPorIdAula

/****************************************************************************************************************************/

module.exports = router;