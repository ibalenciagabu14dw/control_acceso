var express = require('express');
var router = express.Router();
var time = require('../../models/time');
var aula = require('../../models/aula')
var alumno = require('../../models/alumno');
var alumno_grupos = require('../../models/alumno_grupos');
var asignatura = require('../../models/asignatura');
var convalidadas = require('../../models/convalidadas');
var horario_grupo = require('../../models/horario_grupo');
var dispositivo = require('../../models/dispositivo');
var grupo = require('../../models/grupo');
var profesor = require('../../models/profesor');

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR horario_grupo
*/
router.post('/agregarHorarioGrupo', function(req, res, next) {
    grupo.buscarGrupoPorId(req.query.id_grupo,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('no hay grupo con ese id');
            }else{
                asignatura.buscarAsignaturaPorId(req.query.id_asignatura,function(error,row){
                    if(error){
                        res.send(error);
                    }else{
                        if(row.length==0){
                            res.send('no hay asignatura con ese id');
                        }else{
                            aula.buscarAulaPorId(req.query.id_aula,function(error,row){
                                if(error){
                                    res.send(error);
                                }else{
                                    if(row.length==0){
                                        res.send('no hay aula con ese id');
                                    }else{
                                        horario_grupo.agregarHorarioGrupo(req.query.dia_semana,req.query.hora_inicio,req.query.hora_final,req.query.id_grupo,req.query.id_asignatura,req.query.id_aula,function(error,row){
                                            if(error){
                                                res.send(error);
                                            }else{
                                                res.send('horario grupo agregado correctamente');
                                            }//else
                                        })//horario_grupo.agregarHorarioGrupo
                                    }//else
                                }//else
                            })//aula.buscarAulaPorId
                        }//else
                    }//ele
                })//asignatura.buscarAsignaturaPorId
            }//else
        }//else
    })//grupo.buscarGrupoPorId
});//router.post('/agregarHorarioGrupo

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE dispositivo OK
*/
router.post('/modificarHorarioGrupo', function(req, res, next) {
    console.log("1");
    var dia_semana_antiguo;
    var hora_inicio_antiguo;
    var hora_final_antiguo;
    var id_grupo_antiguo;
    var id_asignatura_antiguo;
    var id_aula_antiguo
    horario_grupo.buscarHorarioGrupoPorId(req.query.id_horario_grupo,function(error,row){
        console.log("1");
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('no hay horario grupo con ese id');
            }else{
                dia_semana_antiguo=row[0].dia_semana;
                hora_inicio_antiguo=row[0].hora_inicio;
                hora_final_antiguo=row[0].hora_final;
                id_grupo_antiguo=row[0].id_grupo;
                id_asignatura_antiguo=row[0].id_asignatura;
                id_aula_antiguo=row[0].id_aula;
                grupo.buscarGrupoPorId(req.query.id_grupo,function(error,row){
                    if(error){
                        res.send(error);
                    }else{
                        if(row.length==0){
                            res.send('no hay ningun grupo con ese id');
                        }else{
                            asignatura.buscarAsignaturaPorId(req.query.id_asignatura,function(error,row){
                                if(error){
                                    res.send(error);
                                }else{
                                    if(row.length==0){
                                        res.send('no hay asignaturas con ese id');
                                    }else{
                                        aula.buscarAulaPorId(req.query.id_aula,function(error,row){
                                            if(error){
                                                res.send(error);
                                            }else{
                                                if(row.length==0){
                                                    res.send('no hay aulas con ese id');
                                                }else{
                                                    horario_grupo.buscarHorarioGrupoExistente(req.query.dia_semana,req.query.hora_inicio,req.query.hora_final,req.query.id_grupo,req.query.id_asignatura,req.query.id_aula,function(error,row){
                                                        if(error){
                                                            res.send(error);
                                                        }else{
                                                            if((row.length>1)&&(req.query.id_horario_grupo!=row[0].id_horario_grupo)&&(dia_semana_antiguo==req.query.dia_semana)&&(hora_inicio_antiguo==req.query.hora_inicio)&&(hora_final_antiguo==req.query.hora_final)&&(id_grupo_antiguo==req.query.id_grupo)&&(id_asignatura_antiguo==req.query.id_asignatura)&&(id_aula_antiguo==req.query.id_aula)){
                                                                res.send('ese horario grupo ya existe');
                                                            }else{
                                                                horario_grupo.modificarHorarioGrupo(req.query.id_horario_grupo,req.query.dia_semana,req.query.hora_inicio,req.query.hora_final,req.query.id_grupo,req.query.id_asignatura,req.query.id_aula,function(error,row){
                                                                    if(error){
                                                                        res.send(error);
                                                                    }else{
                                                                        res.send('horario grupo modificado correctamente');
                                                                    }                                                 
                                                                })//horario_grupo.modificarHorarioGrupo
                                                            }//else
                                                        }//else
                                                    })//horario_grupo.buscarHorarioGrupoExistente
                                                }//else
                                            }//else
                                        })//aula.buscarAulaPorId
                                    }//else
                                }//else
                            })//asignatura.buscarAsignaturaPorId
                        }//else
                    }//else
                })//grupo.buscarGrupoPorId
            }//else
        }//else
    })//horario_grupo.buscarHorarioGrupoPorId
});//router.post('/modificarHorarioGrupo

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE dispositivo por numero_dispositivo OK
*/
router.post('/borrarHorarioGrupo', function(req, res, next) {
    horario_grupo.buscarHorarioGrupoPorId(req.query.id_horario_grupo, function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('Ese horario_grupo no existe');
            }else{
                horario_grupo.borrarHorarioGrupo(req.query.id_horario_grupo, function(error,row) {
                    if (error) {
                        throw error;
                        res.send('error borrando horario grupo');
                    }else{
                        res.send('horario grupo borrado correctamente');
                    }//else
                })//grupo.borrarHorarioGrupo
            }//else
        }//else
    })//grupo.buscarHorarioGrupoPorId
});//router.post('/borrarHorarioGrupo


/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
* BUSCAR horario grupo por id_horario_grupo OK
*/
router.post('/buscarHorarioGrupoPorId', function(req,res,next) {
    horario_grupo.buscarHorarioGrupoPorId(req.query.id_horario_grupo,function(error,row){
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('No hay horario grupo con ese id');
            }else{
                res.send(row);
            }//else
        }//else
    })//horario_grupo.buscarHorarioGrupoPorId    
});//router.post('/buscarHorarioGrupoPorId

/*
* BUSCAR horario grupo por nombre_grupo OK
*/
router.post('/buscarHorarioGrupoPorNombreGrupo', function(req,res,next) {
    grupo.buscarGrupoPorNombre(req.query.nombre_grupo, function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('No hay grupo con ese nombre');
            }else{
                horario_grupo.buscarHorarioGrupoPorNombre(req.query.nombre_grupo,function(error,row){
                    if(error){
                        res.send(error);
                    }else{
                        if(row.length==0){
                            res.send('ese grupo no tiene un horario');
                        }else{
                            res.send(row);
                        }
                    }//else
                })//horario_grupo.buscarHorarioGrupoPorNombre
            }//else
        }//else
    })//grupo.buscarGrupoPorNombre
});//router.post('/buscarHorarioGrupoPorNombreGrupo

/*
* BUSCAR todos los id_aula OK
*/
router.post('/buscarTodosLosHorarioGrupo', function(req,res,next) {
    horario_grupo.buscarTodosLosHorarioGrupo(function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('no hay grupos');
            }
            res.send(row);
        }//else
    })//horario_grupo.buscarTodosLosHorarioGrupo
});//router.post('/buscarTodosLosHorarioGrupo

/*
* BUSCAR todos los id_horariogrupo OK
*/
router.post('/buscarTodosLosIdHorarioGrupo', function(req,res,next) {
    horario_grupo.buscarTodosLosIdHorarioGrupo(function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('no hay grupos');
            }
            res.send(row);
        }//else
    })//horario_grupo.buscarTodosLosIdHorarioGrupo
});//router.post('/buscarTodosLosIdHorarioGrupo

/*
* BUSCAR grupos a los que no pertenece un alumno
*/
router.post('/buscarGruposQueNoPerteneceUnAlumno', function(req,res,next) {
    alumno.buscarAlumnoPorId(req.query.id_alumno,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('ese alumno no existe');
            }else{
                grupo.buscarGruposQueNoPerteneceUnAlumno(req.query.id_alumno, function(error,row) {
                    if (error) {
                        res.send(error);
                        throw error;
                    }else{
                        if(row.length==0){
                            res.send('Ese alumno esta asociado a todos los grupos');
                        }else{
                            res.send(row);
                        }//else
                    }//else
                })//grupo.buscarGruposQueNoPerteneceUnAlumno
            }//else
        }//else
    })//alumno.buscarAlumnoPorId
});//router.post('/buscarGruposQueNoPerteneceUnAlumno

/*
* BUSCAR grupos a los que no pertenece un alumno
*/
router.post('/buscarGruposQuePerteneceUnAlumno', function(req,res,next) {
    alumno.buscarAlumnoPorId(req.query.id_alumno,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('ese alumno no existe');
            }else{
                grupo.buscarGruposQuePerteneceUnAlumno(req.query.id_alumno, function(error,row) {
                    if (error) {
                        res.send(error);
                        throw error;
                    }else{
                        if(row.length==0){
                            res.send('Ese alumno no esta asociado a ningun grupo');
                        }else{
                            res.send(row);
                        }//else
                    }//else
                })//grupo.buscarGruposQuePerteneceUnAlumno
            }//else
        }//else
    })//alumno.buscarAlumnoPorId
});//router.post('/buscarGruposQuePerteneceUnAlumno

/*
* BUSCAR asignaturas de un grupo
*/
router.post('/buscarAsignaturasDeUnGrupo', function(req,res,next) {
    grupo.buscarGrupoPorId(req.query.id_grupo,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('ese grupo no existe');
            }else{
                grupo.buscarAsignaturasDeUnGrupo(req.query.id_grupo, function(error,row) {
                    if (error) {
                        res.send(error);
                        throw error;
                    }else{
                        if(row.length==0){
                            res.send('Ese grupo no tiene asignaturas');
                        }else{
                            res.send(row);
                        }//else
                    }//else
                })//grupo.buscarAsignaturasDeUnGrupo
            }//else
        }//else
    })//grupo.buscarGrupoPorId
});//router.post('/buscarAsignaturasDeUnGrupo

/****************************************************************************************************************************/

module.exports = router;