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

module.exports = router;


