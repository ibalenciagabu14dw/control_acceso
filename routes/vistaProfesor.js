var express = require('express');
var router = express.Router();
var profesor = require('../models/profesor');

/* GET home page. */
router.get('/', function(req, res, next) {
  profesor.losAlumnosDeSuClaseActual(req.query.idProfesor,req.query.time,function (error,data){
									if (error) {
										console.log("Fallo");
										throw error;
									}else{
										console.log(data);
										//res.send(data);
										res.render("vistaProfesor",{ 
										title : "vistaProfesor", 
										//info: JSON.stringify(data)
										info: data
									});

									}//else error
								});
});

module.exports = router;