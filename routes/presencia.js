var express = require('express');
var router = express.Router();
var alumno = require('../models/alumno');

router.get('/', function(req, res, next) {
	alumno.buscarAlumnoPorTarjeta(req.query.idT,function(error, data)
			{
				//si existe el usuario mostramos el formulario
				if (typeof data !== 'undefined' && data.length > 0)
				{
					res.send(data[0].presencia);
					//res.status(200).json(data);
				}
				//en otro caso mostramos un error
				else
				{
					res.status(404).json({"msg":"notExist"});
					
				}
			});
  //res.send(req.query.idT+"<br/>"+req.query.time+"<br/>"+req.query.room);
});

module.exports = router;