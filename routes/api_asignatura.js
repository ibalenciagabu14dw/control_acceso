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


module.exports = router;