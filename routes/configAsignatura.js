var express = require('express');
var router = express.Router();
var multer = require('multer');
var asignatura = require('../models/asignatura');

/*
* devuelve el nombre de la asignatura de un profesor PROBAR
*/
router.post('/buscarAsignaturasdelProfesor', function(req,res,next) {
  console.log(req.body);
  var id_profesor = req.body.id_profesor;
  asignatura.buscarAsignaturasDelProfesor(id_profesor,function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//mostrarTodosLosIdNombreAsigntura
});//router.post('/buscarAsignaturasdelProfesor', function(req,res,next) {


/*
* devuelve el nombre de todas las asignaturas PROBAR
*/
router.post('/buscarTodasLasAsignaturas', function(req,res,next) {
  console.log(req.body);
  var id_profesor = req.body.id_profesor;
  asignatura.lasAsignaturasQueFaltan(id_profesor,function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//mostrarTodosLosIdNombreAsigntura
});//router.post('/buscarAsignaturas', function(req,res,next) {