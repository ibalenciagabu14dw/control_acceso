var express = require('express');
var router = express.Router();
var profesor = require('../models/profesor');
var alumno = require('../models/alumno');
var multer = require('multer');
var asignatura = require('../models/asignatura');
var aula = require('../models/aula');
var grupo = require('../models/grupo');
var horario_grupo = require('../models/horario_grupo');
var horario_profesor = require('../models/horario_profesor');


/* POST agregar alumno page. */
router.post('/agregarAlumno', multer({}).single('foto'), function(req,res){
	//console.log(req.body); form fields 
	//console.log(req.file); form files
	var dni = req.body.dni;
	var nombre = req.body.nombre;
	var apellidos = req.body.apellidos;
	var correo = req.body.correo;
	var foto = req.file.buffer;
	var num_tarjeta = req.body.num_tarjeta;
	alumno.insertarAlumno(dni,nombre,apellidos,correo,foto,num_tarjeta, function (error) {
		if (error) {
			throw error;
		} else{ 
			//console.log("alumno.insertarAlumno (configFuncionamiento) correctamente");
		}//.else
	});//.alumno.insertarAlumno
});//.router.post('/agregar', multer({}).single('foto')

/*
* devuelve el nombre del alumno(modificarAlumno) FUNCIONA
*/
router.post('/buscarAlumnoNombre', function(req,res,next) {
  var nombre = req.body.nombre;
  alumno.buscarAlumnoPorNombre(nombre, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarProfesorPorNombre
});//get /configPersonas/modificarProfesor/buscarProfesorNombre

/*
* devuelve el id del alumno(modificarAlumno) FUNCIONA
*/
router.post('/buscarAlumnoId', function(req,res,next) {
  var id_alumno = req.body.id_alumno;
  alumno.buscarAlumnoPorId(id_alumno, function(error,row) {
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
router.post('/updateAlumno',multer({}).single('foto'),  function(req,res,next){
  alumno.borrarAlumnoGrupos(req.body.id_alumno, function(error,row) {
      if (error) {
        throw error;
      }else{
         res.send(row);
      }
  })//buscarProfesorPorNombre
  //console.log(req.body);
  var data= req.body.grupo;
    for (var i = 0; i < data.length; i++) {
      alumno.insertarAlumnoGrupos(data[i],req.body.id_alumno, function(error,row) {
          if (error) {
          throw error;
          }else{
          //console.log(row);
          res.send(row);
          }
      })//buscarProfesorPorNombre
    }
    if(req.body.asignatura == undefined){
      //console.log("el alumno no tiene ninguna convalidada");
    } else {
          alumno.borrarAsignaturaConvalidada(req.body.id_alumno, function(error,row) {
              if (error) {
                throw error;
              }else{
                 res.send(row);
              }
          })//buscarProfesorPorNombre
        var data2= req.body.asignatura;
       // console.log(data2.length);
          for (var i = 0; i < data2.length; i++) {
            alumno.insertarAsignaturaConvalidada(data2[i],req.body.id_alumno, function(error,row) {
                if (error) {
                throw error;
                }else{
               // console.log(row);
                res.send(row);
                }
            })//buscarProfesorPorNombre
          }
    }


  var id_alumno = req.body.id_alumno;
  var dni = req.body.dni;
  var nombre = req.body.nombre;
  var apellidos = req.body.apellidos;
  var correo = req.body.correo;
  var tarjeta_activada = req.body.tarjeta_activada;
  var num_tarjeta = req.body.num_tarjeta;

    if(req.file == undefined){

     alumno.modificarAlumnoSinFoto(id_alumno,dni,nombre,apellidos,correo,tarjeta_activada,num_tarjeta, function(error,row) {
        if (error) {
          throw error;
        }else{
          //console.log(row);
          res.send(row);
        }
      })//buscarProfesorPorNombre
    } else {
        var foto = req.file.buffer;
       alumno.modificarAlumno(id_alumno,dni,nombre,apellidos,correo,foto,tarjeta_activada,num_tarjeta, function(error,row) {
          if (error) {
            throw error;
          }else{
            //console.log(row);
            res.send(row);
          }
        })//buscarProfesorPorNombre

    }
    //res.render('configPersonas', { title: 'configPersonas' });  RUTA MAL
});//get /configPersonas/modificarProfesor/buscarProfesorNombre

router.post('/borrarAlumno', function(req,res,next){
  var id_alumno = req.body.id_alumno;
  alumno.borrarAlumno(id_alumno, function(error,row) {
    if (error) {
      throw error;
    }else{
      //console.log(row);
      res.send(row);
    }
  })//buscarProfesorPorNombre
  //res.render('configPersonas', { title: 'configPersonas' });  RUTA MAL
});//get /configPersonas/modificarProfesor/buscarProfesorNombre

/*
* devuelve el nombre del profesor(modificarProfesor) FUNCIONA
*/
router.post('/buscarGruposdelAlumno', function(req,res,next) {
  var id_alumno = req.body.id_alumno;
  grupo.buscarGrupoDelAlumno(id_alumno,function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarGrupoDelAlumno
});//.

router.post('/buscarTodosLosGrupos', function(req,res,next) {
  var id_alumno = req.body.id_alumno;
  grupo.losGruposQueFaltan(id_alumno,function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//losGruposQueFaltan
});//router.post('/buscarTodosLosGrupos', function(req,res,next) {

/* POST agregar profesor page. */
router.post('/agregarProfesor', multer({}).single('foto'), function(req,res){
	var dni = req.body.dni;
	var nombre = req.body.nombre;
	var apellidos = req.body.apellidos;
	var correo = req.body.correo;
	var password = req.body.password;
	var foto = req.file.buffer;
	var num_tarjeta = req.body.num_tarjeta;
	profesor.insertarProfesor(dni,nombre,apellidos,correo,password,foto,num_tarjeta, function (error) {
		if (error) {
			throw error;
		} else{ 
			//console.log("profesor.insertarProfesor (configFuncionamiento) correctamente");
		}//.else
	});//.profesor.insertarProfesor
});//.router.post('/agregarProfesor', multer({}).single('foto')

/*
* devuelve el nombre del profesor(modificarProfesor) FUNCIONA
*/
router.post('/buscarProfesorNombre', function(req,res,next) {
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
router.post('/buscarProfesorId', function(req,res,next) {
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
* devuelve el id del profesor(modificarProfesor) FUNCIONA
*/
router.post('/buscarAsignaturasDelGrupo', function(req,res,next) {
  var id_grupo = req.body.id_grupo;
  grupo.mostrarTodasLasAsignaturasDeUnGrupo(id_grupo, function(error,row) {
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
router.post('/updateProfesor',multer({}).single('foto'),  function(req,res,next){
  profesor.borrarAsignaturasProfesor(req.body.id_profesor, function(error,row) {
      if (error) {
        throw error;
      }else{
         res.send(row);
      }
  })//buscarProfesorPorNombre
  var data= req.body.checkbox;
    for (var i = 0; i < data.length; i++) {
      profesor.insertarAsignaturasProfesor(data[i],req.body.id_profesor, function(error,row) {
          if (error) {
          throw error;
          }else{
          //console.log(row);
          res.send(row);
          }
      })//buscarProfesorPorNombre
    }
      //console.log("file: "+req.file.buffer);
    var id_profesor = req.body.id_profesor;
    var dni = req.body.dni;
    var nombre = req.body.nombre;
    var apellidos = req.body.apellidos;
    var correo = req.body.correo;
    var password = req.body.password;
    var tarjeta_activada = req.body.tarjeta_activada;
    var num_tarjeta = req.body.num_tarjeta;
    var admin = req.body.admin;
      if(req.file == undefined){
          profesor.modificarProfesorSinFoto(id_profesor,dni,nombre,apellidos,correo,password,tarjeta_activada,num_tarjeta,admin, function(error,row) {
            if (error) {
              throw error;
            }else{
              res.send(row);
            }
          })//buscarProfesorPorNombre
      } else {
          var foto = req.file.buffer;
          profesor.modificarProfesor(id_profesor,dni,nombre,apellidos,correo,password,foto,tarjeta_activada,num_tarjeta,admin, function(error,row) {
            if (error) {
              throw error;
            }else{
              res.send(row);
            }
          })//buscarProfesorPorNombre
      }
      //res.render('configPersonas', { title: 'configPersonas' });  RUTA MAL
});//get /configPersonas/modificarProfesor/buscarProfesorNombre


router.post('/borrarProfesor', function(req,res,next){
  var id_profesor = req.body.id_profesor;
  profesor.borrarProfesor(id_profesor, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarProfesorPorNombre
  //res.render('configPersonas', { title: 'configPersonas' });  RUTA MAL
});//get /configPersonas/modificarProfesor/buscarProfesorNombre

/*
* devuelve el nombre del profesor(modificarProfesor) FUNCIONA
*/
router.post('/buscarAsignaturasdelProfesor', function(req,res,next) {
  //console.log(req.body);
  var id_profesor = req.body.id_profesor;
  asignatura.buscarAsignaturasDelProfesor(id_profesor,function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//mostrarTodosLosIdNombreAsigntura
});//router.post('/buscarAsignaturas', function(req,res,next) {


/*
* devuelve el nombre del profesor(modificarProfesor) FUNCIONA
*/
router.post('/buscarTodasLasAsignaturas', function(req,res,next) {
  //console.log(req.body.id_profesor[0]);
  //console.log("estamos aquidos");
  var id_profesor = req.body.id_profesor;
  asignatura.lasAsignaturasQueFaltan(id_profesor,function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//mostrarTodosLosIdNombreAsigntura
});//router.post('/buscarAsignaturas', function(req,res,next) {

  //lasAsignaturasQueFaltanSegunElTipo

/*
* devuelve el nombre del profesor(modificarProfesor) FUNCIONA
*/
router.post('/buscarTodasLasAsignaturasDelTipo', function(req,res,next) {
 // console.log(req.body);
  var id_profesor = req.body.id_profesor;
  var tipo = req.body.tipo;
  asignatura.lasAsignaturasQueFaltanSegunElTipo(id_profesor,tipo,function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//mostrarTodosLosIdNombreAsigntura
});//router.post('/buscarAsignaturas', function(req,res,next) { 

/* POST agregar clase page. */
router.post('/agregarAula', function(req,res){
  var numero = req.body.numero;
  var piso = req.body.piso;
  var capacidad = req.body.capacidad;
    aula.buscarAulaPorNumero(numero, function (error,row) {
    if (error) {
      res.send({err:'bd'});
      throw error;
    } else{
        if (row.length>0){
         res.send({err:'existe'});
        } else {
          aula.insertarAula(numero,piso,capacidad, function (error,row) {
              if (error) {
                res.send({err:'bd'});
                throw error;
              } else{ 
                res.send(row);
              }//.else
          });//.asignatura.insertarAsigntura
        }//. else if (row.length == 0)
    }//.else
  });//.asignatura.buscarAsignaturaPorClave
});//.router.post('/agregarGrupo', function(req,res){

/* POST agregar grupo page. */
router.post('/agregarGrupo', function(req,res,next){
  var nombre = req.body.nombre;
  var tipo = req.body.tipo;
    grupo.buscarGrupoPorNombre(nombre, function (error,row) {
    if (error) {
      res.send({err:'bd'});
      throw error;
    } else{
        if (row.length>0){
         res.send({err:'existe'});
        } else {
          grupo.insertarGrupo(nombre,tipo, function (error,row) {
              if (error) {
                res.send({err:'bd'});
                throw error;
              } else{ 
                res.send(row);
              }//.else
          });//.grupo.insertarGrupo
        }//. else if (row.length == 0)
    }//.else
  });//.grupo.buscarGrupoPorNombre
});//.router.post('/agregarGrupo', function(req,res,next){

router.post('/buscarAsignaturaNombre', function(req,res,next) {
  //console.log(req.body);
  var nombre = req.body.nombre;
  asignatura.buscarAsignaturaPorNombre(nombre, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarAsignaturaPorNombre
});//router.post('/buscarAsignaturaNombre', function(req,res,next) {

router.post('/buscarAsignaturaPorId', function(req,res,next) {
  var id_asignatura = req.body.id_asignatura;
  asignatura.buscarAsignaturaPorId(id_asignatura, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarAsignaturaPorId
});//router.post('/buscarAsignaturaId', function(req,res,next) {

router.post('/borrarAsignatura', function(req,res,next){
  console.log(req.body);
  var id_asignatura = req.body.id_asignatura;
  asignatura.borrarAsigntura(id_asignatura, function(error,row) {
    if (error) {
      throw error;
    }else{
      //console.log(row);
      res.send(row);
    }
  })//borrarAsignatura
});//router.post('/borrarAsignatura', function(req,res,next){

router.post('/updateAsignatura',  function(req,res,next){
    var id_asignatura = req.body.id_asignatura;
    var nombre = req.body.nombre;
    var clave = req.body.clave;
    var obligatoria = req.body.obligatoria;
    var tipo = req.body.tipo;
          asignatura.buscarAsignaturaPorIdClave(id_asignatura,clave, function (error,row) {
            if (error) {
              res.send({err:'bd'});
              throw error;
            } else{
                if (row.length>0){
                     asignatura.modificarAsigntura(id_asignatura,nombre,clave,obligatoria,tipo, function(error,row) {
                          if (error) {
                            res.send({err:'bd'});
                            throw error;
                          } else{ 
                            res.send(row);
                          }//.else
                      });//.asignatura.insertarAsigntura
                } else {
               asignatura.buscarAsignaturaPorClave(clave, function (error,row) {
                  if (error) {
                    res.send({err:'bd'});
                    throw error;
                  } else{
                    //console.log(row);
                      if (row.length>0){
                       // res.render('agregarAsignatura', { title: 'agregarAsignatura', info: 'Clave existente'}); 
                       res.send({err:'existe'});
                      } else {
                asignatura.modificarAsigntura(id_asignatura,nombre,clave,obligatoria,tipo, function(error,row) {
                    if (error) {
                      res.send({err:'bd'});
                      throw error;
                    } else{ 
                      res.send(row);
                    }//.else
                  });//.asignatura.insertarAsigntura
                    }//.else
                  }//.else
                });//.asignatura.buscarAsignaturaPorClave
        }//. else
    }//.else
  });//.asignatura.buscarAsignaturaPorClave
});//router.post('/updateAsignatura',  function(req,res,next){

router.post('/updateAula',  function(req,res,next){
    var id_aula = req.body.id_aula;
    var numero = req.body.numero;
    var piso = req.body.piso;
    var capacidad = req.body.capacidad;
          aula.buscarAulaPorIdNumero(id_aula,numero, function (error,row) {
            if (error) {
              res.send({err:'bd'});
              throw error;
            } else{
                if (row.length>0){
                     aula.modificarAula(id_aula,numero,piso,capacidad, function(error,row) {
                          if (error) {
                            res.send({err:'bd'});
                            throw error;
                          } else{ 
                            res.send(row);
                          }//.else
                      });//.aula.modificarAula
                } else {
               aula.buscarAulaPorNumero(numero, function (error,row) {
                  if (error) {
                    res.send({err:'bd'});
                    throw error;
                  } else{
                      if (row.length>0){
                       res.send({err:'existe'});
                      } else {
                aula.modificarAula(id_aula,numero,piso,capacidad, function(error,row) {
                    if (error) {
                      res.send({err:'bd'});
                      throw error;
                    } else{ 
                      res.send(row);
                    }//.else
                  });//.asignatura.insertarAsigntura
                    }//.else
                  }//.else
                });//.asignatura.buscarAsignaturaPorClave
        }//. else
    }//.else
  });//.asignatura.buscarAsignaturaPorClave
});//router.post('/updateAsignatura',  function(req,res,next){

router.post('/buscarAulaNumero', function(req,res,next) {
  var numero = req.body.numero;
  aula.buscarAulaPorNumero(numero, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarAsignaturaPorNombre
});//router.post('/buscarAsignaturaNombre', function(req,res,next) {

router.post('/buscarAulaPorId', function(req,res,next) {
  var id_aula = req.body.id_aula;
  aula.buscarAulaPorId(id_aula, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarAsignaturaPorId
});//router.post('/buscarAsignaturaId', function(req,res,next) {

router.post('/borrarAula', function(req,res,next){
  var id_aula = req.body.id_aula;
  aula.borrarAula(id_aula, function(error,row) {
    if (error) {
      throw error;
    }else{
      //console.log(row);
      res.send(row);
    }
  })//borrarAsignatura
});//router.post('/borrarAsignatura', function(req,res,next){

router.post('/updateGrupo',  function(req,res,next){
    var id_grupo = req.body.id_grupo;
    var nombre = req.body.nombre;
    var tipo = req.body.tipo;
          grupo.buscarGrupoPorIdNombre(id_grupo,nombre, function (error,row) {
            if (error) {
              res.send({err:'bd'});
              throw error;
            } else{
                if (row.length>0){
                     grupo.modificarGrupo(id_grupo,nombre,tipo, function(error,row) {
                          if (error) {
                            res.send({err:'bd'});
                            throw error;
                          } else{ 
                            res.send(row);
                          }//.else
                      });//.asignatura.insertarAsigntura
                } else {
               grupo.buscarGrupoPorNombre(nombre, function (error,row) {
                  if (error) {
                    res.send({err:'bd'});
                    throw error;
                  } else{
                    //console.log(row);
                      if (row.length>0){
                       // res.render('agregarAsignatura', { title: 'agregarAsignatura', info: 'Clave existente'}); 
                       res.send({err:'existe'});
                      } else {
                  grupo.modificarGrupo(id_grupo,nombre,tipo, function(error,row) {
                    if (error) {
                      res.send({err:'bd'});
                      throw error;
                    } else{ 
                      res.send(row);
                    }//.else
                  });//.grupo.modificarGrupo
                    }//.else
                  }//.else
                });//.grupo.buscarGrupoPorNombre
        }//. else
    }//.else
  });//.grupo.buscarGrupoPorIdNombre
});//router.post('/updateAsignatura',  function(req,res,next){

router.post('/buscarGrupoNombre', function(req,res,next) {
  var nombre = req.body.nombre;
  grupo.buscarGrupoPorNombre(nombre, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//grupo.buscarGrupoPorNombre
});//router.post('/buscarGrupoNombre', function(req,res,next) {

router.post('/buscarGrupoPorId', function(req,res,next) {
  var id_grupo = req.body.id_grupo;
  grupo.buscarGrupoPorId(id_grupo, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//grupo.buscarGrupoPorId
});//router.post('/buscarGrupoPorId', function(req,res,next) {

router.post('/borrarGrupo', function(req,res,next){
  var id_grupo = req.body.id_grupo;
  grupo.borrarGrupo(id_grupo, function(error,row) {
    if (error) {
      throw error;
    }else{
      //console.log(row);
      res.send(row);
    }
  })//borrarGrupo
});//router.post('/borrarGrupo', function(req,res,next){  

router.get('/config/configGlobal/configHorario/agregarHorarioGrupo', function(req, res, next) {
  aula.mostrarTodosLosIdNumeroAula(function (error,aul) {
    if (error) {
      console.log("Fallo mostrarTodosLosIdAula");
      throw error;
    }else{  
    asignatura.mostrarTodosLosIdNombreAsigntura(function (error,asign) {
      if (error) {
        console.log("Fallo mostrarTodosLosIdNombreAsigntura");
        throw error;
      }else{
        grupo.mostrarTodosLosIdNombreGrupo(function (error,gru){
                    if (error) {
                      console.log("Fallo");
                      throw error;
                    }else{
                      //console.log(data);                
                      //res.send(data);
                      res.render('agregarHorarioGrupo',{ 
                      grupo:gru,
                      asignatura:asign,
                      aula:aul,
                      })//.res.render
                    }//else error
        });////. grupo.mostrarTodosLosIdGrupo
      }//.else
    });//profesor.buscarProfesorPorId
  }//.else
  });//.mostrarTodosLosIdAula
});//.router.get('/agregarHorarioGr', function(req, res, next) {

router.post('/agregarHorarioGrupo', function(req,res,next){
  var dia_semana = req.body.dia;
  var hora_inicio = req.body.hora_inicio;
  var hora_final = req.body.hora_final;
  var id_grupo = req.body.id_grupo;
  var id_asignatura = req.body.id_asignatura;
  var id_aula = req.body.id_aula;     
    horario_grupo.buscarHorarioGrupoIgual(dia_semana,hora_inicio,hora_final,id_grupo,id_asignatura,id_aula, function (error,row) {
    if (error) {
      res.send({err:'bd'});
      throw error;
    } else{
        if (row.length>0){
         res.send({err:'existe'});
        } else {
          horario_grupo.insertarHorarioGrupo(dia_semana,hora_inicio,hora_final,id_grupo,id_asignatura,id_aula, function (error,row) {
              if (error) {
                res.send({err:'bd'});
                throw error;
              } else{ 
                res.send(row);
              }//.else
          });//.horario_grupo.insertarHorarioGrupo
        }//. else if (row.length == 0)
    }//.else
  });//.horario_grupo.buscarHorarioGrupoIgual
});//.router.post('/agregarHorarioGrupo', function(req,res,next){

router.get('/config/configGlobal/configHorario/agregarHorarioProfesor', function(req, res, next) {
  horario_grupo.mostrarTodosLosIdHoraDiaHorarioGrupo(function (error,gru) {
    if (error) {
      console.log("Fallo mostrarTodosLosIdHoraDiaHorarioGrupo");
      throw error;
    }else{  
        profesor.mostrarTodosLosIdNombreApellidosProfesor(function (error,pro){
                    if (error) {
                      console.log("Fallo");
                      throw error;
                    }else{
                      //console.log(data);                
                      //res.send(data);
                      res.render('agregarHorarioProfesor',{ 
                      grupo:gru,
                      profesor:pro,
                      })//.res.render
                    }//else error
        });////. grupo.mostrarTodosLosIdGrupo
  }//.else
  });//.mostrarTodosLosIdAula
});//.router.get('/agregarHorarioGr', function(req, res, next) {


router.post('/buscarHorarioGrupoHorarioProfesor', function(req,res,next) {
  var id_horario_grupo = req.body.id_horario_grupo;
  horario_grupo.buscarHorarioGrupoPorId(id_horario_grupo, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarHorarioGrupoPorId
});//router.post('/buscarHorarioGrupoHorarioProfesor', function(req,res,next) {

router.post('/agregarHorarioProfesor', function(req,res,next){
  var dia_semana = req.body.dia;
  var hora_inicio = req.body.hora_inicio;
  var hora_final = req.body.hora_final;
  var id_profesor = req.body.id_profesor;
  var id_horario_grupo = req.body.id_horario_grupo;     
    horario_profesor.buscarHorarioProfesorIgual(dia_semana,hora_inicio,hora_final,id_profesor, function (error,row) {
    if (error) {
      res.send({err:'bd'});
      throw error;
    } else{
        if (row.length>0){
         res.send({err:'existe'});
        } else {
          horario_profesor.insertarHorarioProfesor(dia_semana,hora_inicio,hora_final,id_profesor,id_horario_grupo, function (error,row) {
              if (error) {
                res.send({err:'bd'});
                throw error;
              } else{ 
                res.send(row);
              }//.else
          });//.horario_profesor.insertarHorarioProfesor
        }//. else if (row.length == 0)
    }//.else
  });//.horario_profesor.buscarHorarioProfesorIgual
});//.router.post('/agregarHorarioProfesor', function(req,res,next){

router.post('/updateHorarioGrupo',  function(req,res,next){//FALTA EDITAR
  var dia_semana = req.body.dia;
  var hora_inicio = req.body.hora_inicio;
  var hora_final = req.body.hora_final;
  var id_grupo = req.body.id_grupo;
  var id_asignatura = req.body.id_asignatura;
  var id_aula = req.body.id_aula;     
    horario_grupo.buscarHorarioGrupoIgual(dia_semana,hora_inicio,hora_final,id_grupo,id_asignatura,id_aula, function (error,row) {
    if (error) {
      res.send({err:'bd'});
      throw error;
    } else{
        if (row.length>0){
         res.send({err:'existe'});
        } else {
          horario_grupo.modificarHorarioGrupo(dia_semana,hora_inicio,hora_final,id_grupo,id_asignatura,id_aula, function (error,row) {
              if (error) {
                res.send({err:'bd'});
                throw error;
              } else{ 
                res.send(row);
              }//.else
          });//.horario_grupo.insertarHorarioGrupo
        }//. else if (row.length == 0)
    }//.else
  });//.horario_grupo.buscarHorarioGrupoIgual
});//.router.post('/agregarHorarioGrupo', function(req,res,next){

router.post('/buscarHorarioGrupoNombre', function(req,res,next) {//FALTA EDITAR
  var nombre = req.body.nombre;
  console.log(req.body);
  horario_grupo.buscarHorarioGrupoPorNombredelGrupo(nombre, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//horario_grupo.buscarHorarioGrupoPorNombredelGrupo
});//router.post('/buscarHorarioGrupoNombre', function(req,res,next) {

router.post('/buscarHorarioGrupoPorId', function(req,res,next) {//FALTA EDITAR
  var id_horario_grupo = req.body.id_horario_grupo;
  horario_grupo.buscarHorarioGrupoPorId(id_horario_grupo, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//grupo.buscarGrupoPorId
});//router.post('/buscarGrupoPorId', function(req,res,next) {

router.post('/borrarGrupo', function(req,res,next){//FALTA EDITAR
  var id_horario_grupo = req.body.id_horario_grupo;
  horario_grupo.borrarHorarioGrupo(id_horario_grupo, function(error,row) {
    if (error) {
      throw error;
    }else{
      //console.log(row);
      res.send(row);
    }
  })//borrarGrupo
});//router.post('/borrarGrupo', function(req,res,next){  

module.exports = router;


