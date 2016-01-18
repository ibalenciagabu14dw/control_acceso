var express = require('express');
var router = express.Router();
var multer = require('multer');
var grupo = require('../models/grupo');

/* POST agregar grupo page. */
router.post('/agregarGrupo', function(req,res){
  console.log(req.body);
  var nombre = req.body.nombre;
  var tipo = req.body.tipo;
  grupo.insertarGrupo(nombre,tipo, function (error) {
    if (error) {
      throw error;
    } else{ 
      console.log("grupo.insertarGrupo (configGrupo) correctamente");
    }//.else
  });//.alumno.insertarAula
});//.router.post('/agregarGrupo', function(req,res){

module.exports = router;