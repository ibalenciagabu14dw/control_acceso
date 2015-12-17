var express = require('express');
var router = express.Router();
var alumno = require('../models/alumno');
var profesor = require('../models/profesor');

router.get('/', function(req, res, next) {

	alumno.buscarAlumnoPorTarjeta(req.query.idT,function (error,data) {
		if (data.length != 0) {
			if (data[0].tarjetaActivada == 0) {
<<<<<<< HEAD
				console.log("Tarjeta no activada");
				res.send("ko");
			}else{
				alumno.aulaEnLaQueTieneQueEstar(req.query.idT,req.query.time,function (error,data) {
					if (data.length != 0) {
						if (error) {
							throw error;
						}else{
							if (req.query.room == data[0].id_aula) {
								alumno.updatePresenciaAlumno(req.query.idT,function (error) {
									if (error) {
										res.send("ko");
										console.log("Fallo update presencia alumno");
										throw error;
									}else{
										console.log("Update alumno ok");
										res.send("ok");
									}//else error
								});//UpdatePresenciaAlumno
							}else{
								console.log("No esta en el aula que debe");
								res.send("ko");
							}
						}//else error
					}else{
						console.log("No hay aula asociada");
						res.send("ko");
					}//else data length 0
				});//aulaEnLaQueTieneQueEstar
			}//else tarjetaActivada
		}else{//else no es alumno
			profesor.buscarProfesorPorTarjeta(req.query.idT,function (error,data) {
				if (data.length != 0) {
					if (data[0].tarjetaActivada == 0) {
						res.send("ko");
					}else{
						profesor.aulaEnLaQueTieneQueEstar(req.query.idT,req.query.time,function (error,data) {
							if (data.length != 0) {
								if (error) {
									throw error;
								}else{
									if (req.query.room == data[0].id_aula) {
										profesor.updatePresenciaProfesor(req.query.idT,function (error) {
											if (error) {
												res.send("ko");
												console.log("Fallo update presencia profesor");
												throw error;
											}else{
												console.log("Update presencia profesor ok");
												res.send("ok");
											}//else error
										});//updatePresenciaProfesor
									}else{
										console.log("No esta en el aula que debe");
										res.send("ko");
									}
								}// else error
							}else{
								console.log("No hay aula asociada");
								res.send("ko");
							}//else data.length 0
						});//aulaEnLaQueTieneQueEstar
					}//else TarjetaActivada
				}else{
					console.log("No hay datos de persona asociados");
					res.send("ko");
				}//else data.length 0		
			});//buscarProfesor
		}//else if data.length 0 alumno	
	});//buscarAlumno
=======
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
		//else no es alumno
		}else{
			profesor.buscarProfesorPorTarjeta(req.query.idT,function (error,data) {
				if (data[0].tarjetaActivada == 0) {
					res.send("ko");
				}else{
					profesor.aulaEnLaQueTieneQueEstar(req.query.idT,req.query.time,function (error,data) {
						if (error) {
							throw error;
						}else{
							if (req.query.room == data[0].id_aula) {
								profesor.updatePresenciaProfesor(req.query.idT,function (error) {
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
						}// else error
					});//aulaEnLaQueTieneQueEstar
				}//else TarjetaActivada
			});//buscarProfesor
		}

		
	});//buscarAlumno

>>>>>>> 170cda0e6c356e5193f5f650cf77f3a55e3cdf08
});//router

module.exports = router;