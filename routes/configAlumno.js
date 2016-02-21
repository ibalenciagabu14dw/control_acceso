var express = require('express');
var router = express.Router();
var alumno = require('../models/alumno');
var multer = require('multer');
var convalidadas = require('../models/convalidadas');
var alumno_grupos = require('../models/alumno_grupos');
var profesor = require('../models/profesor');

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR alumno
*/
router.post('/agregarAlumno', multer({}).single('foto'), function(req,res){ 
var dni = req.body.dni;
var nombre = req.body.nombre;
var apellidos = req.body.apellidos;
var correo = req.body.correo;
var num_tarjeta = req.body.num_tarjeta;
var foto = req.file.buffer;
    alumno.buscarAlumnoPorDni(req.body.dni, function(error,row) {
        if (error) {
            res.send('error conectando con la base de datos');
            throw error;
        } else {
            if(row.length>0){
                console.log({err:'ese DNI lo tiene un alumno'});
                res.send({err:'existeDNI'});
            } else {
                alumno.buscarAlumnoPorCorreo(req.body.correo, function(error,row){
                    if (error) {
                       res.send('error conectando con la base de datos');
                       throw error;
                    } else {
                        if(row.length>0){
                            console.log({err:'ese correo lo tiene un alumno'});
                            res.send({err:'existeCorreo'});
                        } else {
                            alumno.buscarAlumnoPorTarjeta(req.body.num_tarjeta, function(error,row){
                                if (error) {
                                    res.send('error conectando con la base de datos');
                                    throw error; 
                                } else {
                                    if(row.length>0){
                                        console.log({err:'ese numero de tarjeta lo tiene un alumno'});
                                        res.send({err:'existeTarjeta'});
                                    } else {
                                        profesor.buscarProfesorPorDni(req.body.dni, function(error,row) {
                                            if (error) {
                                                res.send('error conectando con la base de datos');
                                                throw error;
                                            } else {
                                                if(row.length>0){
                                                    console.log({err:'ese DNI lo tiene un profesor'});
                                                    res.send({err:'existeDNI'});
                                                } else {
                                                    profesor.buscarProfesorPorCorreo(req.body.correo, function(error,row){
                                                        if (error) {
                                                           res.send('error conectando con la base de datos');
                                                           throw error; 
                                                        } else {
                                                            if(row.length>0){
                                                                console.log({err:'ese correo lo tiene un profesor'});
                                                                res.send({err:'existeCorreo'});
                                                            } else {
                                                                profesor.buscarProfesorPorTarjeta(req.body.num_tarjeta, function(error,row){
                                                                    if (error) {
                                                                        res.send('error conectando con la base de datos');
                                                                        throw error;
                                                                    } else {
                                                                        if(row.length>0){
                                                                            console.log({err:'ese numero de tarjeta lo tiene un profesor'});
                                                                            res.send({err:'existeTarjeta'});
                                                                        } else {
                                                                            alumno.agregarAlumno(dni,nombre,apellidos,correo,foto,num_tarjeta, function (error,row) {
                                                                                if (error) {
                                                                                 throw error;
                                                                                } else {
                                                                                res.send(row);
                                                                                }//.else
                                                                            })//alumno.agregarAlumno
                                                                        }//.else
                                                                    }//.else
                                                                })//profesor.buscarProfesorPorTarjeta
                                                            }//.else
                                                        }//.else
                                                    })//profesor.buscarProfesorPorCorreo
                                                }//.else
                                            }//.else
                                        })//.alumno.buscarProfesorPorDni
                                    }//.else
                                }//.else
                            })//alumno.buscarAlumnoPorTarjeta
                        }//.else
                    }//.else
                })//alumno.buscarAlumnoPorCorreo
            }//.else
        }//.else
    })//alumno.buscarAlumnoPorDni
});//router.post('/agregarAlumno


/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE alumno
*/
router.post('/modificarAlumno',multer({}).single('foto'),  function(req,res,next){
    if(req.body.grupo == undefined){
        res.send({err:'nogrupo'});
    } else {
        alumno_grupos.borrarAlumnoGrupos(req.body.id_alumno, function(error,row) {
            if (error) {
                throw error;
            } else {
                res.send(row);
            }//.else
        })//alumno_grupos.borrarAlumnoGrupos
        var data= req.body.grupo;
        for (var i = 0; i < data.length; i++) {
            alumno_grupos.agregarAlumnoGrupo(data[i],req.body.id_alumno, function(error,row) {
                if (error) {
                    throw error;
                } else {
                    res.send(row);
                }//.else
            })//alumno_grupos.agregarAlumnoGrupo
        }//.for

        if(req.body.asignatura == undefined){
            convalidadas.borrarAsignaturaConvalidada(req.body.id_alumno, function(error,row) {
                if (error) {
                    throw error;
                } else {
                    res.send(row);
                }//.else
            })//convalidadas.borrarAsignaturaConvalidada
        } else {
            convalidadas.borrarAsignaturaConvalidada(req.body.id_alumno, function(error,row) {
                if (error) {
                    throw error;
                } else {
                    res.send(row);
                }//.else
            })//convalidadas.borrarAsignaturaConvalidada
            var data2= req.body.asignatura;
            for (var i = 0; i < data2.length; i++) {
                convalidadas.agregarAsignaturaConvalidada(data2[i],req.body.id_alumno, function(error,row) {
                    if (error) {
                        throw error;
                    } else {
                        res.send(row);
                    }//.else
                })//convalidadas.agregarAsignaturaConvalidada
            }//.for
        }//.else
        var foto = req.file.buffer;
        var dni_antiguo;
        var correo_antiguo;
        var num_tarjeta_antiguo;
        alumno.buscarAlumnoPorIdSinFoto(req.body.id_alumno, function(error,row) {
            if (error) {
                res.send('error conectando con la base de datos');
                throw error;
            } else {
                dni_antiguo = row[0].dni;
                correo_antiguo = row[0].correo;
                num_tarjeta_antiguo = row[0].num_tarjeta;
                alumno.buscarAlumnoPorDni(req.body.dni, function(error,row) {
                    if (error) {
                        res.send('error conectando con la base de datos');
                        throw error;
                    } else {
                        if((row.length>0)&&(req.body.dni!=dni_antiguo)){
                            console.log({err:'ese DNI lo tiene un alumno'});
                            res.send({err:'existeDNI'});
                        } else {
                            alumno.buscarAlumnoPorCorreo(req.body.correo, function(error,row){
                                if (error) {
                                    res.send('error conectando con la base de datos');
                                    throw error;
                                } else {
                                   if((row.length>0)&&(req.body.correo!=correo_antiguo)){
                                       console.log({err:'ese correo lo tiene un alumno'});
                                       res.send({err:'existeCorreo'});
                                   } else {
                                        alumno.buscarAlumnoPorTarjeta(req.body.num_tarjeta, function(error,row){
                                            if (error) {
                                                res.send('error conectando con la base de datos');
                                                throw error; 
                                            } else {
                                                if((row.length>0)&&(req.body.num_tarjeta!=num_tarjeta_antiguo)){
                                                    console.log({err:'ese numero de tarjeta lo tiene un alumno'});
                                                    res.send({err:'existeTarjeta'});
                                                } else {
                                                    profesor.buscarProfesorPorDni(req.body.dni, function(error,row) {
                                                        if (error) {
                                                            res.send('error conectando con la base de datos');
                                                            throw error;
                                                        } else {
                                                            if((row.length>0)&&(req.body.dni!=dni_antiguo)){
                                                                console.log({err:'ese DNI lo tiene un profesor'});
                                                                res.send({err:'existeDNI'});
                                                            } else {
                                                                profesor.buscarProfesorPorCorreo(req.body.correo, function(error,row){
                                                                    if (error) {
                                                                        res.send('error conectando con la base de datos');
                                                                        throw error;
                                                                    } else {
                                                                        if((row.length>0)&&(req.body.correo!=correo_antiguo)){
                                                                            console.log({err:'ese correo lo tiene un profesor'});
                                                                            res.send({err:'existeCorreo'});
                                                                        } else {
                                                                            profesor.buscarProfesorPorTarjeta(req.body.num_tarjeta, function(error,row){
                                                                                if (error) {
                                                                                    res.send('error conectando con la base de datos');
                                                                                    throw error; 
                                                                                } else {
                                                                                    if((row.length>0)&&(req.body.num_tarjeta!=num_tarjeta_antiguo)){
                                                                                        console.log({err:'ese numero de tarjeta lo tiene un profesor'});
                                                                                        res.send({err:'existeTarjeta'});
                                                                                    } else {
                                                                                        alumno.modificarAlumno(req.body.id_alumno,req.body.dni,req.body.nombre,req.body.apellidos,req.body.correo,foto,req.body.num_tarjeta,req.body.tarjeta_activada, function(error,row){
                                                                                            if (error) {
                                                                                                throw error;
                                                                                            } else {
                                                                                                res.send(row);
                                                                                            }//.else
                                                                                        })//alumno.modificarAlumno
                                                                                    }//.else
                                                                                }//.else
                                                                            })//profesor.buscarProfesorPorTarjeta
                                                                        }//.else
                                                                    }//.else
                                                                })//profesor.buscarProfesorPorCorreo
                                                            }//.else
                                                        }//.else
                                                    })//profesor.buscarProfesorPorDni
                                                }//.else
                                            }//.else
                                        })//alumno.buscarAlumnoPorTarjeta
                                   }//.else
                                }//.else
                            })//alumno.buscarAlumnoPorCorreo
                        }//.else
                    }//.else
                })//alumno.buscarAlumnoPorDni
            }//.else
        })//alumno.buscarAlumnoPorIdSinFoto
    }//.else
});//router.post('/modificarAlumno

router.post('/modificarAlumnoSinFoto',multer({}).single('foto'),  function(req,res,next){
    if(req.body.grupo == undefined){
        //res.send({err:'nogrupo'});
    } else {
        alumno_grupos.borrarAlumnoGrupos(req.body.id_alumno, function(error,row) {
            if (error) {
                throw error;
            } else {
                res.send(row);
            }//.else
        })//alumno_grupos.borrarAlumnoGrupos
        var data= req.body.grupo;
        for (var i = 0; i < data.length; i++) {
            alumno_grupos.agregarAlumnoGrupo(data[i],req.body.id_alumno, function(error,row) {
                if (error) {
                    throw error;
                } else {
                    res.send(row);
                }//.else
            })//alumno_grupos.agregarAlumnoGrupo
        }//.for
        if(req.body.asignatura == undefined){
            //res.send({err:'nogrupo'});
            convalidadas.borrarAsignaturaConvalidada(req.body.id_alumno, function(error,row) {
                if (error) {
                    throw error;
                } else {
                    res.send(row);
                }//.else
            })//convalidadas.borrarAsignaturaConvalidada
        } else {
            convalidadas.borrarAsignaturaConvalidada(req.body.id_alumno, function(error,row) {
                if (error) {
                    throw error;
                } else {
                    res.send(row);
                }//.else
            })//convalidadas.borrarAsignaturaConvalidada
            var data2= req.body.asignatura;
            for (var i = 0; i < data2.length; i++) {
                convalidadas.agregarAsignaturaConvalidada(data2[i],req.body.id_alumno, function(error,row) {
                    if (error) {
                        throw error;
                    } else {
                        res.send(row);
                    }//.else
                })//convalidadas.agregarAsignaturaConvalidada
            }//.for
        }//.else
        var dni_antiguo;
        var correo_antiguo;
        var num_tarjeta_antiguo;
        alumno.buscarAlumnoPorIdSinFoto(req.body.id_alumno, function(error,row) {
            if (error) {
                res.send('error conectando con la base de datos');
                throw error;
            } else {
                dni_antiguo = row[0].dni;
                correo_antiguo = row[0].correo;
                num_tarjeta_antiguo = row[0].num_tarjeta;
                alumno.buscarAlumnoPorDni(req.body.dni, function(error,row) {
                    if (error) {
                        res.send('error conectando con la base de datos');
                        throw error;
                    } else {
                        if((row.length>0)&&(req.body.dni!=dni_antiguo)){
                            console.log({err:'ese DNI lo tiene un alumno'});
                            res.send({err:'existeDNI'});
                        } else {
                            alumno.buscarAlumnoPorCorreo(req.body.correo, function(error,row){
                                if (error) {
                                    res.send('error conectando con la base de datos');
                                    throw error;
                                } else {
                                   if((row.length>0)&&(req.body.correo!=correo_antiguo)){
                                       console.log({err:'ese correo lo tiene un alumno'});
                                       res.send({err:'existeCorreo'});
                                   } else {
                                        alumno.buscarAlumnoPorTarjeta(req.body.num_tarjeta, function(error,row){
                                            if (error) {
                                                res.send('error conectando con la base de datos');
                                                throw error; 
                                            } else {
                                                if((row.length>0)&&(req.body.num_tarjeta!=num_tarjeta_antiguo)){
                                                    console.log({err:'ese numero de tarjeta lo tiene un alumno'});
                                                    res.send({err:'existeTarjeta'});
                                                } else {
                                                    profesor.buscarProfesorPorDni(req.body.dni, function(error,row) {
                                                        if (error) {
                                                            res.send('error conectando con la base de datos');
                                                            throw error;
                                                        } else {
                                                            if((row.length>0)&&(req.body.dni!=dni_antiguo)){
                                                                console.log({err:'ese DNI lo tiene un profesor'});
                                                                res.send({err:'existeDNI'});
                                                            } else {
                                                                profesor.buscarProfesorPorCorreo(req.body.correo, function(error,row){
                                                                    if (error) {
                                                                        res.send('error conectando con la base de datos');
                                                                        throw error;
                                                                    } else {
                                                                        if((row.length>0)&&(req.body.correo!=correo_antiguo)){
                                                                            console.log({err:'ese correo lo tiene un profesor'});
                                                                            res.send({err:'existeCorreo'});
                                                                        } else {
                                                                            profesor.buscarProfesorPorTarjeta(req.body.num_tarjeta, function(error,row){
                                                                                if (error) {
                                                                                    res.send('error conectando con la base de datos');
                                                                                    throw error; 
                                                                                } else {
                                                                                    if((row.length>0)&&(req.body.num_tarjeta!=num_tarjeta_antiguo)){
                                                                                        console.log({err:'ese numero de tarjeta lo tiene un profesor'});
                                                                                        res.send({err:'existeTarjeta'});
                                                                                    } else {
                                                                                        alumno.modificarAlumnoSinFoto(req.body.id_alumno,req.body.dni,req.body.nombre,req.body.apellidos,req.body.correo,req.body.num_tarjeta,req.body.tarjeta_activada, function(error,row){
                                                                                            if (error) {
                                                                                                throw error;
                                                                                            } else {
                                                                                                res.send(row);
                                                                                            }//.else
                                                                                        })//alumno.modificarAlumnoSinFoto
                                                                                    }//.else
                                                                                }//.else
                                                                            })//profesor.buscarProfesorPorTarjeta
                                                                        }//.else
                                                                    }//.else
                                                                })//profesor.buscarProfesorPorCorreo
                                                            }//.else
                                                        }//.else
                                                    })//profesor.buscarProfesorPorDni
                                                }//.else
                                            }//.else
                                        })//alumno.buscarAlumnoPorTarjeta
                                   }//.else
                                }//.else
                            })//alumno.buscarAlumnoPorCorreo
                        }//.else
                    }//.else
                })//alumno.buscarAlumnoPorDni
            }//.else
        })//alumno.buscarAlumnoPorIdSinFoto
    }//.else
});//router.post('/modificarAlumnoSinFoto

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE alumno por id_alumno
*/
router.post('/borrarAlumno', function(req,res,next){
    var id_alumno = req.body.id_alumno;
    alumno.borrarAlumno(id_alumno, function(error,row) {
        if (error) {
            throw error;
        }else{
            res.send(row);
        }//else
    })//alumno.borrarAlumno
});//router.post('/borrarAlumno

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
* BUSCAR alumno por nombre
*/
router.post('/buscarAlumnoPorNombre', function(req,res,next) {
    var nombre = req.body.nombre;
    alumno.buscarAlumnoPorNombre(nombre, function(error,row) {
        if (error) {
            throw error;
        }else{
            res.send(row);
        }//else
    })//alumno.buscarAlumnoPorNombre
});//router.post('/buscarAlumnoPorNombre

/*
* BUSCAR alumno por id_alumno
*/
router.post('/buscarAlumnoPorId', function(req,res,next) {
    var id_alumno = req.body.id_alumno;
    alumno.buscarAlumnoPorId(id_alumno, function(error,row) {
        if (error) {
            throw error;
        }else{
            res.send(row);
        }//else
    })//alumno.buscarAlumnoPorId
});//router.post('/buscarAlumnoPorId



/*Mostrar todos los alumnos*/
router.post('/buscarTodosLosIdNombreApellidosAlumno', function(req,res,next){
  alumno.buscarTodosLosIdNombreApellidosAlumno(function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarTodosLosIdNombreApellidosAlumno
});//router.post('/mostrarTodosLosProfesoresIdNombreApellidos'

/*
* BUSCAR asignaturas que tiene convalidadas el alumno
*/
router.post('/buscarAsignaturasConvalidadasDelAlumno', function(req,res,next) {
    var id_alumno = req.body.id_alumno;
    alumno.buscarAsignaturasConvalidadasDelAlumno(id_alumno,function(error,row) {
        if (error) {
            throw error;
        }else{
            res.send(row);
        }//else
    })//alumno.buscarAsignaturasConvalidadasDelAlumno
});//router.post('/buscarAsignaturasConvalidadasDelAlumno

/*
* BUSCAR asignaturas que no tiene convalidadas el alumno
*/
router.post('/buscarAsignaturasNoConvalidadasDelAlumno', function(req,res,next) {
    var id_alumno = req.body.id_alumno;
    alumno.buscarAsignaturasNoConvalidadasDelAlumno(id_alumno,function(error,row) {
        if (error) {
            throw error;
        }else{
            res.send(row);
        }//else
    })//alumno.buscarAsignaturasNoConvalidadasDelAlumno
});//router.post('/buscarAsignaturasNoConvalidadasDelAlumno

/****************************************************************************************************************************/

module.exports = router;