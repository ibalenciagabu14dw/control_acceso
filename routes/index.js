var express = require('express');
var router = express.Router();
var profesor = require('../models/profesor');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ControlFid'});
});

router.post('/login',function(req,res) {

	var user = req.body.user;
	var pass = req.body.pass;
	//res.send(user+" "+pass);
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
					res.redirect('/vistaProfesor?idProfesor='+data[0].id_profesor+'&time=08:00:00');
				}else{
					//rediorect vistaAdmin
					res.send("VistaAdmin");
				}
				
			}
		}
	});
});

module.exports = router;
