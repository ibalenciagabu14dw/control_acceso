var express = require('express');
var router = express.Router();
var alumno = require('../models/alumno');
var grupo = require('../models/grupo');
var aula = require('../models/aula');

router.get('/', function(req, res, next) {

	var encontrado = false;
	var presencia,tarjetaActivada,id,grupoAlumno,aulaGrupo;

	alumno.buscarAlumnoPorTarjeta(req.query.idT,function(error, data){
		if (error == null) {
			if (typeof data !== 'undefined' && data.length > 0){
				encontrado = true;
				id = data[0].id_alumno;
				presencia = data[0].presencia;
				tarjetaActivada = data[0].tarjetaActivada;
				//res.send(id+" "+presencia+" "+tarjetaActivada);
				//res.status(200).json(data[0].presencia);

				grupo.buscarGrupoPorAlumno(id, function (error,data) {
					if (error == null) {
						grupoAlumno = data[0].id_grupo;
						//res.send("Grupo: "+grupoAlumno);
					}else{
						res.send("Error "+error);
					}
				});

				aula.buscarAulaPorGrupo(grupoAlumno,req.query.time, function (error,data) {
					if (error == null) {
						//aula = data[0].id_aula;
						res.send("Datos:"+data);
					}else{
						res.send("Error "+error);
					}
				});
			}//else{
				//res.status(404).json({"msg":"notExist"});			
				//res.send("ko");
			//}
		}else{
			res.send("Error "+error);
		}
		
	});
  //res.send(req.query.idT+"<br/>"+req.query.time+"<br/>"+req.query.room);
});

module.exports = router;