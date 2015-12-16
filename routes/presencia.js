var express = require('express');
var router = express.Router();
var alumno = require('../models/alumno');
var profesor = require('../models/profesor');

router.get('/', function(req, res, next) {

	alumno.buscarAlumnoPorTarjeta(req.query.idT,function (error,data) {

		if (data[0].tarjetaActivada == 0) {
			res.send("ko");
		}else{
			alumno.aulaEnLaQueTieneQueEstar(req.query.idT,req.query.time,function (error,data) {
				if (error) {
					throw error;
				}else{
					if (req.query.room == data[0].id_aula) {
						alumno.updatePresenciaAlumno(req.query.idT,function (error) {
							if (error) {
								throw error;
								res.send("ko");
							}else{
								res.send("ok");
							}
						});
					}else{
						res.send("ko");
					}
				}//else error
			});//aulaEnLaQueTieneQueEstar
		}//else tarjetaActivada
	});//buscarAlumno

});//router

module.exports = router;