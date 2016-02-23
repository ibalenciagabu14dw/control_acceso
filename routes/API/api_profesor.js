var express = require('express');
var router = express.Router();
var time = require('../../models/time');
var alumno = require('../../models/alumno');
var alumno_grupos = require('../../models/alumno_grupos');
var aula = require('../../models/aula');
var asignatura = require('../../models/asignatura');
var convalidadas = require('../../models/convalidadas');
var profesor = require('../../models/profesor');

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR profesor OK
*/
router.post('/agregarProfesor', function(req, res, next) {
	alumno.buscarAlumnoPorDni(req.query.dni, function(error,row) {
        if (error) {
            res.send('error conectando con la base de datos');
            throw error;
        }else{
            if(row.length>0){
                res.send('ese DNI lo tiene un alumno');
            }else {
                profesor.buscarProfesorPorDni(req.query.dni, function(error,row) {
                    if (error) {
                        res.send('error conectando con la base de datos');
                        throw error;
                    }else{
                        if(row.length>0){
                            res.send('ese DNI lo tiene un profesor');
                        }else {
                			alumno.buscarAlumnoPorCorreo(req.query.correo, function(error,row){
                    			if (error) {
                        			res.send('error conectando con la base de datos');
                        			throw error;
                    			}else {
                        			if(row.length>0){
                            			res.send('ese correo lo tiene un alumno');
                        			}else {
                            			profesor.buscarProfesorPorCorreo(req.query.correo, function(error,row){
                                            if (error) {
                                                res.send('error conectando con la base de datos');
                                                throw error;
                                            }else {
                                                if(row.length>0){
                                                    res.send('ese correo lo tiene un profesor');
                                                }else {
						                            alumno.buscarAlumnoPorTarjeta(req.query.num_tarjeta, function(error,row){
						                                if (error) {
						                                    res.send('error conectando con la base de datos');
						                                    throw error; 
						                                }else {
						                                    if(row.length>0){
						                                        res.send('ese numero de tarjeta lo tiene un alumno');
						                                    }else {
                                                                profesor.buscarProfesorPorTarjeta(req.query.num_tarjeta, function(error,row){
                                                                    if (error) {
                                                                        res.send('error conectando con la base de datos');
                                                                        throw error; 
                                                                    }else {
                                                                        if(row.length>0){
                                                                            res.send('ese numero de tarjeta lo tiene un profesor');
                                                                        }else {
                                                                            profesor.agregarProfesorSinFoto(req.query.dni,req.query.nombre,req.query.apellidos,req.query.correo,req.query.password,req.query.num_tarjeta, function(error,row){
                                                                                if (error) {
                                                                                    throw error;
                                                                                    res.send('Error al agregar profesor');
                                                                                }else {
                                                                                    res.send('profesor agregado correctamente');
                                                                                }//else
                                                                            })//profesor.agregarProfesorSinFoto
                                                                        }//else
                                                                    }//else
                                                                })//profesor.buscarProfesorPorTarjeta
                                                            }//else
                                                        }//else
                                                    })//alumno.buscarAlumnoPorTarjeta
                                                }//else
                                            }//else
                                        })//profesor.buscarProfesorPorCorreo
                                    }//else
                                }//else
                            })//alumno.buscarAlumnoPorCorreo
                        }//else
                    }//else
                })//profesor.buscarProfesorPorDni
            }//else
        }//else
    })//alumno.buscarAlumnoPorDni
});//router.post('/agregarProfesor

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE profesor OK
*/
router.post('/modificarProfesor', function(req, res, next) {
    var dni_antiguo;
    var correo_antiguo;
    var num_tarjeta_antiguo;

    profesor.buscarProfesorPorIdSinFoto(req.query.id_profesor, function(error,row) {
        if (error) {
            res.send('error conectando con la base de datos');
            throw error;
        }else{
            dni_antiguo = row[0].dni;
            correo_antiguo = row[0].correo;
            num_tarjeta_antiguo = row[0].num_tarjeta;
        }
    })//profesor.buscarProfesorPorIdSinFoto

    alumno.buscarAlumnoPorDni(req.query.dni, function(error,row) {
        if (error) {
            res.send('error conectando con la base de datos');
            throw error;
        }else{
            if((row.length>0)&&(req.query.dni!=dni_antiguo)){
                res.send('ese DNI lo tiene un alumno');
            }else {
                profesor.buscarProfesorPorDni(req.query.dni, function(error,row) {
                    if (error) {
                        res.send('error conectando con la base de datos');
                        throw error;
                    }else{
                        if((row.length>0)&&(req.query.dni!=dni_antiguo)){
                            res.send('ese DNI lo tiene un profesor');
                        }else {
			                alumno.buscarAlumnoPorCorreo(req.query.correo, function(error,row){
			                    if (error) {
			                        res.send('error conectando con la base de datos');
			                        throw error;
			                    }else {
			                        if((row.length>0)&&(req.query.correo!=correo_antiguo)){
			                            res.send('ese correo lo tiene un alumno');
			                        }else{
                            			profesor.buscarProfesorPorCorreo(req.query.correo, function(error,row){
                                            if (error) {
                                                res.send('error conectando con la base de datos');
                                                throw error;
                                            }else{
                                                if((row.length>0)&&(req.query.correo!=correo_antiguo)){
                                                    res.send('ese correo lo tiene un profesor');
                                                }else{
                                                	alumno.buscarAlumnoPorTarjeta(req.query.num_tarjeta, function(error,row){
	                    								if(error){
						                                    res.send('error conectando con la base de datos');
						                                    throw error; 
	                                					}else {
						                                    if((row.length>0)&&(req.query.num_tarjeta!=num_tarjeta_antiguo)){
						                                        res.send('ese numero de tarjeta lo tiene un alumno');
						                                    }else{
	                                                            profesor.buscarProfesorPorTarjeta(req.query.num_tarjeta, function(error,row){
	                                                                if(error){
	                                                                    res.send('error conectando con la base de datos');
	                                                                    throw error; 
	                                                                }else{
	                                                                    if((row.length>0)&&(req.query.num_tarjeta!=num_tarjeta_antiguo)){
	                                                                        res.send('ese numero de tarjeta lo tiene un profesor');
	                                                                    }else{
	                                                                        profesor.modificarProfesorSinFoto(req.query.id_profesor,req.query.dni,req.query.nombre,req.query.apellidos,req.query.correo,req.query.password,req.query.tarjeta_activada,req.query.num_tarjeta,req.query.admin, function(error,row){
	                                                                            if (error) {
	                                                                                throw error;
	                                                                            }else {
	                                                                                res.send('profesor modificado correctamente');
                                                                                }//else
                                                                            })//profesor.modificarProfesorSinFoto
                                                                        }//else
                                                                    }//else
                                                                })//profesor.buscarProfesorPorTarjeta
                                                            }//else
                                                        }//else
                                                    })//alumno.buscarAlumnoPorTarjeta
                                                }//else
                                            }//else
                                        })//profesor.buscarProfesorPorCorreo
                                    }//else
                                }//else
                            })//alumno.buscarAlumnoPorCorreo
                        }//else
                    }//else
                })//profesor.buscarProfesorPorDni
            }//else
        }//else
    })//alumno.buscarAlumnoPorDni
});//router.post('/modificarProfesor

/*
* UPDATE presencia del profesor por numero de tarjeta OK
*/
router.post('/modificarPresenciaProfesor', function(req, res, next) {
    profesor.buscarProfesorPorTarjeta(req.query.num_tarjeta,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('no hay profesor con ese numero de tarjeta');
            }else{
                profesor.modificarPresenciaProfesor(req.query.num_tarjeta,function(error,row){
                    if(error){
                        res.send(error);
                    }else{
                        res.send('presencia modificada correctamente');
                    }//else
                })//profesor.modificarPresenciaProfesor
            }//else
        }//else
    })//profesor.buscarProfesorPorTarjeta
});//router.post('/modificarPresenciaProfesor

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE profesor por id_profesor OK
*/
router.post('/borrarProfesor', function(req, res, next) {
    profesor.buscarProfesorPorIdSinFoto(req.query.id_profesor, function(error,row) {
        if (error) {
            res.send('error conectando con la base de datos');
            throw error;
        }else{
            if(row.length==0){
                res.send('Ese id no existe');
            }else{
                profesor.borrarProfesor(req.query.id_profesor, function(error,row) {
                    if (error) {
                        throw error;
                        res.send('error borrando profesor');
                    }else{
                        res.send('profesor borrado correctamente');
                    }//else
                })//profesor.borrarProfesor
            }//else
        }//else
    })//profesor.buscarProfesorPorIdSinFoto
});//router.post('/borrarProfesor


/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
* BUSCAR todos los id_profesor, nombre y apellidos
*/
router.post('/mostrarTodosLosIdNombreApellidosProfesor', function(req, res, next) {
    profesor.mostrarTodosLosIdNombreApellidosProfesor(function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('no hay profesores');
            }else{
                res.send(row);
            }//else
        }//else
    })//profesor.mostrarTodosLosIdNombreApellidosProfesor
});//router.post('/mostrarTodosLosIdNombreApellidosProfesor

/*
* BUSCAR todos los id_profesor
*/
router.post('/buscarTodosLosIdProfesor', function(req, res, next) {
    profesor.buscarTodosLosIdProfesor(function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('no hay profesores');
            }else{
                res.send(row);
            }//else
        }//else
    })//profesor.buscarTodosLosIdProfesor
});//router.post('/buscarTodosLosIdProfesor

/*
* BUSCAR profesor por id_profesor
*/
router.post('/buscarProfesorPorId',function(req,res,next){
    profesor.buscarProfesorPorIdSinFoto(req.query.id_profesor,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('no hay profesores con ese id');
            }else{
                res.send(row);
            }//else
        }//else
    })//profesor.buscarProfesorPorIdSinFoto
})//router.post('/buscarProfesorPorId

/*
* BUSCAR profesor por dni
*/
router.post('/buscarProfesorPorDni',function(req,res,next){
    profesor.buscarProfesorPorDniSinFoto(req.query.dni,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('no hay profesores con ese dni');
            }else{
                res.send(row);
            }//else
        }//else
    })//profesor.buscarProfesorPorDniSinFoto
})//router.post('/buscarProfesorPorDni

/*
* BUSCAR profesor por nombre y apellido
*/
router.post('/buscarProfesorPorNombreYApellido',function(req,res,next){
    profesor.buscarProfesorPorNombreYApellidosinFoto(req.query.nombre,req.query.apellidos,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('no hay profesores con esos nombre y apellidos');
            }else{
                res.send(row);
            }//else
        }//else
    })//profesor.buscarProfesorPorNombreYApellidosinFoto
})//router.post('/buscarProfesorPorNombreYApellido

/*
* BUSCAR profesor por correo
*/
router.post('/buscarProfesorPorCorreo',function(req,res,next){
    profesor.buscarProfesorPorCorreoSinFoto(req.query.correo,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('no hay profesores con ese correo');
            }else{
                res.send(row);
            }//else
        }//else
    })//profesor.buscarProfesorPorCorreoSinFoto
})//router.post('/buscarProfesorPorCorreo

/*
* BUSCAR profesor por num_tarjeta
*/
router.post('/buscarProfesorPorTarjeta',function(req,res,next){
    profesor.buscarProfesorPorTarjeta(req.query.num_tarjeta,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('no hay profesores con esa tarjeta');
            }else{
                res.send(row);
            }//else
        }//else
    })//profesor.buscarProfesorPorTarjeta
})//router.post('/buscarProfesorPorTarjeta

/*
* BUSCAR el estado de la presencia del profesor por num_tarjeta
*/
router.post('/buscarPresenciaProfesor',function(req,res,next){
    profesor.buscarPresenciaProfesor(req.query.num_tarjeta,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('no hay profesores con esa tarjeta');
            }else{
                res.send(row);
            }//else
        }//else
    })//profesor.buscarPresenciaProfesor
})//router.post('/buscarPresenciaProfesor

/*
* BUSCAR el aula en la que tiene que estar un profesor por num_tarjeta OK
*/
router.post('/buscarProfesorAulaEnLaQueTieneQueEstarPorTarjeta', function(req,res,next) {
    console.log("num_tarjeta");
    var curr_time;
    time.horaActual(function(error,data){
        if (error){
            console.log(error);
            throw error;
        }else{
            curr_time=data;         
        }//else
    });//time.horaActual
    
    profesor.buscarProfesorPorTarjeta(req.query.num_tarjeta,function(error,row) {
        if(error){
            throw error;
        }else{
            if(row.length==0){
                res.send('Ese numero de tarjeta no existe');
            }else{
                profesor.buscarAulaEnLaQueTieneQueEstarPorTarjeta(req.query.num_tarjeta,curr_time,function(error,row) {
                    if (error) {
                        throw error;
                    }else{
                        if(row.length==0){
                            res.send('el profesor no tiene que estar en ninguna aula');
                        }else{
                            res.send(row);
                        }//else
                    }//else
                })//profesor.buscarAulaEnLaQueTieneQueEstarPorTarjeta
            }//else
        }//else
    })//profesor.buscarProfesorPorTarjeta
});//router.post('/buscarProfesorAulaEnLaQueTieneQueEstarPorTarjeta

/*
* BUSCAR el aula en la que tiene que estar un alumno por id_profesor OK
*/
router.post('/buscarProfesorAulaEnLaQueTieneQueEstarPorId', function(req,res,next) {
    var curr_time;
    time.horaActual(function(error,data){
        if (error){
            console.log(error);
            throw error;
        }else{
            curr_time=data;         
        }//else
    });//time.horaActual
    
    profesor.buscarProfesorPorIdSinFoto(req.query.id_profesor,function(error,row) {
        if (error) {
            throw error;
        }else{
            if(row.length==0){
                res.send('Ese id_profesor no existe');
            }else{
                profesor.buscarAulaEnLaQueTieneQueEstarPorId(req.query.id_profesor,curr_time,function(error,row) {
                    if (error) {
                        throw error;
                    }else{
                        if(row.length==0){
                            res.send('el profesor no tiene que estar en ninguna aula');
                        }else{
                            res.send(row);
                        }//else
                    }//else
                })//profesor.buscarAulaEnLaQueTieneQueEstarPorId
            }//else
        }//else
    })//profesor.buscarProfesorPorIdSinFoto
});//router.post('/buscarProfesorAulaEnLaQueTieneQueEstarPorId

/*
* BUSCAR los alumnos que deben estar en su clase en ese momento
*/
router.post('/buscarLosAlumnosDeSuClaseActual', function(req,res,next) {
    var curr_time;
    time.horaActual(function(error,data){
        if (error){
            console.log(error);
            throw error;
        }else{
            curr_time=data;         
        }//else
    });//time.horaActual
    
    profesor.buscarProfesorPorIdSinFoto(req.query.id_profesor,function(error,row) {
        if (error) {
            throw error;
        }else{
            if(row.length==0){
                res.send('Ese id_profesor no existe');
            }else{
                profesor.buscarLosAlumnosDeSuClaseActualSinFoto(req.query.id_profesor,curr_time,function(error,row) {
                    if (error) {
                        throw error;
                    }else{
                        if(row.length==0){
                            res.send('el profesor no tiene alumnos en este momento');
                        }else{
                            console.log(row);
                            res.send(row);
                        }//else
                    }//else
                })//profesor.buscarLosAlumnosDeSuClaseActualSinFoto
            }//else
        }//else
    })//profesor.buscarProfesorPorIdSinFoto
});//router.post('/buscarLosAlumnosDeSuClaseActual

/*
* BUSCAR horario profesor por correo
*/
router.post('/buscarHorarioProfesorPorCorreo',function(req,res,next){
    profesor.buscarProfesorPorCorreoSinFoto(req.query.correo,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('no hay profesores con ese correo');
            }else{
                profesor.buscarHorarioProfesorPorCorreo(req.query.correo,function(error,row){
                    if(error){
                        res.send(error);
                    }else{
                        if(row.length==0){
                            res.send('ese profesor no tiene ningun horario');
                        }else{
                            res.send(row);
                        }//else
                    }//else
                })//profesor.buscarHorarioProfesorPorCorreo
            }//else
        }//else
    })//profesor.buscarProfesorPorCorreoSinFoto
})//router.post('/buscarHorarioProfesorPorCorreo

/*
* BUSCAR BUSCAR el id_profesor del profesor que deberia estar en una aula a una hora concreta OK
*/
router.post('/buscarProfesorPorIdAulaEnUnaHora',function(req,res,next){
    var curr_time;
    time.horaActual(function(error,data){
        if (error){
            console.log(error);
            throw error;
        }else{
            curr_time=data;         
        }//else
    });//time.horaActual
    aula.buscarAulaPorId(req.query.id_aula,function(error,row){
        if(error){
            res.send(error);
        }else{
            if(row.length==0){
                res.send('no hay aulas con ese id');
            }else{
                profesor.buscarProfesorPorIdAulaEnUnaHora(req.query.id_aula,curr_time,function(error,row){
                    if(error){
                        res.send(error);
                    }else{
                        if(row.length==0){
                            res.send('esa aula no tiene que tener ningun profesor');
                        }else{
                            res.send(row);
                        }//else
                    }//else
                })//profesor.buscarProfesorPorIdAulaEnUnaHora
            }//else
        }//else
    })//aula.buscarAulaPorId
})//router.post('/buscarProfesorPorIdAulaEnUnaHora

/****************************************************************************************************************************/

module.exports = router;