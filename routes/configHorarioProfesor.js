var express = require('express');
var router = express.Router();
var horario_profesor = require('../models/horario_profesor');
var multer = require('multer');

router.post('/agregarHorarioProfesor', function(req,res,next){
  var dia_semana = req.body.dia;
  var hora_inicio = req.body.hora_inicio;
  var hora_final = req.body.hora_final;
  var id_profesor = req.body.id_profesor;
  var id_horario_grupo = req.body.id_horario_grupo;     
    horario_profesor.buscarHorarioProfesorIgual(dia_semana,hora_inicio,hora_final,id_profesor, function (error,row) {
    if (error) {
      res.send({err:'bd'});
      throw error;
    } else{
        if (row.length>0){
         res.send({err:'existe'});
        } else {
          horario_profesor.insertarHorarioProfesor(dia_semana,hora_inicio,hora_final,id_profesor,id_horario_grupo, function (error,row) {
              if (error) {
                res.send({err:'bd'});
                throw error;
              } else{ 
                res.send(row);
              }//.else
          });//.horario_profesor.insertarHorarioProfesor
        }//. else if (row.length == 0)
    }//.else
  });//.horario_profesor.buscarHorarioProfesorIgual
});//.router.post('/agregarHorarioProfesor', function(req,res,next){

module.exports = router;