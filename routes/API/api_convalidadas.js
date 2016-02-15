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

/*
* UPDATE convalidadas OK
*/
router.post('/modificarConvalidadas', function(req, res, next) {
    
    var id_alumno_antiguo;
    var id_asignatura_antiguo;

    convalidadas.buscarConvalidadasPorIdConvalidada(req.query.id_convalidada, function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('No hay ninguna convalidada con ese id');
            }else{
                id_alumno_antiguo = row[0].id_alumno;
                id_asignatura_antiguo = row[0].id_asignatura;

                convalidadas.buscarConvalidadaPorIdAlumnoYIdAsignatura(req.query.id_alumno,req.query.id_asignatura, function(error,row){
                    if((row.length>0)&&((id_alumno_antiguo!=req.query.id_alumno)&&(id_asignatura_antiguo!=req.query.id_asignatura))){
                        res.send('ese alumno ya tiene convalidada esa asignatura');
                    }
                    else{
                        convalidadas.modificarConvalidadas(req.query.id_convalidada,req.query.id_alumno,req.query.id_asignatura,function(error,row){
                            if (error) {
                                res.send(error);
                                throw error;
                            }else {
                                res.send('convalidada modificada correctamente');
                            }//else
                        });//convaliadas.modificarConvalidadas
                    }//else
                })//convalidadas.buscarConvalidadaPorIdAlumnoYIdAsignatura
            }//else
        }//else
    })//convalidadas.buscarConvalidadasPorIdConvalidada
});//router.post('/modificarConvalidadas

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE convalidada por id_convalidadas OK
*/
router.post('/borrarAsignaturaConvalidada', function(req, res, next) {
    convalidadas.buscarConvalidadasPorIdConvalidada(req.query.id_convalidada, function(error,row) {
        if (error) {
            res.send(error);
            throw error;
        }else{
            if(row.length==0){
                res.send('Ese id_convalidada no existe');
            }else{
                convalidadas.borrarAsignaturaConvalidada(req.query.id_convalidada, function(error,row) {
                    if (error) {
                        res.send('error borrando asignatura convalidada');
                        throw error;
                    }else{
                        res.send('convalidada borrada correctamente');
                    }//else
                })//convalidadas.borrarAsignaturaConvalidada
            }//else
        }//else
    })//convalidadas.buscarConvalidadasPorIdConvalidada
});//router.post('/borrarAsignaturaConvalidada


/****************************************************************************************************************************/

module.exports = router;