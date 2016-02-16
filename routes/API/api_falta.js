var express = require('express');
var router = express.Router();
var time = require('../../models/time');
var aula = require('../../models/aula')
var alumno = require('../../models/alumno');
var alumno_grupos = require('../../models/alumno_grupos');
var asignatura = require('../../models/asignatura');
var convalidadas = require('../../models/convalidadas'); 
var falta = require('../../models/falta');
var horario_grupo = require('../../models/horario_grupo');
var profesor = require('../../models/profesor');

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR falta OK
*/
router.post('/agregarFalta', function(req, res, next) {
    alumno.buscarAlumnoPorIdSinFoto(req.query.id_alumno, function(error,row){
    	if(error){
    		res.send(error);
    	}else{
    		if(row.length==0){
    			res.send('ese alumno no existe');
    		}else{
    			horario_grupo.buscarHorarioGrupoPorId(req.query.id_horario_grupo,function(error,row){
    				if(error){
    					res.send(error);
    				}else{
    					if(row.length==0){
    						res.send('ese horario grupo no existe');
    					}else{
    						falta.buscarFaltaPorFechaYIdAlumnoYIdHorarioGrupo(req.query.fecha,req.query.id_alumno,req.query.id_horario_grupo,function(error,row){
    							if(error){
    								res.send(error);
    							}else{
    								if(row.length>0){
    									res.send('ese alumno ya tiene esa falta puesta en esa fecha');
    								}else{
    									console.log(req.query.fecha);
    									console.log(req.query.id_alumno);
    									console.log(req.query.id_horario_grupo);
    									console.log(req.query.observaciones);
    									falta.agregarFalta(req.query.fecha,req.query.id_alumno,req.query.id_horario_grupo,req.query.observaciones,function(error,row){
    										if(error){
    											res.send('error agregando falta');
    										}else{
    											res.send('falta agregada correctamente');
    										}//else
    									})//falta.agregarFalta
    								}//else
    							}//else
    						})//falta.buscarFaltaPorIdAlumnoYIdHorarioGrupo
    					}//else
    				}//else
    			})//horario_grupo.buscarHorarioGrupoPorId
    		}//else
    	}//else
    })//alumno.buscarAlumnoPorIdSinFoto
});//router.post('/agregarAula

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE falta OK
*/
router.post('/modificarFalta', function(req, res, next) {
    var id_alumno_antiguo;
    var id_horario_grupo_antiguo;
    falta.buscarFaltaPorId(req.query.id_falta,function(error,row){
    	if(error){
    		res.send('error');
    	}else{
    		if(row.length==0){
    			res.send('esa falta no existe');
    		}else{
    			id_alumno_antiguo=row[0].id_alumno;
    			id_horario_grupo_antiguo=row[0].id_horario_grupo;
    			alumno.buscarAlumnoPorIdSinFoto(req.query.id_alumno, function(error,row){
    				if(error){
    					res.send(error);
    				}else{
    					if(row.length==0){
    						res.send('ese alumno no existe');
    					}else{
    						horario_grupo.buscarHorarioGrupoPorId(req.query.id_horario_grupo,function(error,row){
    							if(error){
    								res.send(error);
    							}else{
    								if(row.length==0){
    									res.send('ese horario grupo no existe');
    								}else{
    									falta.buscarFaltaPorFechaYIdAlumnoYIdHorarioGrupo(req.query.fecha,req.query.id_alumno,req.query.id_horario_grupo,function(error,row){
    										if(error){
    											res.send(error);
    										}else{
    											if((row.length>0)&&(id_alumno_antiguo!=req.query.id_alumno)&&(id_horario_grupo_antiguo!=req.query.id_horario_grupo)){
    												res.send('ese alumno ya tiene esa falta puesta en esa fecha');
    											}else{
    												falta.modificarFalta(req.query.id_falta,req.query.fecha,req.query.id_alumno,req.query.id_horario_grupo,req.query.observaciones,function(error,row){
    													if(error){
    														res.send('error modificando falta');
    													}else{
    														res.send('falta modificada correctamente');
    													}//else
    												})//falta.modificarFalta
    											}//else
    										}//else
    									})//falta.buscarFaltaPorIdAlumnoYIdHorarioGrupo
    								}//else
    							}//else
    						})//horario_grupo.buscarHorarioGrupoPorId
    					}//else
    				}//else
    			})//alumno.buscarAlumnoPorIdSinFoto
    		}//else
    	}//else
    })//falta.buscarFaltaPorId
});//router.post('/agregarAula

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/



/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/



/****************************************************************************************************************************/

module.exports = router;