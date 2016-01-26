var express = require('express');
var router = express.Router();
var asignatura = require('../models/asignatura');
var multer = require('multer');

/* POST agregar grupo page. */
router.post('/agregarAsignatura', function(req,res,next){
	console.log(req.body);
	var nombre = req.body.nombre;
  	var clave = req.body.clave;
  	var tipo = req.body.tipo;
  	var obligatoria = req.body.obligatoria;
  
  	asignatura.buscarAsignaturaPorClave(clave, function (error,row) {
	  	if (error) {
	    	res.send({err:'bd'});
	    	throw error;
	  	}else{
	    	if(row.length>0){
	    		res.send({err:'existe'});
	    	}else{
	    		asignatura.insertarAsigntura(nombre,clave,obligatoria,tipo, function (error,row) {
	        		if (error) {
	        			res.send({err:'bd'});
	          			throw error;
	        		}else{
	        			res.send(row);
	        		}//.else
	      		});//.asignatura.insertarAsigntura
	    	}//. else if (row.length == 0)
	    }//.else
	});//.asignatura.buscarAsignaturaPorClave
});//.router.post('/agregarGrupo', function(req,res){

/*
* devuelve el nombre del profesor(modificarProfesor) FUNCIONA
*/
router.post('/buscarAsignaturasdelProfesor', function(req,res,next) {
  //console.log(req.body);
  var id_profesor = req.body.id_profesor;
  asignatura.buscarAsignaturasDelProfesor(id_profesor,function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//mostrarTodosLosIdNombreAsigntura
});//router.post('/buscarAsignaturas', function(req,res,next) {


/*
* devuelve el nombre del profesor(modificarProfesor) FUNCIONA
*/
router.post('/buscarTodasLasAsignaturas', function(req,res,next) {
  //console.log(req.body.id_profesor[0]);
  //console.log("estamos aquidos");
  var id_profesor = req.body.id_profesor;
  asignatura.lasAsignaturasQueFaltan(id_profesor,function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//mostrarTodosLosIdNombreAsigntura
});//router.post('/buscarAsignaturas', function(req,res,next) {

  //lasAsignaturasQueFaltanSegunElTipo

/*
* devuelve el nombre del profesor(modificarProfesor) FUNCIONA
*/
router.post('/buscarTodasLasAsignaturasDelTipo', function(req,res,next) {
 // console.log(req.body);
  var id_profesor = req.body.id_profesor;
  var tipo = req.body.tipo;
  asignatura.lasAsignaturasQueFaltanSegunElTipo(id_profesor,tipo,function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//mostrarTodosLosIdNombreAsigntura
});//router.post('/buscarAsignaturas', function(req,res,next) { 

router.post('/buscarAsignaturaNombre', function(req,res,next) {
  //console.log(req.body);
  var nombre = req.body.nombre;
  asignatura.buscarAsignaturaPorNombre(nombre, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarAsignaturaPorNombre
});//router.post('/buscarAsignaturaNombre', function(req,res,next) {

router.post('/buscarAsignaturaPorId', function(req,res,next) {
  var id_asignatura = req.body.id_asignatura;
  asignatura.buscarAsignaturaPorId(id_asignatura, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarAsignaturaPorId
});//router.post('/buscarAsignaturaId', function(req,res,next) {

router.post('/mostrarTodosLasAsignaturasIdNombre', function(req,res,next){
  asignatura.mostrarTodosLosIdNombreAsigntura(function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//.asignatura.mostrarTodosLosIdNombreAsigntura
});//.router.post('/mostrarTodosLasAsignaturasIdNombre', function(req,res,next){  

router.post('/borrarAsignatura', function(req,res,next){
  console.log(req.body);
  var id_asignatura = req.body.id_asignatura;
  asignatura.borrarAsigntura(id_asignatura, function(error,row) {
    if (error) {
      throw error;
    }else{
      //console.log(row);
      res.send(row);
    }
  })//borrarAsignatura
});//router.post('/borrarAsignatura', function(req,res,next){

router.post('/updateAsignatura',  function(req,res,next){
    var id_asignatura = req.body.id_asignatura;
    var nombre = req.body.nombre;
    var clave = req.body.clave;
    var obligatoria = req.body.obligatoria;
    var tipo = req.body.tipo;
          asignatura.buscarAsignaturaPorIdClave(id_asignatura,clave, function (error,row) {
            if (error) {
              res.send({err:'bd'});
              throw error;
            } else{
                if (row.length>0){
                     asignatura.modificarAsigntura(id_asignatura,nombre,clave,obligatoria,tipo, function(error,row) {
                          if (error) {
                            res.send({err:'bd'});
                            throw error;
                          } else{ 
                            res.send(row);
                          }//.else
                      });//.asignatura.insertarAsigntura
                } else {
               asignatura.buscarAsignaturaPorClave(clave, function (error,row) {
                  if (error) {
                    res.send({err:'bd'});
                    throw error;
                  } else{
                    //console.log(row);
                      if (row.length>0){
                       // res.render('agregarAsignatura', { title: 'agregarAsignatura', info: 'Clave existente'}); 
                       res.send({err:'existe'});
                      } else {
                asignatura.modificarAsigntura(id_asignatura,nombre,clave,obligatoria,tipo, function(error,row) {
                    if (error) {
                      res.send({err:'bd'});
                      throw error;
                    } else{ 
                      res.send(row);
                    }//.else
                  });//.asignatura.insertarAsigntura
                    }//.else
                  }//.else
                });//.asignatura.buscarAsignaturaPorClave
        }//. else
    }//.else
  });//.asignatura.buscarAsignaturaPorClave
});//router.post('/updateAsignatura',  function(req,res,next){

module.exports = router;