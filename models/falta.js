var connection = require('../models/connection');
//var app = require('../app');
var falta = {};

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR falta
*/
falta.agregarFalta = function (fecha,id_alumno,id_horario_grupo,observaciones,callback) {
	if(connection){							
		var falta = { fecha: fecha, id_alumno: id_alumno, id_horario_grupo: id_horario_grupo, observaciones: observaciones };
		var sqlagregarFalta = 'INSERT INTO faltas SET ?';
		connection.query(sqlagregarFalta,falta, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('agregarFalta OK');
			}//else
		});//connection.query
	}//if
}//falta.agregarFalta

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE falta
*/
falta.modificarFalta = function (id_falta,fecha,id_alumno,id_horario_grupo,observaciones,callback) {
	if(connection){							
		var falta = { fecha: fecha, id_alumno: id_alumno, id_horario_grupo: id_horario_grupo, observaciones: observaciones };
		var sqlmodificarFalta = 'UPDATE faltas SET ? WHERE id_falta ="'+id_falta+'"';
		connection.query(sqlmodificarAula,aula, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('modificarFalta OK');
			}//else
		});//connection.query
	}//if
}//falta.modificarFalta

falta.updatePresencia0ATodos = function(callback){
	if (connection) {
		var sql = 'UPDATE alumnos, profesores SET alumnos.presencia = 0, profesores.presencia = 0';
		connection.query(sql,function (error) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				console.log("Presencia a 0 a todos");
			}//else
		});//connection.query
	};//if connection
}//falta.updatePresencia0ATodos

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE falta por id_falta
*/
falta.borrarFalta = function (id_falta,callback) {
	if(connection){							
		connection.query('DELETE FROM faltas WHERE id_falta= "'+id_falta+'"', function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('borrarFalta OK');
			}//else
		});//connection.query
	}//if
}//falta.borrarFalta

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
*	BUSCAR alumno por id_alumno
*/
falta.buscarTodosLosIdFalta = function (callback) {
	if(connection){							
		connection.query('SELECT id_falta FROM faltas', function(error,row){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				var id_FaltaArray = [];
				for (var i= 0;i<row.length;i++){
					var id = row[i].id_falta;
					id_FaltaArray.push(id);
				}//for
				function compareNumbers(a, b) {
					return a - b;
				}//compareNumbers
				id_FaltaArray.sort(compareNumbers);
				callback(null,id_FaltaArray);
				console.log('buscarTodosLosIdFalta OK');
			}//else
		});//connection.query
	}//if
}//falta.buscarTodosLosIdFalta

/*
*	BUSCAR faltas de alumnos no convalidados
*/
falta.buscarFaltasDeAlumnosNoConvalidados = function (dia_semana,hora,callback) {
	if (connection) {
		var sql = 'SELECT a.id_alumno, h.id_horario_grupo FROM alumnos a LEFT JOIN alumno_grupos r ON (a.id_alumno = r.id_alumno) INNER JOIN horario_grupos h ON (r.id_grupo = h.id_grupo) WHERE presencia = 0 AND h.id_horario_grupo IN (SELECT id_horario_grupo FROM horario_grupos WHERE dia_semana = "'+dia_semana+'" and "'+hora+'" BETWEEN hora_inicio AND hora_final) AND a.id_alumno NOT IN (SELECT id_alumno FROM convalidadas WHERE id_asignatura IN (SELECT id_asignatura FROM horario_grupos WHERE id_horario_grupo and (dia_semana="'+dia_semana+'") and ("'+hora+'" between hora_inicio and hora_final)))';
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}
		});//connection.query
	};//if connection
}//falta.buscarFaltasDeAlumnosNoConvalidados

/****************************************************************************************************************************/

module.exports = falta;

