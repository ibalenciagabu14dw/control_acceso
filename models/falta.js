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
falta.modificarFalta = function (id_faltas,fecha,id_alumno,id_horario_grupo,observaciones,callback) {
	if(connection){							
		var falta = { fecha: fecha, id_alumno: id_alumno, id_horario_grupo: id_horario_grupo, observaciones: observaciones };
		var sqlmodificarFalta = 'UPDATE faltas SET ? WHERE id_faltas ="'+id_faltas+'"';
		connection.query(sqlmodificarFalta,falta, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('modificarFalta OK');
				callback(null,{dato:"ok"});
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
falta.borrarFalta = function (id_faltas,callback) {
	if(connection){							
		connection.query('DELETE FROM faltas WHERE id_faltas= "'+id_faltas+'"', function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('borrarFalta OK');
				callback(null,{dato:"ok"});
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

/*
*	Buscar datos necesarios para el envio de correo por falta de asistencia
*/
falta.buscarDatosFaltaAlumno = function (id_alumno,id_horario_grupo,callback) {
	var sql = 'SELECT a.nombre, a.correo, s.clave, l.numero, g.hora_inicio, g.hora_final FROM alumnos a LEFT JOIN alumno_grupos r ON (a.id_alumno = r.id_alumno) INNER JOIN horario_grupos g ON (r.id_grupo = g.id_grupo) INNER JOIN aulas l ON (l.id_aula = g.id_aula) INNER JOIN asignaturas s ON (s.id_asignatura = g.id_asignatura) WHERE a.id_alumno = '+id_alumno+' AND g.id_horario_grupo = '+id_horario_grupo;
	connection.query(sql,function (error,row) {
		if (error) {
			console.log(error);
			throw error;
		}else{
			callback(null,row);
		}//else if connection
	})//connection.query
}//falta.buscarDatosFaltaAlumno 

/*
*	BUSCAR faltas por nombre del alumno
*/
falta.buscarFaltaPorNombreAlumno = function(nombre,callback){
	if(connection){
		var sql = 'SELECT faltas.id_faltas,faltas.fecha,alumnos.nombre,alumnos.apellidos FROM faltas LEFT JOIN alumnos ON faltas.id_alumno = alumnos.id_alumno WHERE alumnos.nombre LIKE ' + connection.escape(nombre+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				console.log(row);
				callback(null,row);
				console.log('buscarFaltaPorNombreAlumno OK');
			}//else
		});//connection.query
	}//if
}//falta.buscarFaltaPorNombreAlumno


/*
* BUSCAR falta por id_falta
*/
falta.buscarFaltaPorId = function (id_faltas,callback) {							
	if(connection){	
		var sql = 'SELECT id_faltas,fecha,id_alumno,id_horario_grupo,observaciones FROM faltas WHERE id_faltas = ' + connection.escape(id_faltas);
		connection.query(sql, function (error, row){
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('buscarFaltaPorId OK');
			}//else
		});//connection.query
	}//if
}//horario_grupo.buscarHorarioGrupoPorId

/*
*	BUSCAR un horario_grupo que ya exista en la base de datos
*/
falta.buscarFaltaExistente = function(fecha,id_alumno,id_horario_grupo,callback){
	if(connection){
		var sql = 'SELECT id_faltas,fecha,id_alumno,id_horario_grupo FROM faltas WHERE fecha ="'+fecha+'" AND id_alumno ="'+id_alumno+'" AND id_horario_grupo ="'+id_horario_grupo+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('buscarFaltaExistente OK');
			}//else
		});//connection.query
	}//if
}//falta.buscarFaltaExistente

/****************************************************************************************************************************/



module.exports = falta;

