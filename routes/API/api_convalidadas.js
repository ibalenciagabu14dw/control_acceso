var express = require('express');
var router = express.Router();
var time = require('../../models/time');
var aula = require('../../models/aula')
var alumno = require('../../models/alumno');
var alumno_grupos = require('../../models/alumno_grupos');
var asignatura = require('../../models/asignatura');
var convalidadas = require('../../models/convalidadas');
var profesor = require('../../models/profesor');

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR convalidada OK
*/
router.post('/agregarAsignaturaConvalidada', function(req, res, next) {
    aula.buscarAulaPorNumero(req.query.numero, function (error,row) {
        if (error) {
            res.send('error conectando con la base de datos');
            throw error;
        }else{
            if(row.length>0){
                res.send('ese numero de aula ya existe');
            }else{
                aula.agregarAula(req.query.numero,req.query.piso,req.query.capacidad, function (error,row) {
                    if (error) {
                        res.send('error agregando la aula');
                        throw error;
                    }else{
                        res.send('aula agregada correctamente');
                    }//else
                });//aula.agregarAula
            }//else
        }//else
    });//aula.buscarAulaPorNumero
});//router.post('/agregarAsignaturaConvalidada

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/



/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE aula por id_aula OK
*/
router.post('/borrarAsignaturaConvalidada', function(req, res, next) {
    aula.buscarAulaPorId(req.query.id_aula, function(error,row) {
        if (error) {
            res.send('error conectando con la base de datos');
            throw error;
        }else{
            if(row.length==0){
                res.send('Ese id no existe');
            }else{
                aula.borrarAula(req.query.id_aula, function(error,row) {
                    if (error) {
                        throw error;
                        res.send('error borrando aula');
                    }else{
                        res.send('aula borrada correctamente');
                    }//else
                })//aula.borrarAula
            }//else
        }//else
    })//aula.buscarAulaPorId
});//router.post('/borrarAula


/****************************************************************************************************************************/

module.exports = router;