var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('config', { title: 'Configuracion' });
});

router.get('/configPersonas', function(req, res, next) {
  res.render('configPersonas', { title: 'configPersonas' });
});

router.get('/configPersonas/agregarAlumno', function(req, res, next) {
  res.render('agregarAlumno', { title: 'agregarAlumno' });
});

router.get('/configPersonas/agregarProfesor', function(req, res, next) {
  res.render('agregarProfesor', { title: 'agregarProfesor' });
});

router.get('/configPersonas/modificarAlumno', function(req, res, next) {
  res.render('modificarAlumno', { title: 'modificarAlumno' });
});

router.get('/configPersonas/modificarProfesor', function(req, res, next) {
  res.render('modificarProfesor', { title: 'modificarProfesor' });
});

router.get('/configDispositivos', function(req, res, next) {
  res.render('configDispositivos', { title: 'configDispositivos' });
});

router.get('/configGlobal', function(req, res, next) {
  res.render('configGlobal', { title: 'configGlobal' });
});

router.get('/configGlobal/configAulas', function(req, res, next) {
  res.render('configAulas', { title: 'configAulas' });
});

router.get('/configGlobal/configAulas/agregarAula', function(req, res, next) {
  res.render('agregarAula', { title: 'agregarAula' });
});

router.get('/configGlobal/configAulas/modificarAula', function(req, res, next) {
  res.render('modificarAula', { title: 'modificarAula' });
});

router.get('/configGlobal/configAulas/eliminarAula', function(req, res, next) {
  res.render('eliminarAula', { title: 'eliminarAula' });
});

router.get('/configGlobal/configGrupos', function(req, res, next) {
  res.render('configGrupos', { title: 'configGrupos' });
});

router.get('/configGlobal/configGrupos/agregarGrupo', function(req, res, next) {
  res.render('agregarGrupo', { title: 'agregarGrupo' });
});

router.get('/configGlobal/configGrupos/modificarGrupo', function(req, res, next) {
  res.render('modificarGrupo', { title: 'modificarGrupo' });
});

router.get('/configGlobal/configGrupos/eliminarGrupo', function(req, res, next) {
  res.render('eliminarGrupo', { title: 'eliminarGrupo' });
});

router.get('/configGlobal/configAsignaturas', function(req, res, next) {
  res.render('configAsignaturas', { title: 'configAsignaturas' });
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
