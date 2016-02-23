var connection = require('../models/connection');
var time = require('../models/time');
var app = require('../app');

var horario_profesor = {};
var day;

time.diaDeLaSemana(function (error,data) {
	if (error) {
		throw error;
	}else{
		day = data;
	}
});

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR horario_profesor
*/
horario_profesor.agregarHorarioProfesor = function (dia_semana, hora_inicio, hora_final, id_profesor, id_horario_grupo,callback) {							
	if(connection){
		var horario_profesor = { dia_semana:dia_semana, hora_inicio:hora_inicio, hora_final:hora_final, id_profesor:id_profesor, id_horario_grupo:id_horario_grupo };
		var sqlagregarHorarioProfesor = 'INSERT INTO horario_profesores SET ?';
		connection.query(sqlagregarHorarioProfesor,horario_profesor, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//horario_profesor.agregarHorarioProfesor

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE horario_profesor
*/
horario_profesor.modificarHorarioProfesor = function (id_horario_profesor,dia_semana, hora_inicio, hora_final, id_profesor, id_horario_grupo,callback) {							
	if(connection){	
		var horario_profesor = { id_horario_profesor:id_horario_profesor,dia_semana:dia_semana, hora_inicio:hora_inicio, hora_final:hora_final, id_profesor:id_profesor, id_horario_grupo:id_horario_grupo };
		var sqlmodificarHorarioProfesor = 'UPDATE horario_profesores SET ? WHERE id_horario_profesor ="'+id_horario_profesor+'"';
		connection.query(sqlmodificarHorarioProfesor,horario_profesor, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//horario_profesor.modificarHorarioProfesor

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE horario_profesor
*/
horario_profesor.borrarHorarioProfesor = function (id_horario_profesor,callback) {							
	if(connection){	
		connection.query('DELETE FROM horario_profesores WHERE id_horario_profesor= "'+id_horario_profesor+'"', function(error){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//horario_profesor.borrarHorarioProfesor

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
* BUSCAR horario_profesor por id_horario_profesor
*/
horario_profesor.buscarHorarioProfesorPorId = function (id_horario_profesor,callback) {							
	if(connection){	
		var sql = 'SELECT id_horario_profesor,dia_semana,hora_inicio,hora_final,id_profesor,id_horario_grupo FROM horario_profesores WHERE id_horario_profesor = ' + connection.escape(id_horario_profesor);
		connection.query(sql, function (error, row){
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//horario_profesor.buscarHorarioProfesorPorId

/*
* BUSCAR horario_profesor por nombre del profesor
*/
horario_profesor.buscarHorarioProfesorPorNombre = function(nombre,callback){
	if(connection){
		var sql = 'SELECT horario_profesores.id_horario_profesor, horario_profesores.dia_semana, horario_profesores.hora_inicio, horario_profesores.hora_final, profesores.nombre AS nombreProfesor,profesores.apellidos,profesores.foto, aulas.numero, grupos.nombre_grupo, asignaturas.nombre AS nombreAsignatura FROM horario_profesores LEFT JOIN profesores ON horario_profesores.id_profesor = profesores.id_profesor LEFT JOIN horario_grupos ON horario_profesores.id_horario_grupo = horario_grupos.id_horario_grupo LEFT JOIN asignaturas ON horario_grupos.id_asignatura = asignaturas.id_asignatura LEFT JOIN aulas ON horario_grupos.id_aula = aulas.id_aula LEFT JOIN grupos ON horario_grupos.id_grupo = grupos.id_grupo WHERE profesores.nombre LIKE ' + connection.escape(nombre+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				for (i=0;i<row.length;i++){
					row[i].foto = row[i].foto.toString('base64');
				}
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//horario_profesor.buscarHorarioProfesorPorNombre

/*
* BUSCAR todos los id_horario_profesor
*/
horario_profesor.buscarTodosLosIdHorarioProfesor = function (callback) {							
	if(connection){	
		connection.query('SELECT id_horario_profesor FROM horario_profesores', function(error,row){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				var id_HorarioProfesorArray = [];
				for (var i= 0;i<row.length;i++){
					id_HorarioProfesorArray.push(row[i].id_horario_profesor);
				}//for
				function compareNumbers(a, b) {
					return a - b;
				}//compareNumbers
				id_HorarioProfesorArray.sort(compareNumbers);
				callback(null,id_HorarioProfesorArray);
			}//else
		});//connection.query
	}//if
}//horario_profesor.buscarTodosLosIdHorarioProfesor

/*
*	BUSCAR un horario_profesor que ya exista en la base de datos
*/
horario_profesor.buscarHorarioProfesorExistente = function(dia_semana,hora_inicio,hora_final,id_profesor,callback){
	if(connection){
		var sql = 'SELECT id_horario_profesor,dia_semana,hora_inicio,hora_final,id_profesor,id_horario_grupo FROM horario_profesores WHERE dia_semana ="'+dia_semana+'" AND hora_inicio ="'+hora_inicio+'" AND hora_final ="'+hora_final+'" AND id_profesor ="'+id_profesor+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//horario_profesor.buscarHorarioProfesorExistente

/****************************************************************************************************************************/

module.exports = horario_profesor;

