var express = require('express');
var router = express.Router();
var profesor = require('../models/profesor');
var time = require('../models/time');
var alumno = require('../models/alumno');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ControlFid'});
});//.router.get('/', function(req, res, next)

/* POST login page. */
router.post('/login',function(req,res) {
	var user = req.body.user;
	var pass = req.body.pass;
	var curr_time;
	time.horaActual(function (error,data) {
		if (error) {
			throw error;
		}else{
			curr_time = data;
			console.log(curr_time);
			profesor.buscarProfesorPorCorreo(user, function (error,data) {
				if (error) {
					throw error;
				}else if (data.length == 0) {
					console.log("no existe");
					res.render('index', { title: 'ControlFid', info: 'Usuario no existe'}); 
				}else{
					if (pass != data[0].password) {
						console.log("password incorrecto");
						res.render('index', { title: 'ControlFid', info: 'Password incorrecto'});
						//render index with layout password mal
					}else{
						if (data[0].admin == 0) {
							res.redirect('/vistaProfesor?idProfesor='+data[0].id_profesor+'&time='+curr_time);
						}else{
							//rediorect vistaAdmin
							res.redirect('/config');
						}				
					}//.else
				}//.else
			});//.profesor.buscarProfesorPorCorreo
		}//else horaActual
	});//.time.horaActual
});//.router.post('/login',function(req,res)

/* Buscar personas */
router.get('/buscarPersona',function(req,res) {
	//******Controlar session
	var nombre = req.query.nombre;
	var apellidos = req.query.apellidos;
	var dni = req.query.dni;
	var correo = req.query.correo;
	if (correo.length == 0 && dni.length == 0) {
		alumno.buscarAlumnoPorNombreYApellido(nombre, apellidos, function (error,data) {
			if(error){
				console.log(error);
				throw error;
			}else{
				if (data.length != 0) {
					res.send(data);
				}else{
					profesor.buscarProfesorPorNombreYApellido(nombre, apellidos, function (error,data) {
						if (error) {
							console.log(error);
							throw error;
						}else{
							res.send(data);
						}//else error
					})//buscarProfesorPorNombreYApellido
				}//else data-length != 0
			}//else error
		});//buscarAlumnoPorNombreYApellido
	}else if(correo.length == 0){
		alumno.buscarAlumnoPorDni(dni, function (error,data) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				if (data.length != 0) {
					res.send(data);
				}else{
					profesor.buscarProfesorPorDni(dni, function (error,data) {
						if (error) {
							console.log(error);
							throw error;
						}else{
							res.send(data);
						}
					})//buscarProfesorPorDni
				}//else es alumno
			}//else error
		});//buscarAlumnoPorDni
	}else{
		alumno.buscarAlumnoPorCorreo(correo, function (error,data) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				if (data.length != 0) {
					res.send(data);
				}else{
					profesor.buscarProfesorPorCorreo(correo, function (error,data) {
						if (error) {
							console.log(error);
						}else{
							res.send(data);
						}
					})//buscarProfesorPorCorreo
				}//else data == 0
			}//else error
		})//buscarAlumnoPorCorreo
	}//else correo == 0

/*Buscar aula de la persona a buscar*/
router.get('/buscarAulaPersona',function(req,res) {
	var curr_time;
	time.horaActual(function (error,data) {
		if (error) {
			throw error;
		}else{
			curr_time = data;
		}
	});
	var id = req.query.id;
	alumno.buscarAulaEnLaQueTieneQueEstarPorId(id, curr_time, function (error,data) {
		if (error) {
			console.log(error);
			throw error;
		}else{
			if (data.length != 0) {
				res.send(data);
			}else{
				profesor.aulaEnLaQueTieneQueEstarPorId(id,curr_time,function (error,data2) {
					if (error) {
						console.log(error);
						throw error;
					}else{
						if (data2.length != 0) {
							res.send(data2);
						}else{
							res.send({'error':'No tiene clase'});
							console.log("No hay aula asociada");
						}
					}
				})//aulaEnLaQueTieneQueEstarPorId
			}//else if no es alumno
		}
	});//aulaEnLaQueTieneQueEstarPorId
});//buscarAulaPersona

});//router.get('/buscarPerosna')

module.exports = router;
