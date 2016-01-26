var express = require('express');
var router = express.Router();
var aula = require('../models/aula');
var multer = require('multer');

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR AULA
*/
router.post('/agregarAula', function(req,res){
    var numero = req.body.numero;
    var piso = req.body.piso;
    var capacidad = req.body.capacidad;
    aula.buscarAulaPorNumero(numero, function (error,row) {
        if (error) {
            res.send({err:'bd'});
            throw error;
        }else{
            if (row.length>0){
                res.send({err:'existe'});
            }else {
                aula.insertarAula(numero,piso,capacidad, function (error,row) {
                    if (error) {
                        res.send({err:'bd'});
                        throw error;
                    }else{ 
                        res.send(row);
                    }//.else
                });//.aula.insertarAula
            }//. else if (row.length == 0)
        }//.else
    });//aula.buscarAulaPorNumero
});//.router.post('/agregarAula

/****************************************************************************************************************************/

/***********************************************************UPDATE*********************************************************/

/*
* UPDATE AULA
*/
router.post('/updateAula',  function(req,res,next){
    var id_aula = req.body.id_aula;
    var numero = req.body.numero;
    var piso = req.body.piso;
    var capacidad = req.body.capacidad;
    aula.buscarAulaPorIdNumero(id_aula,numero, function (error,row) {
        if (error) {
            res.send({err:'bd'});
            throw error;
        }else{
            if (row.length>0){
                aula.modificarAula(id_aula,numero,piso,capacidad, function(error,row) {
                    if (error) {
                        res.send({err:'bd'});
                        throw error;
                    }else{ 
                        res.send(row);
                    }//.else
                });//.aula.modificarAula
            }else {
                aula.buscarAulaPorNumero(numero, function (error,row) {
                    if (error) {
                        res.send({err:'bd'});
                        throw error;
                    }else{
                        if (row.length>0){
                        res.send({err:'existe'});
                        }else{
                            aula.modificarAula(id_aula,numero,piso,capacidad, function(error,row) {
                                if (error) {
                                    res.send({err:'bd'});
                                    throw error;
                                }else{ 
                                    res.send(row);
                                }//.else
                            });//.aula.modificarAula
                        }//.else
                    }//.else
                });//.aula.buscarAulaPorNumero
            }//. else
        }//.else
    });//.aula.buscarAulaPorIdNumero
});//router.post('/updateAula

/****************************************************************************************************************************/

/***********************************************************DELETE*********************************************************/

/*
* DELETE aula por id_aula
*/
router.post('/borrarAula', function(req,res,next){
  var id_aula = req.body.id_aula;
  aula.borrarAula(id_aula, function(error,row) {
    if (error) {
      throw error;
    }else{
      //console.log(row);
      res.send(row);
    }
  })//borrarAsignatura
});//router.post('/borrarAsignatura', function(req,res,next){

/****************************************************************************************************************************/

/***********************************************************SELECT*********************************************************/

/*
* busca el aula por numero
*/
router.post('/buscarAulaNumero', function(req,res,next) {
    var numero = req.body.numero;
    aula.buscarAulaPorNumero(numero, function(error,row) {
        if (error) {
            throw error;
        }
        else{
            res.send(row);
        }//.else
    })//.aula.buscarAulaPorNumero
});//.router.post('/buscarAulaNumero


/*
* devuelve el nombre del profesor(modificarProfesor) FUNCIONA
*/
router.post('/buscarAulaPorId', function(req,res,next) {
  var id_aula = req.body.id_aula;
  aula.buscarAulaPorId(id_aula, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarAsignaturaPorId
});//router.post('/buscarAsignaturaId', function(req,res,next) {

/*
* devuelve el nombre del profesor(modificarProfesor) FUNCIONA
*/
router.post('/mostrarTodosLasAulasIdNumero', function(req,res,next){
  aula.mostrarTodosLosIdNumeroAula(function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//.aula.mostrarTodosLosIdNumeroAula
});//.router.post('/mostrarTodosLasAulasIdNumero', function(req,res,next){  

/****************************************************************************************************************************/

module.exports = router;