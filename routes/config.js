var express = require('express');
var router = express.Router();

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

/*
router.get('/configPersonas/agregarProfesores', function(req, res, next) {
  res.render('agregarProfesores', { title: 'agregarProfesores' });
});
*/
router.get('/configPersonas/modificarPersonas', function(req, res, next) {
  res.render('modificarPersonas', { title: 'modificarPersonas' });
});

/*router.get('/configPersonas/modificarProfesores', function(req, res, next) {
  res.render('modificarProfesores', { title: 'modificarProfesores' });
});
*/

router.get('/configPersonas/borrarPersonas', function(req, res, next) {
  res.render('borrarPersonas', { title: 'borrarPersonas' });
});

/*router.get('/configPersonas/borrarProfesores', function(req, res, next) {
  res.render('borrarProfesores', { title: 'borrarProfesores' });
});
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