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

module.exports = router;