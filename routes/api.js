var express = require('express');
var router = express.Router();
var time = require('../models/time');
var alumno = require('../models/alumno');
var alumno_grupos = require('../models/alumno_grupos');
var asignatura = require('../models/asignatura');
var aula = require('../models/aula');
var convalidadas = require('../models/convalidadas');
var falta = require('../models/falta');
var grupo = require('../models/grupo');
var horario_grupo = require('../models/horario_grupo');
var horario_profesor = require('../models/horario_profesor');
var profesor = require('../models/profesor');
var profesores_asignaturas = require('../models/profesores_asignaturas');

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR alumno sin foto OK
http://localhost:3000/API/agregarAlumno?dni=69696969-Y&nombre=API&apellidos=API&correo=API@zubirimanteo.com&num_tarjeta=API1
*/
router.post('/agregarAlumno', function(req, res, next) {
	alumno.buscarAlumnoPorDni(req.query.dni, function(error,row) {
        if (error) {
            res.send('error conectando con la base de datos');
            throw error;
        }else{
            if(row.length>0){
                res.send('ese DNI lo tiene un alumno');
            }else {
                alumno.buscarAlumnoPorCorreo(req.query.correo, function(error,row){
                    if (error) {
                        res.send('error conectando con la base de datos');
                        throw error;
                    }else {
                        if(row.length>0){
                            res.send('ese correo lo tiene un alumno');
                        }else {
                            alumno.buscarAlumnoPorTarjeta(req.query.num_tarjeta, function(error,row){
                                if (error) {
                                    res.send('error conectando con la base de datos');
                                    throw error; 
                                }else {
                                    if(row.length>0){
                                        res.send('ese numero de tarjeta lo tiene un alumno');
                                    }else {
                                        profesor.buscarProfesorPorDni(req.query.dni, function(error,row) {
                                            if (error) {
                                                res.send('error conectando con la base de datos');
                                                throw error;
                                            }else{
                                                if(row.length>0){
                                                    res.send('ese DNI lo tiene un profesor');
                                                }else {
                                                    profesor.buscarProfesorPorCorreo(req.query.correo, function(error,row){
                                                        if (error) {
                                                            res.send('error conectando con la base de datos');
                                                            throw error;
                                                        }else {
                                                            if(row.length>0){
                                                                res.send('ese correo lo tiene un profesor');
                                                            }else {
                                                                profesor.buscarProfesorPorTarjeta(req.query.num_tarjeta, function(error,row){
                                                                    if (error) {
                                                                        res.send('error conectando con la base de datos');
                                                                        throw error; 
                                                                    }else {
                                                                        if(row.length>0){
                                                                            res.send('ese numero de tarjeta lo tiene un profesor');
                                                                        }else {
                                                                            alumno.agregarAlumnoSinFoto(req.query.dni,req.query.nombre,req.query.apellidos,req.query.correo,req.query.num_tarjeta, function(error,row){
                                                                                if (error) {
                                                                                    throw error;
                                                                                    res.send('Error al agregar alumno');
                                                                                }else {
                                                                                    res.send('Alumno agregado correctamente');
                                                                                }//else
                                                                            })//alumno.agregarAlumnoSinFoto
                                                                        }//else
                                                                    }//else
                                                                })//profesor.buscarProfesorPorTarjeta
                                                            }//else
                                                        }//else
                                                    })//profesor.buscarProfesorPorCorreo
                                                }//else
                                            }//else
                                        })//profesor.buscarProfesorPorDni
                                    }//else
                                }//else
                            })//alumno.buscarAlumnoPorTarjeta
                        }//else
                    }//else
                })//alumno.buscarAlumnoPorCorreo
            }//else
        }//else
    })//alumno.buscarAlumnoPorDni
});//router.post('/agregarAlumno

/*
* INSERT asignatura
*/
router.post('/agregarAsignatura', function(req,res,next){
    asignatura.buscarAsignaturaPorClave(req.query.clave, function (error,row) {
        if (error) {
            res.send('error conectando con la base de datos');
            throw error;
        }else{
            if(row.length>0){
                res.send('ya existe esa clave de asignatura');
            }else{
                asignatura.agregarAsignatura(req.query.nombre,req.query.clave,req.query.obligatoria,req.query.tipo, function (error,row) {
                    if (error) {
                        res.send('error conectando con la base de datos');
                        throw error;
                    }else{
                        res.send('asignatura agregada correctamente');
                    }//else
                });//asignatura.agregarAsignatura
            }//else
        }//else
    });//asignatura.buscarAsignaturaPorClave
});//router.post('/agregarAsignatura

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE alumno OK
http://localhost:3000/API/modificarAlumno?id_alumno=51&dni=76490150-F&nombre=prueba2&apellidos=prueba2&correo=profesor7@zubirimanteo.es&num_tarjeta=P711&tarjeta_activada=1&grupo[]=7&grupo[]=8&grupo[]=9
*/
router.post('/modificarAlumno', function(req, res, next) {
    alumno_grupos.borrarAlumnoGrupos(req.query.id_alumno, function(error,row) {
        if (error) {
            throw error;
        }//if
    })//alumno_grupos.borrarAlumnoGrupos
  
    var data= req.query.grupo;
    for (var i = 0; i < data.length; i++) {
        alumno_grupos.agregarAlumnoGrupo(data[i],req.query.id_alumno, function(error,row) {
            if (error) {
                throw error;
            }//if
        })//alumno_grupos.agregarAlumnoGrupo
    }//for

    if(req.query.asignatura == undefined){
        //console.log("el alumno no tiene ninguna convalidada");
    }else {
        convalidadas.borrarAsignaturaConvalidada(req.query.id_alumno, function(error,row) {
            if (error) {
                throw error;
            }//if
        })//convalidadas.borrarAsignaturaConvalidada
        
        var data2= req.query.asignatura;
        for (var i = 0; i < data2.length; i++) {
            convalidadas.agregarAsignaturaConvalidada(data2[i],req.query.id_alumno, function(error,row) {
                if (error) {
                    throw error;
                }//if
            })//convalidadas.agregarAsignaturaConvalidada
        }//for
    }//else

    var dni_antiguo;
    var correo_antiguo;
    var num_tarjeta_antiguo;

    alumno.buscarAlumnoPorIdSinFoto(req.query.id_alumno, function(error,row) {
        if (error) {
            res.send('error conectando con la base de datos');
            throw error;
        }else{
            dni_antiguo = row[0].dni;
            correo_antiguo = row[0].correo;
            num_tarjeta_antiguo = row[0].num_tarjeta;
        }
    })//alumno.buscarAlumnoPorIdSinFoto

    alumno.buscarAlumnoPorDni(req.query.dni, function(error,row) {
        if (error) {
            res.send('error conectando con la base de datos');
            throw error;
        }else{
            if((row.length>0)&&(req.query.dni!=dni_antiguo)){
                res.send('ese DNI lo tiene un alumno');
            }else {
                alumno.buscarAlumnoPorCorreo(req.query.correo, function(error,row){
                    if (error) {
                        res.send('error conectando con la base de datos');
                        throw error;
                    }else {
                        if((row.length>0)&&(req.query.correo!=correo_antiguo)){
                            res.send('ese correo lo tiene un alumno');

                        }else {
                            alumno.buscarAlumnoPorTarjeta(req.query.num_tarjeta, function(error,row){
                                if (error) {
                                    res.send('error conectando con la base de datos');
                                    throw error; 
                                }else {
                                    if((row.length>0)&&(req.query.num_tarjeta!=num_tarjeta_antiguo)){
                                        res.send('ese numero de tarjeta lo tiene un alumno');
                                    }else {
                                        profesor.buscarProfesorPorDni(req.query.dni, function(error,row) {
                                            if (error) {
                                                res.send('error conectando con la base de datos');
                                                throw error;
                                            }else{
                                                if((row.length>0)&&(req.query.dni!=dni_antiguo)){
                                                    res.send('ese DNI lo tiene un profesor');
                                                }else {
                                                    profesor.buscarProfesorPorCorreo(req.query.correo, function(error,row){
                                                        if (error) {
                                                            res.send('error conectando con la base de datos');
                                                            throw error;
                                                        }else {
                                                            if((row.length>0)&&(req.query.correo!=correo_antiguo)){
                                                                res.send('ese correo lo tiene un profesor');
                                                            }else {
                                                                profesor.buscarProfesorPorTarjeta(req.query.num_tarjeta, function(error,row){
                                                                    if (error) {
                                                                        res.send('error conectando con la base de datos');
                                                                        throw error; 
                                                                    }else {
                                                                        if((row.length>0)&&(req.query.num_tarjeta!=num_tarjeta_antiguo)){
                                                                            res.send('ese numero de tarjeta lo tiene un profesor');
                                                                        }else {
                                                                            alumno.modificarAlumnoSinFoto(req.query.id_alumno,req.query.dni,req.query.nombre,req.query.apellidos,req.query.correo,req.query.num_tarjeta,req.query.tarjeta_activada, function(error,row){
                                                                                if (error) {
                                                                                    throw error;
                                                                                }else {
                                                                                    res.send('alumno modificado correctamente');
                                                                                }//else
                                                                            })//alumno.modificarAlumnoSinFoto
                                                                        }//else
                                                                    }//else
                                                                })//profesor.buscarProfesorPorTarjeta
                                                            }//else
                                                        }//else
                                                    })//profesor.buscarProfesorPorCorreo
                                                }//else
                                            }//else
                                        })//profesor.buscarProfesorPorDni
                                    }//else
                                }//else
                            })//alumno.buscarAlumnoPorTarjeta
                        }//else
                    }//else
                })//alumno.buscarAlumnoPorCorreo
            }//else
        }//else
    })//alumno.buscarAlumnoPorDni
});//router.post('/modificarAlumno

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE alumno por id_alumno OK
*/
router.post('/borrarAlumno', function(req, res, next) {
    alumno.buscarAlumnoPorIdSinFoto(req.query.id_alumno, function(error,row) {
        if (error) {
            res.send('error conectando con la base de datos');
            throw error;
        }else{
            if(row.length==0){
                res.send('Ese id no existe');
            }else{
                alumno.borrarAlumno(req.query.id_alumno, function(error,row) {
                    if (error) {
                        throw error;
                        res.send('error borrando alumno');
                    }else{
                        res.send('alumno borrado correctamente');
                    }//else
                })//alumno.borrarAlumno            
            }//else
        }//else
    })//alumno.buscarAlumnoPorId
});//router.post('/borrarAlumno


/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
* BUSCAR alumno por id_alumno OK
*/
router.post('/buscarAlumnoPorId', function(req,res,next) {
    alumno.buscarAlumnoPorIdSinFoto(req.query.id_alumno, function(error,row) {
        if (error) {
            throw error;
        }else{
            if(row.length==0){
                res.send('Ese id no existe');
            }else{
                res.send(row);
            }//else
        }//else
    })//alumno.buscarAlumnoPorIdSinFoto
});//router.post('/buscarAlumnoPorIdSinFoto

/*
* BUSCAR alumno por dni OK
*/
router.post('/buscarAlumnoPorDni', function(req,res,next) {
    alumno.buscarAlumnoPorDniSinFoto(req.query.dni, function(error,row) {
        if (error) {
            throw error;
        }else{
            if(row.length==0){
                res.send('Ese dni no existe');
            }else{
                res.send(row);
            }//else
        }//else
    })//alumno.buscarAlumnoPorDniSinFoto
});//router.post('/buscarAlumnoPorDniSinFoto

/*
* BUSCAR alumno por num_tarjeta OK
*/
router.post('/buscarAlumnoPorTarjeta', function(req,res,next) {
    alumno.buscarAlumnoPorTarjeta(req.query.num_tarjeta, function(error,row) {
        if (error) {
            throw error;
        }else{
            if(row.length==0){
                res.send('Ese numero de tarjeta no existe');
            }else{
                res.send(row);
            }//else
        }//else
    })//alumno.buscarAlumnoPorTarjeta
});//router.post('/buscarAlumnoPorTarjeta

/*
* BUSCAR alumno por nombre OK
*/
router.post('/buscarAlumnoPorNombre', function(req,res,next) {
    alumno.buscarAlumnoPorNombreSinFoto(req.query.nombre, function(error,row) {
        if (error) {
            throw error;
        }else{
            if(row.length==0){
                res.send('Ese nombre no existe');
            }else{
                res.send(row);
            }//else
        }//else
    })//alumno.buscarAlumnoPorNombreSinFoto
});//router.post('/buscarAlumnoPorNombre

/*
* BUSCAR alumno por nombre y apellidos OK
*/
router.post('/buscarAlumnoPorNombreYApellidos', function(req,res,next) {
    alumno.buscarAlumnoPorNombreYApellidoSinFoto(req.query.nombre,req.query.apellidos, function(error,row) {
        if (error) {
            throw error;
        }else{
            if(row.length==0){
                res.send('Ese nombre y apellidos no existen');
            }else{
                res.send(row);
            }//else
        }//else
    })//alumno.buscarAlumnoPorNombreYApellidoSinFoto
});//router.post('/buscarAlumnoPorNombreYApellidos

/*
* BUSCAR alumno por correo OK
*/
router.post('/buscarAlumnoPorCorreo', function(req,res,next) {
    alumno.buscarAlumnoPorCorreoSinFoto(req.query.correo, function(error,row) {
        if (error) {
            throw error;
        }else{
            if(row.length==0){
                res.send('Ese correo no existe');
            }else{
                res.send(row);
            }//else
        }//else
    })//alumno.buscarAlumnoPorCorreoSinFoto
});//router.post('/buscarAlumnoPorNombreYApellidos

/*
* BUSCAR el aula en la que tiene que estar un alumno por num_tarjeta OK
*/
router.post('/buscarAulaEnLaQueTieneQueEstarPorTarjeta', function(req,res,next) {
    var curr_time;
    time.horaActual(function(error,data){
        if (error){
            console.log(error);
            throw error;
        }else{
            curr_time=data;         
        }//else
    });//time.horaActual
    
    alumno.buscarAlumnoPorTarjeta(req.query.num_tarjeta,function(error,row) {
        if (error) {
            throw error;
        }else{
            if(row.length==0){
                res.send('Ese numero de tarjeta no existe');
            }else{
                alumno.buscarAulaEnLaQueTieneQueEstarPorTarjeta(req.query.num_tarjeta,curr_time,function(error,row) {
                    if (error) {
                        throw error;
                    }else{
                        if(row.length==0){
                            res.send('el alumno no tiene que estar en ninguna aula');
                        }else{
                            res.send(row);
                        }//else
                    }//else
                })//alumno.buscarAulaEnLaQueTieneQueEstarPorTarjeta
            }//else
        }//else
    })//alumno.buscarAlumnoPorTarjeta
});//router.post('/buscarAulaEnLaQueTieneQueEstarPorTarjeta

/*
* BUSCAR el aula en la que tiene que estar un alumno por id_alumno OK
*/
router.post('/buscarAulaEnLaQueTieneQueEstarPorId', function(req,res,next) {
    var curr_time;
    time.horaActual(function(error,data){
        if (error){
            console.log(error);
            throw error;
        }else{
            curr_time=data;         
        }//else
    });//time.horaActual
    
    alumno.buscarAlumnoPorIdSinFoto(req.query.id_alumno,function(error,row) {
        if (error) {
            throw error;
        }else{
            if(row.length==0){
                res.send('Ese id_alumno no existe');
            }else{
                alumno.buscarAulaEnLaQueTieneQueEstarPorId(req.query.id_alumno,curr_time,function(error,row) {
                    if (error) {
                        throw error;
                    }else{
                        if(row.length==0){
                            res.send('el alumno no tiene que estar en ninguna aula');
                        }else{
                            res.send(row);
                        }//else
                    }//else
                })//alumno.buscarAulaEnLaQueTieneQueEstarPorId
            }//else
        }//else
    })//alumno.buscarAlumnoPorIdSinFoto
});//router.post('/buscarAulaEnLaQueTieneQueEstarPorId

/*
* BUSCAR presencia del alumno por num_tarjeta OK
*/
router.post('/buscarPresenciaAlumno', function(req,res,next) {
    alumno.buscarAlumnoPorTarjeta(req.query.num_tarjeta, function(error,row) {
        if (error) {
            res.send('error conectando con la base de datos');
            throw error;
        }else{
            if(row.length==0){
                res.send('Ese numero de tarjeta no existe');
            }else{
                alumno.buscarPresenciaAlumno(req.query.num_tarjeta, function(error,row) {
                    if (error) {
                        throw error;
                        res.send('el alumno no tiene prensencia');
                    }else{
                        res.send(row);
                    }//else
                })//alumno.buscarPresenciaAlumno            
            }//else
        }//else
    })//alumno.buscarAlumnoPorTarjeta
});//router.post('/buscarPresenciaAlumno

/*
* BUSCAR todos los id_alumno OK
*/
router.post('/buscarTodosLosIdAlumno', function(req,res,next) {
    alumno.buscarTodosLosIdAlumno(function(error,row) {
        if (error) {
            throw error;
        }else{
            if(row.length==0){
                res.send('no hay alumnos');
            }else{
                res.send(row);
            }//else
        }//else
    })//alumno.buscarTodosLosIdAlumno
});//router.post('/buscarTodosLosIdAlumno

/*
* BUSCAR todos los id_alumno, nombre y apellidos de los alumnos OK
*/
router.post('/mostrarTodosLosIdNombreApellidosAlumno', function(req,res,next) {
    alumno.mostrarTodosLosIdNombreApellidosAlumno(function(error,row) {
        if (error) {
            throw error;
        }else{
            if(row.length==0){
                res.send('no hay alumnos');
            }else{
                res.send(row);
            }//else
        }//else
    })//alumno.mostrarTodosLosIdNombreApellidosAlumno
});//router.post('/mostrarTodosLosIdNombreApellidosAlumno

/****************************************************************************************************************************/

module.exports = router;