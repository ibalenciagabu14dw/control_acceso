var express = require('express');
var router = express.Router();
var profesor = require('../models/profesor');
var alumno = require('../models/alumno');

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
      console.log(row);
      res.send(row);
    }
  })//buscarProfesorPorNombre
});//get /configPersonas/modificarProfesor/buscarProfesorNombre


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