var express = require('express');
var router = express.Router();
var profesor = require('../models/profesor');

/* GET home page. */
router.get('/', function(req, res, next) {
  profesor.losAlumnosDeSuClaseActual(req.query.idProfesor,req.query.time,function (error,nombreArray,apellidosArray,fotoArray){
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