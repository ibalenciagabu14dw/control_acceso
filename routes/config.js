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

router.get('/configGlobal/configAulas/agregarAulas', function(req, res, next) {
  res.render('agregarAulas', { title: 'agregarAulas' });
});

router.get('/configGlobal/configGrupos', function(req, res, next) {
  res.render('configGrupos', { title: 'configGrupos' });
});

router.get('/configGlobal/configGrupos/agregarGrupos', function(req, res, next) {
  res.render('agregarGrupos', { title: 'agregarGrupos' });
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
