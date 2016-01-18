var express = require('express');
var router = express.Router();
var multer = require('multer');
var aula = require('../models/aula');
/* POST agregar clase page. */
router.post('/agregarAula', function(req,res){
  console.log(req.body);
  var numero = req.body.numero;
  var piso = req.body.piso;
  var capacidad = req.body.capacidad;
  aula.insertarAula(numero,piso,capacidad, function (error) {
    if (error) {
      throw error;
    } else{ 
      console.log("aula.insertarAula (configAula) correctamente");
    }//.else
  });//.alumno.insertarAula
});//.router.post('/agregarClase', function(req,res){