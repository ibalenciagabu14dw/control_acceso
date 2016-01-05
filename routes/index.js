var express = require('express');
var router = express.Router();
var profesor = require('../models/profesor');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ControlFid'});
});

router.post('/login',function(req,res) {
	var now = new Date();
	var day = now.getDay();
	var hour = now.getHours();
	var min = now.getMinutes();
	var sec = now.getSeconds();
	if (sec < 10) {
		sec = "0"+sec;
	};
	if (hour < 10) {
		hour = "0"+hour;
	};
	if (min < 10) {
		min = "0"+min;
	};

	var user = req.body.user;
	var pass = req.body.pass;
	//res.send(user+" "+pass);
	profesor.buscarProfesorPorCorreo(user, function (error,data) {
		if (error) {
			throw error;
		}else if (data.length == 0) {
			console.log("no existe");
			//problemas con render with other layout
			res.render('index', { title: 'ControlFid', layout: 'errorLayout.jade' , info: 'Usuario no existe'}); 
		}else{
			if (pass != data[0].password) {
				res.send("Password invalido");
				//render index with layout password mal
			}else{
				if (data[0].admin == 0) {
					console.log(hour+":"+min+":"+sec);
					res.redirect('/vistaProfesor?idProfesor='+data[0].id_profesor+'&time='+hour+':'+min+':'+sec);
				}else{
					//rediorect vistaAdmin
					res.send("VistaAdmin");
				}
				
			}
		}
	});
});

module.exports = router;
