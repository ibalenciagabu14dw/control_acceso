var express = require('express');
var router = express.Router();
var profesor = require('../models/profesor');
var alumno = require('../models/alumno');
var multer = require('multer');
var bodyParser = require('body-parser')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('config', { title: 'Configuracion' });
});

router.get('/configPersonas', function(req, res, next) {
  res.render('configPersonas', { title: 'configPersonas' });
});

router.get('/configPersonas/agregarPersonas', function(req, res, next) {
  res.render('agregarPersonas', { title: 'agregarPersonas' });
});

router.get('/configPersonas/agregarProfesor', function(req, res, next) {
  res.render('agregarProfesor', { title: 'agregarProfesor' });
});

router.get('/configPersonas/modificarPersonas', function(req, res, next) {
  res.render('modificarPersonas', { title: 'modificarPersonas' });
});

router.get('/configPersonas/modificarProfesor', function(req, res, next) {
  res.render('modificarProfesor', { title: 'modificarProfesor' });
});

/*
* devuelve el nombre del profesor(modificarProfesor) FUNCIONA
*/
router.post('/configPersonas/buscarProfesorNombre', function(req,res,next) {
  var nombre = req.body.nombre;
  profesor.buscarProfesorPorNombre(nombre, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarProfesorPorNombre
});//get /configPersonas/modificarProfesor/buscarProfesorNombre

/*
* devuelve el id del profesor(modificarProfesor) FUNCIONA
*/
router.post('/configPersonas/buscarProfesorId', function(req,res,next) {
  var id_profesor = req.body.id_profesor;
 // console.log("id: "+ id_profesor);
  profesor.buscarProfesorPorId2(id_profesor, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarProfesorPorNombre
});//get /configPersonas/modificarProfesor/buscarProfesorNombre

/*
* UPDATE PROFESOR COMPROBAR
*/
router.post('/configPersonas/updateProfesor', multer({}).single('File'), function(req,res,next){
  console.log("file: "+req.File);
    //console.log("file: "+req.file.buffer);
  var id_profesor = req.body.id_profesor;
  var dni = req.body.dni;
  var nombre = req.body.nombre;
  var apellidos = req.body.apellidos;
  var correo = req.body.correo;
  var password = req.body.password;
  var foto = req.file;
  var tarjeta_activada = req.body.tarjeta_activada;
  var num_tarjeta = req.body.num_tarjeta;
  var admin = req.body.admin;
 console.log("id: "+ id_profesor);
 console.log("dni: "+ dni);
 console.log("nombre: "+ nombre);
 console.log("apellidos: "+ apellidos);
 console.log("correocorreo: "+ correo);
 console.log("password: "+ password);
 console.log("foto: "+ foto);
 console.log("tarjeta_activada: "+ tarjeta_activada);
 console.log("num_tarjeta: "+ num_tarjeta);
 console.log("admin: "+ admin);
  profesor.modificarProfesor(id_profesor,dni,nombre,apellidos,correo,password,foto,tarjeta_activada,num_tarjeta,admin, function(error,row) {
    if (error) {
      throw error;
    }else{
      console.log(row);
      res.send(row);
    }
  })//buscarProfesorPorNombre
});//get /configPersonas/modificarProfesor/buscarProfesorNombre

/*
router.get('/configPersonas/borrarPersonas', function(req, res, next) {
        alumno.mostrarTodosLosIdAlumno(function (error,id_alumnoArray){
                  if (error) {
                    console.log("Fallo");
                    throw error;
                  }else{
                    //console.log(data);
                    //res.send(data);
                    res.render("borrarPersonas",{ 
                    id_alumno: id_alumnoArray,
                    })//.res.render
                  }//else error
      });////.alumno.mostrarTodosLosIdAlumno
});//.router.get('/configPersonas/borrarPersonas', function(req, res, next) {

router.get('/configPersonas/borrarProfesor', function(req, res, next) {
        profesor.mostrarTodosLosIdProfesor(function (error,id_profesorArray){
                  if (error) {
                    console.log("Fallo");
                    throw error;
                  }else{
                    //console.log(data);
                    //res.send(data);
                    res.render("borrarProfesor",{ 
                    id_profesor: id_profesorArray,
                    })//.res.render
                  }//else error
      });////.profesor.mostrarTodosLosIdProfesor
});//.router.get('/configPersonas/borrarProfesor', function(req, res, next) {

*/

router.get('/configDispositivos', function(req, res, next) {
  res.render('configDispositivos', { title: 'configDispositivos' });
});

router.get('/configGlobal', function(req, res, next) {
  res.render('configGlobal', { title: 'configGlobal' });
});

router.get('/configGlobal/configClases', function(req, res, next) {
  res.render('configClases', { title: 'configClases' });
});

router.get('/configGlobal/configMaterias', function(req, res, next) {
  res.render('configMaterias', { title: 'configMaterias' });
});

router.get('/configGlobal/configHorario', function(req, res, next) {
  res.render('configHorario', { title: 'configHorario' });
});

router.get('/configGlobal/configApariencia', function(req, res, next) {
  res.render('configApariencia', { title: 'configApariencia' });
});

router.get('/configGlobal/configBasedeDatos', function(req, res, next) {
  res.render('configBasedeDatos', { title: 'configBasedeDatos' });
});

module.exports = router;
