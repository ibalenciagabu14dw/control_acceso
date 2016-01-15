var express = require('express');
var router = express.Router();
var profesor = require('../models/profesor');
var time = require('../models/time');

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

module.exports = router;
