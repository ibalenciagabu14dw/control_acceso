var express = require('express');
var router = express.Router();
var falta = require('../models/falta');
var alumno = require('../models/alumno');


/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE AULA
*/
router.post('/updateFalta',  function(req,res,next){
    console.log(req.body);
    var id_faltas = req.body.id_faltas;
    var fecha = req.body.fecha;
    var id_alumno = req.body.id_alumno;
    var id_horario_grupo = req.body.id_horario_grupo;
    var observaciones = req.body.observaciones;    
    falta.buscarFaltaExistente(id_alumno,id_horario_grupo,observaciones, function (error,row) {
    if (error) {
      res.send({err:'bd'});
      throw error;
    } else{
        if (row.length>0){
         res.send({err:'existe'});
        } else {
          falta.modificarFalta(id_faltas,fecha,id_alumno,id_horario_grupo,observaciones, function (error,row) {
              if (error) {
                res.send({err:'bd'});
                throw error;
              } else{ 
                res.send(row);
              }//.else
          });//.falta.modificarFalta
        }//. else if (row.length == 0)
    }//.else
  });//.falta.buscarFaltaExistente
});//.router.post('/updateFalta',  function(req,res,next){

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE falta por id_falta
*/
router.post('/borrarFalta', function(req,res,next){
    var id_faltas = req.body.id_faltas;
    falta.borrarFalta(id_faltas, function(error,row) {
        if (error) {
            throw error;
        }else{
            res.send(row);
        }
    })//falta.borrarFalta
});//router.post('/borrarFalta


/*
* BUSCAR falta por nombre alumno
*/
router.post('/buscarFaltaPorNombreAlumno', function(req,res,next) {
    var nombre = req.body.nombre;
    falta.buscarFaltaPorNombreAlumno(nombre, function(error,row) {
        if (error) {
            throw error;
        }else{
            res.send(row);
        }//else
    })//falta.buscarFaltaPorNombreAlumno
});//router.post('/buscarFaltaPorNombreAlumno

/*
* BUSCAR falta por nombre alumno
*/
router.post('/buscarFaltaPorId', function(req,res,next) {
    var id_faltas = req.body.id_faltas;
    falta.buscarFaltaPorId(id_faltas, function(error,row) {
        if (error) {
            throw error;
        }else{
            res.send(row);
        }//else
    })//falta.buscarFaltaPorId
});//router.post('/buscarAlumnoPorId


module.exports = router;