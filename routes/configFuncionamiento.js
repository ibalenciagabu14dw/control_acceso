var express = require('express');
var router = express.Router();
var profesor = require('../models/profesor');
var alumno = require('../models/alumno');
var multer = require('multer');
var asignatura = require('../models/asignatura');
var aula = require('../models/aula');
var grupo = require('../models/grupo');
var horario_grupo = require('../models/horario_grupo');
var horario_profesor = require('../models/horario_profesor');


router.get('/config/configGlobal/configHorario/agregarHorarioGrupo', function(req, res, next) {
  aula.mostrarTodosLosIdNumeroAula(function (error,aul) {
    if (error) {
      console.log("Fallo mostrarTodosLosIdAula");
      throw error;
    }else{  
    asignatura.mostrarTodosLosIdNombreAsigntura(function (error,asign) {
      if (error) {
        console.log("Fallo mostrarTodosLosIdNombreAsigntura");
        throw error;
      }else{
        grupo.mostrarTodosLosIdNombreGrupo(function (error,gru){
                    if (error) {
                      console.log("Fallo");
                      throw error;
                    }else{
                      //console.log(data);                
                      //res.send(data);
                      res.render('agregarHorarioGrupo',{ 
                      grupo:gru,
                      asignatura:asign,
                      aula:aul,
                      })//.res.render
                    }//else error
        });////. grupo.mostrarTodosLosIdGrupo
      }//.else
    });//profesor.buscarProfesorPorId
  }//.else
  });//.mostrarTodosLosIdAula
});//.router.get('/agregarHorarioGr', function(req, res, next) {

router.get('/config/configGlobal/configHorario/agregarHorarioProfesor', function(req, res, next) {
  horario_grupo.mostrarTodosLosIdHoraDiaHorarioGrupo(function (error,gru) {
    if (error) {
      console.log("Fallo mostrarTodosLosIdHoraDiaHorarioGrupo");
      throw error;
    }else{  
        profesor.mostrarTodosLosIdNombreApellidosProfesor(function (error,pro){
                    if (error) {
                      console.log("Fallo");
                      throw error;
                    }else{
                      //console.log(data);                
                      //res.send(data);
                      res.render('agregarHorarioProfesor',{ 
                      grupo:gru,
                      profesor:pro,
                      })//.res.render
                    }//else error
        });////. grupo.mostrarTodosLosIdGrupo
  }//.else
  });//.mostrarTodosLosIdAula
});//.router.get('/agregarHorarioGr', function(req, res, next) {

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

router.post('/mostrarTodosLosGruposIdNombre', function(req,res,next){
  grupo.mostrarTodosLosIdNombreGrupo(function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//.grupo.mostrarTodosLosIdNombreGrupo
});//.router.post('/mostrarTodosLosGruposIdNombre', function(req,res,next){

router.post('/mostrarTodosLasAsignaturasIdNombre', function(req,res,next){
  asignatura.mostrarTodosLosIdNombreAsigntura(function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//.asignatura.mostrarTodosLosIdNombreAsigntura
});//.router.post('/mostrarTodosLasAsignaturasIdNombre', function(req,res,next){  

router.post('/mostrarTodosLasAulasIdNumero', function(req,res,next){
  aula.mostrarTodosLosIdNumeroAula(function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//.aula.mostrarTodosLosIdNumeroAula
});//.router.post('/mostrarTodosLasAulasIdNumero', function(req,res,next){  

module.exports = router;


