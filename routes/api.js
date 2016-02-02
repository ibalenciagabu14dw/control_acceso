var express = require('express');
var router = express.Router();
var time = require('../models/time');
var alumno = require('../models/alumno');
var asignatura = require('../models/asignatura');

//http://localhost:3000/API/modificarAlumno?id=28&dni=00000&nombre=peep&apellidos=peep&correo=peep@peep.com&num_tarjeta=a69


/***********************************************************INSERT*********************************************************/

/*
* INSERTAR alumno sin foto
*/
router.post('/agregarAlumno', function(req, res, next) {
	alumno.buscarAlumnoPorDni(req.query.dni, function (error,row) {
        if (error) {
            res.send({err:'bd'});
            throw error;
        }else{
            if(row.length>0){
                res.send({err:'existeDNI'});
            }else{
                alumno.buscarAlumnoPorCorreo(req.query.correo, function (error,row) {
                    if (error) {
                        res.send({err:'bd'});
                        throw error;
                    }else{
                        if(row.length>0){
                            res.send({err:'existeCorreo'});
                        }else{
                            alumno.buscarAlumnoPorTarjeta(req.query.num_tarjeta, function (error,row) {
                                if (error) {
                                    res.send({err:'bd'});
                                    throw error;
                                }else{
                                    if(row.length>0){
                                        res.send({err:'existeTarjeta'});
                                    }else{
                                        alumno.agregarAlumnoSinFoto(req.query.dni,req.query.nombre,req.query.apellidos,req.query.correo,req.query.num_tarjeta, function (error,row) {
                                            if (error) {
                                                res.send({err:'bd'});
                                                throw error;
                                            }else{
                                                res.send(row);
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

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE alumno sin foto
*/
router.post('/modificarAlumno', function(req, res, next) {
	var id_alumno = req.body.id_alumno;
    var dni = req.body.dni;
    var nombre = req.body.nombre;
    var apellidos = req.body.apellidos;
    var correo = req.body.correo;
    var tarjeta_activada = req.body.tarjeta_activada;
    var num_tarjeta = req.body.num_tarjeta;
    
	alumno_grupos.borrarAlumnoGrupos(req.body.id_alumno, function(error,row) {
        if (error) {
            throw error;
        }else{
            res.send(row);
        }
    })//alumno_grupos.borrarAlumnoGrupos
  
    var data= req.body.grupo;
    for (var i = 0; i < data.length; i++) {
        alumno_grupos.agregarAlumnoGrupo(data[i],req.body.id_alumno, function(error,row) {
            if (error) {
                throw error;
            }else{
                res.send(row);
            }//else
        })//alumno_grupos.agregarAlumnoGrupo
    }//for

    if(req.body.asignatura == undefined){
        //console.log("el alumno no tiene ninguna convalidada");
    }else {
        convalidadas.borrarAsignaturaConvalidada(req.body.id_alumno, function(error,row) {
            if (error) {
                throw error;
            }else{
                res.send(row);
            }//else
        })//convalidadas.borrarAsignaturaConvalidada
        
        var data2= req.body.asignatura;
        for (var i = 0; i < data2.length; i++) {
            convalidadas.agregarAsignaturaConvalidada(data2[i],req.body.id_alumno, function(error,row) {
                if (error) {
                    throw error;
                }else{
                    res.send(row);
                }//else
            })//convalidadas.agregarAsignaturaConvalidada
        }//for
    }//else

    
    alumno.buscarAlumnoPorIdDniCorreoNum_tarj(id_alumno,dni,correo,num_tarjeta, function(error,row) {
        if (error) {
            throw error;
        }else{
            if(row.length>0){
                alumno.modificarAlumnoSinFoto(id_alumno,dni,nombre,apellidos,correo,num_tarjeta,tarjeta_activada, function(error,row) {
                    if (error) {
                        throw error;          
                    }else {
                        res.send(row);    
                    }        
                })//.alumno.modificarAlumnoSinFoto
            } else {
                alumno.buscarAlumnoPorDni(dni, function(error,row) {
                    if (error) {
                        throw error;
                    } else {
                        if(row.length>0){
                            res.send({err:'existeDNI'});
                        } else {
                            alumno.buscarAlumnoPorCorreo(correo, function(error,row){
                                if (error) {
                                    throw error;
                                } else {
                                    if(row.length>0){
                                        res.send({err:'existeCorreo'});
                                    } else {
                                        alumno.buscarAlumnoPorTarjeta(num_tarjeta, function(error,row){
                                            if (error) {
                                               throw error; 
                                           } else {
                                            if(row.length>0){
                                                res.send({err:'existeTarjeta'});
                                            } else {
                                                alumno.modificarAlumnoSinFoto(id_alumno,dni,nombre,apellidos,correo,num_tarjeta,tarjeta_activada, function(error,row){
                                                    if (error) {
                                                        throw error;
                                                    } else {
                                                        res.send(row); 
                                                    }//.else if (error) 
                                                })//.alumno.modificarAlumnoSinFoto
                                            }//else if(row.length>0){
                                           }//.else if (error)
                                        })//.alumno.buscarAlumnoPorTarjeta
                                    }//.else if(row.length>0)
                                }//.else if (error)
                            })//.alumno.buscarAlumnoPorCorreo       
                        }//.else if(row.length>0)
                    }//.else if (error)
                })//.alumno.buscarAlumnoPorDni
            }//.else if(row.length<0)
        }//.else if (error)
    })//.alumno.buscarAlumnoPorIdDniCorreoNum_tarj
});//modificarAlumno


/*
******************************MOSTAR********************************


router.get('/mostrar/mostrarAlumnoportarjeta', function(req, res, next) {
	alumno.buscarAlumnoPorTarjeta(req.query.num_tarjeta, function (error,data) {
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


router.post('/agregar/agregarAsignatura', function(req, res, next) {
	asignatura.agregarAsignatura(req.query.nombre,req.query.clave,req.query.obligatoria,req.query.tipo,function (error,data) {
		if (error) {
			res.send("ko");
			console.log("Fallo agregarAlumno");
			throw error;
		}else{
			//emitir al cliente para cambiar color presencia alumno
			res.json(data);
		}//else error
	});//modificarPresenciaDelAlumno
});//


//*/

module.exports = router;