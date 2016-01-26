var express = require('express');
var router = express.Router();
var horario_grupo = require('../models/horario_grupo');
var multer = require('multer');

router.post('/agregarHorarioGrupo', function(req,res,next){
  var dia_semana = req.body.dia;
  var hora_inicio = req.body.hora_inicio;
  var hora_final = req.body.hora_final;
  var id_grupo = req.body.id_grupo;
  var id_asignatura = req.body.id_asignatura;
  var id_aula = req.body.id_aula;     
    horario_grupo.buscarHorarioGrupoIgual(dia_semana,hora_inicio,hora_final,id_grupo,id_asignatura,id_aula, function (error,row) {
    if (error) {
      res.send({err:'bd'});
      throw error;
    } else{
        if (row.length>0){
         res.send({err:'existe'});
        } else {
          horario_grupo.insertarHorarioGrupo(dia_semana,hora_inicio,hora_final,id_grupo,id_asignatura,id_aula, function (error,row) {
              if (error) {
                res.send({err:'bd'});
                throw error;
              } else{ 
                res.send(row);
              }//.else
          });//.horario_grupo.insertarHorarioGrupo
        }//. else if (row.length == 0)
    }//.else
  });//.horario_grupo.buscarHorarioGrupoIgual
});//.router.post('/agregarHorarioGrupo', function(req,res,next){

router.post('/buscarHorarioGrupoHorarioProfesor', function(req,res,next) {
  var id_horario_grupo = req.body.id_horario_grupo;
  horario_grupo.buscarHorarioGrupoPorId(id_horario_grupo, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarHorarioGrupoPorId
});//router.post('/buscarHorarioGrupoHorarioProfesor', function(req,res,next) {

router.post('/updateHorarioGrupo',  function(req,res,next){
  var id_horario_grupo = req.body.id_horario_grupo;
  var dia_semana = req.body.dia;
  var hora_inicio = req.body.hora_inicio;
  var hora_final = req.body.hora_final;
  var id_grupo = req.body.grupo;
  var id_asignatura = req.body.asignatura;
  var id_aula = req.body.aula;     
    horario_grupo.buscarHorarioGrupoIgual(dia_semana,hora_inicio,hora_final,id_grupo,id_asignatura,id_aula, function (error,row) {
    if (error) {
      res.send({err:'bd'});
      throw error;
    } else{
        if (row.length>0){
         res.send({err:'existe'});
        } else {
          horario_grupo.modificarHorarioGrupo(id_horario_grupo,dia_semana,hora_inicio,hora_final,id_grupo,id_asignatura,id_aula, function (error,row) {
              if (error) {
                res.send({err:'bd'});
                throw error;
              } else{ 
                res.send(row);
              }//.else
          });//.horario_grupo.modificarHorarioGrupo
        }//. else if (row.length == 0)
    }//.else
  });//.horario_grupo.buscarHorarioGrupoIgual
});//.router.post('/updateHorarioGrupo',  function(req,res,next){

router.post('/buscarHorarioGrupoNombre', function(req,res,next) {
  var nombre = req.body.nombre;
  console.log(req.body);
  horario_grupo.buscarHorarioGrupoPorNombredelGrupo(nombre, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//horario_grupo.buscarHorarioGrupoPorNombredelGrupo
});//router.post('/buscarHorarioGrupoNombre', function(req,res,next) {

router.post('/buscarHorarioGrupoPorId', function(req,res,next) {
  var id_horario_grupo = req.body.id_horario_grupo;
  horario_grupo.buscarHorarioGrupoPorId(id_horario_grupo, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//grupo.buscarGrupoPorId
});//router.post('/buscarGrupoPorId', function(req,res,next) {

router.post('/borrarHorarioGrupo', function(req,res,next){
  var id_horario_grupo = req.body.id_horario_grupo;
  horario_grupo.borrarHorarioGrupo(id_horario_grupo, function(error,row) {
    if (error) {
      throw error;
    }else{
      //console.log(row);
      res.send(row);
    }
  })//borrarGrupo
});//router.post('/borrarGrupo', function(req,res,next){  

module.exports = router;