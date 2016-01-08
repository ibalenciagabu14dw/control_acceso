var express = require('express');
var router = express.Router();
var profesor = require('../models/profesor');

/* GET home page. */
router.get('/', function(req, res, next) {
	var curr_time;
	if (req.query.time == undefined) {
		time.horaActual(function (error,data) {
			if (error) {
				throw error;
			}else{
				curr_time = data;
				console.log(curr_time);
			}
		});
	}else{
		curr_time = req.query.time;
	}
  profesor.losAlumnosDeSuClaseActual(req.query.idProfesor,curr_time,function (error,nombreArray,apellidosArray,fotoArray){
									if (error) {
										console.log("Fallo");
										throw error;
									}else{
										//console.log(data);
										//res.send(data);
										res.render("vistaProfesor",{ 
										title : "vistaProfesor", 
										//info: JSON.stringify(data)
										nombre: nombreArray,
										apellidos: apellidosArray,
										foto: fotoArray,
									});

									}//else error
								});
});

module.exports = router;