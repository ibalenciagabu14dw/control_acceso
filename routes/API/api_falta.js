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
});//router.post('/agregarFalta

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE falta OK
*/
router.post('/modificarFalta', function(req, res, next) {
    var id_alumno_antiguo;
    var id_horario_grupo_antiguo;
    falta.buscarFaltaPorId(req.query.id_faltas,function(error,row){
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
    									falta.buscarFaltaPorIdAlumnoYIdHorarioGrupo(req.query.id_alumno,req.query.id_horario_grupo,function(error,row){
    										if(error){
    											res.send(error);
    										}else{
                                                if((row.length>0)&&(id_alumno_antiguo==row[0].id_alumno)&&(id_horario_grupo_antiguo!=row[0].id_horario_grupo)){
                                                    res.send('ese alumno ya tiene una falta a esa hora');
    											}else{
    												falta.modificarFalta(req.query.id_faltas,req.query.fecha,req.query.id_alumno,req.query.id_horario_grupo,req.query.observaciones,function(error,row){
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
});//router.post('/modificarFalta

/*
* UPDATE presencia a 0 a todos los alumnos y profesores
*/
router.post('/modificarPresencia0ATodos', function(req, res, next) {
    falta.modificarPresencia0ATodos(function(error,row){
        if(error){
            res.send(error);
        }else{
            res.send('presencia actualizada a 0');
        }//else
    })//falta.modificarPresencia0ATodos
});//router.post('/modificarPresencia0ATodos

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE falta por id_faltas OK
*/
router.post('/borrarFalta', function(req, res, next) {
    falta.buscarFaltaPorId(req.query.id_faltas, function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('Ese id_faltas no existe');
            }else{
                falta.borrarFalta(req.query.id_faltas, function(error,row) {
                    if (error) {
                        throw error;
                        res.send('error borrando falta');
                    }else{
                        res.send('falta borrada correctamente');
                    }//else
                })//falta.borrarFalta
            }//else
        }//else
    })//falta.buscarAulaPorId
});//router.post('/borrarFalta

/*
* DELETE tabla faltas OK
*/
router.post('/borrarTablaFaltas', function(req, res, next) {
    falta.borrarTablaFaltas(function(error,row) {
        if (error) {
            throw error;
            res.send('error borrando tabla faltas');
        }else{
            res.send('tabla faltas vaciada correctamente');
        }//else
    })//falta.borrarTablaFaltas
});//router.post('/borrarTablaFaltas

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
* BUSCAR todas las faltas
*/
router.post('/buscarDatosDeLasFaltasDelDia', function(req,res,next) {
    falta.buscarDatosDeLasFaltasDelDia(function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('Lista de faltas vacia');
            }
            res.send(row);
        }//else
    })//falta.buscarDatosDeLasFaltasDelDia
});//router.post('/buscarDatosDeLasFaltasDelDia

/*
* BUSCAR todas los id_faltas
*/
router.post('/buscarTodosLosIdFalta', function(req,res,next) {
    falta.buscarTodosLosIdFalta(function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('Lista de faltas vacia');
            }
            res.send(row);
        }//else
    })//falta.buscarTodosLosIdFalta
});//router.post('/buscarTodosLosIdFalta

/*
*   BUSCAR faltas de alumnos no convalidados OK
*/
router.post('/buscarFaltasDeAlumnosNoConvalidados', function(req,res,next) {
    falta.buscarFaltasDeAlumnosNoConvalidados(req.query.dia_semana,req.query.hora,function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('No hay faltas con ese dia y hora');
            }else{
                res.send(row);
            }//else
        }//else
    })//falta.buscarFaltasDeAlumnosNoConvalidados
});//router.post('/buscarFaltasDeAlumnosNoConvalidados

/*
*   Buscar datos del alumno por id_alumno e id_horario_grupo OK
*/
router.post('/buscarDatosFaltaAlumno', function(req,res,next) {
    alumno.buscarAlumnoPorIdSinFoto(req.query.id_alumno, function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('ese id_alumno no existe');
            }else{
                horario_grupo.buscarHorarioGrupoPorId(req.query.id_horario_grupo,function(error,row){
                    if(error){
                        res.send(error);
                    }else{
                        if(row.length==0){
                            res.send('ese id_horario_grupo no existe');
                        }else{
                            falta.buscarDatosFaltaAlumno(req.query.id_alumno,req.query.id_horario_grupo,function(error,row) {
                                if (error) {
                                    res.send(error);
                                    throw error;
                                }else{
                                    if(row.length==0){
                                        res.send('el alumno no tiene falta a esa hora');
                                    }else{
                                        res.send(row);
                                    }//else
                                }//else
                            })//falta.buscarDatosFaltaAlumno
                        }//else
                    }//else
                })//horario_grupo.buscarHorarioGrupoPorId
            }//else
        }//else
    })//alumno.buscarAlumnoPorIdSinFoto
});//router.post('/buscarDatosFaltaAlumno

/*
*   BUSCAR faltas por nombre del alumno OK
*/
router.post('/buscarFaltaPorNombreAlumno', function(req,res,next) {
    alumno.buscarAlumnoPorNombreSinFoto(req.query.nombre,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('no hay alumnos con ese nombre');
            }else{
                falta.buscarFaltaPorNombreAlumnoSinFoto(req.query.nombre,function(error,row){
                    if(error){
                        res.send(error);
                    }else{
                        res.send(row);
                    }
                })//falta.buscarFaltaPorNombreAlumnoSinFoto
            }//else
        }//else
    })//alumno.buscarAlumnoPorNombreSinFoto
})//router.post('/buscarFaltaPorNombreAlumno

/*
*   BUSCAR falta por id_faltas OK
*/
router.post('/buscarFaltaPorId', function(req,res,next) {
    falta.buscarFaltaPorId(req.query.id_faltas,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('no hay faltas con ese id_falta');
            }else{
                res.send(row);
            }//else
        }//else
    })//falta.buscarFaltaPorId
})//router.post('/buscarFaltaPorId
/****************************************************************************************************************************/

module.exports = router;