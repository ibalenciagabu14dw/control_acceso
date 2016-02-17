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
* INSERTAR aula OK
*/
router.post('/agregarAula', function(req, res, next) {
    aula.buscarAulaPorNumero(req.query.numero, function (error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length>0){
                res.send('ese numero de aula ya existe');
            }else{
                aula.agregarAula(req.query.numero,req.query.piso,req.query.capacidad, function (error,row) {
                    if (error) {
                        res.send('error agregando la aula');
                        throw error;
                    }else{
                        res.send('aula agregada correctamente');
                    }//else
                });//aula.agregarAula
            }//else
        }//else
    });//aula.buscarAulaPorNumero
});//router.post('/agregarAula

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE aula OK
*/
router.post('/modificarAula', function(req, res, next) {
    
    var numero_antiguo;

    aula.buscarAulaPorId(req.query.id_aula, function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            numero_antiguo = row[0].numero;
        }//else
    })//aula.buscarAulaPorId

    aula.buscarAulaPorNumero(req.query.numero, function (error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if((row.length>0)&&(req.query.numero!=numero_antiguo)){
                res.send('ese numero de aula ya existe');
            }else {
                aula.modificarAula(req.query.id_aula,req.query.numero,req.query.piso,req.query.capacidad, function(error,row){
                    if (error) {
                        res.send(error);
                        throw error;
                    }else {
                        res.send('aula modificada correctamente');
                    }//else
                })//aula.modificarAula
            }//else
        }//else
    })//aula.buscarAulaPorNumero
});//router.post('/modificarAula

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE aula por id_aula OK
*/
router.post('/borrarAula', function(req, res, next) {
    aula.buscarAulaPorId(req.query.id_aula, function(error,row) {
        if (error) {
            res.send(error);
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

/***********************************************************SELECT***********************************************************/

/*
* BUSCAR todos los id_aula OK
*/
router.post('/buscarTodosLosIdAula', function(req,res,next) {
    aula.buscarTodosLosIdAula(function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('no hay aulas');
            }
            res.send(row);
        }//else
    })//aula.buscarTodosLosIdAula
});//router.post('/buscarTodosLosIdAula

/*
* BUSCAR todos los id_aula y numero OK
*/
router.post('/buscarTodosLosIdYNumero', function(req,res,next) {
    aula.buscarTodosLosIdYNumero(function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('no hay aulas')
            }
            res.send(row);
        }//else
    })//aula.buscarTodosLosIdYNumero
});//router.post('/buscarTodosLosIdYNumero

/*
* BUSCAR aula por id_aula OK
*/
router.post('/buscarAulaPorId', function(req,res,next) {
    aula.buscarAulaPorId(req.query.id_aula, function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('No hay aula con ese id');
            }else{
                res.send(row);
            }//else
        }//else
    })//aula.buscarAulaPorId
});//router.post('/buscarAulaPorId

/*
* BUSCAR aula por numero OK
*/
router.post('/buscarAulaPorNumero', function(req,res,next) {
    aula.buscarAulaPorNumero(req.query.numero, function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('No hay aula con ese numero');
            }else{
                res.send(row);
            }//else
        }//else
    })//aula.buscarAulaPorNumero
});//router.post('/buscarAulaPorNumero

/****************************************************************************************************************************/

module.exports = router;