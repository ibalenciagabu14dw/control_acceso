var express = require('express');
var router = express.Router();
var time = require('../models/time');
var alumno = require('../models/alumno');
var alumno_grupos = require('../models/alumno_grupos');
var asignatura = require('../models/asignatura');

/*
http://localhost:3000/API/modificarAlumno?id_alumno=5&dni=74532989-R&nombre=prueba&apellidos=prueba&correo=alumno5@zubirimanteo.com&num_tarjeta=A5&tarjeta_activada=1&grupo[]=14&grupo[]=15
*/


/***********************************************************INSERT*********************************************************/

/*
* INSERTAR alumno sin foto OK
*/
router.post('/agregarAlumno', function(req, res, next) {
	alumno.buscarAlumnoPorDni(req.query.dni, function (error,row) {
        if (error) {
            res.send('error conectando con la base de datos');
            throw error;
        }else{
            if(row.length>0){
                res.send('ya existe ese DNI');
            }else{
                alumno.buscarAlumnoPorCorreo(req.query.correo, function (error,row) {
                    if (error) {
                        res.send('error conectando con la base de datos');
                        throw error;
                    }else{
                        if(row.length>0){
                            res.send('ya existe ese correo');
                        }else{
                            alumno.buscarAlumnoPorTarjeta(req.query.num_tarjeta, function (error,row) {
                                if (error) {
                                    res.send('error conectando con la base de datos');
                                    throw error;
                                }else{
                                    if(row.length>0){
                                        res.send('ya existe esa tarjeta');
                                    }else{
                                        alumno.agregarAlumnoSinFoto(req.query.dni,req.query.nombre,req.query.apellidos,req.query.correo,req.query.num_tarjeta, function (error,row) {
                                            if (error) {
                                                res.send('error conectando con la base de datos');
                                                throw error;
                                            }else{
                                                res.send('alumno agregado correctamente');
                                            }//else
                                        });//alumno.agregarAlumnoSinFoto
                                    }//else
                                }//else
                            });//alumno.buscarAlumnoPorTarjeta
                        }//else
                    }//else
                });//alumno.buscarAlumnoPorCorreo
            }//else
        }//else
    });//alumno.buscarAlumnoPorDni
});//router.post('/agregarAlumno

/*
* INSERT asignatura OK
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
* UPDATE alumno 
*/
router.post('/modificarAlumno', function(req, res, next) {
    alumno_grupos.borrarAlumnoGrupos(req.query.id_alumno, function(error,row) {
        if (error) {
            res.send('error conectando con la base de datos');
            throw error;
        }else{
            res.send(row);
        }
    })//alumno_grupos.borrarAlumnoGrupos
  
    var data= req.query.grupo;
    for (var i = 0; i < data.length; i++) {
        alumno_grupos.agregarAlumnoGrupo(data[i],req.query.id_alumno, function(error,row) {
            if (error) {
                res.send('error conectando con la base de datos');
                throw error;
            }else{
                res.send(row);
            }//else
        })//alumno_grupos.agregarAlumnoGrupo
    }//for

    if(req.query.asignatura == undefined){
        //console.log("el alumno no tiene ninguna convalidada");
    }else {
        convalidadas.borrarAsignaturaConvalidada(req.query.id_alumno, function(error,row) {
            if (error) {
                res.send('error conectando con la base de datos');
                throw error;
            }else{
                res.send(row);
            }//else
        })//convalidadas.borrarAsignaturaConvalidada
        
        var data2= req.query.asignatura;
        for (var i = 0; i < data2.length; i++) {
            convalidadas.agregarAsignaturaConvalidada(data2[i],req.query.id_alumno, function(error,row) {
                if (error) {
                    res.send('error conectando con la base de datos');
                    throw error;
                }else{
                    res.send(row);
                }//else
            })//convalidadas.agregarAsignaturaConvalidada
        }//for
    }//else

    var id_alumno = req.query.id_alumno;
    var dni = req.query.dni;
    var nombre = req.query.nombre;
    var apellidos = req.query.apellidos;
    var correo = req.query.correo;
    var tarjeta_activada = req.query.tarjeta_activada;
    var num_tarjeta = req.query.num_tarjeta;
    alumno.buscarAlumnoPorIdDniCorreoNum_tarj(id_alumno,dni,correo,num_tarjeta, function(error,row) {
        if (error) {
            throw error;
        }else {
            if(row.length>0){
                alumno.modificarAlumnoSinFoto(id_alumno,dni,nombre,apellidos,correo,num_tarjeta,tarjeta_activada, function(error,row) {
                    if (error) {
                        res.send('error conectando con la base de datos');
                        throw error;          
                    }else {
                        res.send(row);    
                    }        
                })//alumno.modificarAlumnoSinFoto
            }else {
                alumno.buscarAlumnoPorDni(dni, function(error,row) {
                    if (error) {
                        res.send('error conectando con la base de datos');
                        throw error;
                    }else {
                        if(row.length>0){
                            res.send({err:'existeDNI'});
                        }else {
                            alumno.buscarAlumnoPorCorreo(correo, function(error,row){
                                if (error) {
                                    res.send('error conectando con la base de datos');
                                    throw error;
                                }else {
                                    if(row.length>0){
                                        res.send({err:'existeCorreo'});
                                    }else {
                                        alumno.buscarAlumnoPorTarjeta(num_tarjeta, function(error,row){
                                            if (error) {
                                                res.send('error conectando con la base de datos');
                                                throw error; 
                                            }else {
                                                if(row.length>0){
                                                    res.send({err:'existeTarjeta'});
                                                }else {
                                                    alumno.modificarAlumnoSinFoto(id_alumno,dni,nombre,apellidos,correo,num_tarjeta,tarjeta_activada, function(error,row){
                                                        if (error) {
                                                            res.send('error conectando con la base de datos');
                                                            throw error;
                                                        }else {
                                                            res.send(row); 
                                                        }//else
                                                    })//alumno.modificarAlumnoSinFoto
                                                }//else
                                            }//else
                                        })//alumno.buscarAlumnoPorTarjeta
                                    }//else
                                }//else
                            })//alumno.buscarAlumnoPorCorreo
                        }//else
                    }//else
                })//alumno.buscarAlumnoPorDni
            }//.else if(row.length<0)
        }//else
    })//alumno.buscarAlumnoPorIdDniCorreoNum_tarj
});//router.post('/modificarAlumno

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE alumno por id_alumno ****NO FUNCIONA****
*/
router.post('/borrarAlumno', function(req,res,next){
    alumno.borrarAlumno(req.query.id_alumno, function(error,row) {
        if (error) {
            throw error;

        }else{
            res.send("borrado del alumno OK");
        }//else
    })//alumno.borrarAlumno
});//router.post('/borrarAlumno


/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
* BUSCAR alumno por nombre ****NO FUNCIONA****ERROR DE FOTO
*/
router.post('/buscarAlumnoPorNombre', function(req,res,next) {
    alumno.buscarAlumnoPorNombre(req.query.nombre, function(error,row) {
        if (error) {
            throw error;
        }else{
            res.send(row);
        }//else
    })//alumno.buscarAlumnoPorNombre
});//router.post('/buscarAlumnoPorNombre

/*
* BUSCAR alumno por id_alumno ****NO FUNCIONA****ERROR DE FOTO
*/
router.post('/buscarAlumnoPorId', function(req,res,next) {
    alumno.buscarAlumnoPorId(req.query.id_alumno, function(error,row) {
        if (error) {
            throw error;
        }else{
            res.json(row);
        }//else
    })//alumno.buscarAlumnoPorId
});//router.post('/buscarAlumnoPorId


/****************************************************************************************************************************/


/*
******************************MOSTAR********************************


router.get('/mostrar/buscarTodoslosAlumnos', function(req, res, next) {
	alumno.buscarTodoslosAlumnos(function (error,data) {
		if (error) {
			res.send("ko");
			console.log("Fallo update presencia alumno");
			throw error;
		}else{
			//emitir al cliente para cambiar color presencia alumno
			res.json(data);
		}//else error
	});//modificarPresenciaDelAlumno
});//


******************************AGREGAR********************************
*/

module.exports = router;