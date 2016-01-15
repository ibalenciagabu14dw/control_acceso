//MODELO HORARIO_PROFESOR COMPROBAR

var connection = require('../models/connection');
var time = require('../models/time');
var app = require('../app');

var horario_profesor = {};
var day;
console.log(app);

time.diaDeLaSemana(function (error,data) {
	if (error) {
		throw error;
	}else{
		day = data;
	}
});

/*
*	agrega un horario_profesor a la tabla horario_profesores (dia_semana, hora_inicio, hora_final, id_profesor, id_horario_grupo) COMPROBAR
*/
horario_profesor.insertarHorarioProfesor = function (dia_semana, hora_inicio, hora_final, id_profesor, id_horario_grupo,callback) {							
	var aula = { dia_semana:dia_semana, hora_inicio:hora_inicio, hora_final:hora_final, id_profesor:id_profesor, id_horario_grupo:id_horario_grupo };
	var sqlinsertarHorarioProfesor = 'INSERT INTO horario_profesores SET ?';
	connection.query(sqlinsertarHorarioProfesor,horario_profesor, function(error){
	  if (error) {
			throw error;
		}else{
			console.log('insertarHorarioProfesor correctamente');
		}//.else
	});//.connection.query
}//.horario_profesor.insertarHorarioProfesor

/*
*	modificar un horario_profesor en la tabla horario_profesores (id_horario_profesor,dia_semana, hora_inicio, hora_final, id_profesor, id_horario_grupo) con el id_horario_profesor COMPROBAR
*/
horario_profesor.modificarHorarioProfesor = function (id_horario_profesor,dia_semana, hora_inicio, hora_final, id_profesor, id_horario_grupo,callback) {							
	var horario_profesor = { id_horario_profesor:id_horario_profesor,dia_semana:dia_semana, hora_inicio:hora_inicio, hora_final:hora_final, id_profesor:id_profesor, id_horario_grupo:id_horario_grupo };
	var sqlmodificarHorarioProfesor = 'UPDATE horario_profesores SET ? WHERE id_horario_profesor ="'+id_horario_profesor+'"';
	connection.query(sqlmodificarHorarioProfesor,horario_profesor, function(error){
	  if (error) {
			throw error;
			console.log(error);
		}else{
			console.log('modificarHorarioProfesor correctamente');
		}//.else
	});//.connection.query
}//.horario_profesor.modificarHorarioProfesor

/*
*	borrar una horario_profesor en la tabla horario_profesores con el id_horario_profesor COMPROBAR
*/
horario_profesor.borrarHorarioProfesor = function (id_horario_profesor,callback) {							
	connection.query('DELETE FROM horario_profesores WHERE id_horario_profesor= "'+id_horario_profesor+'"', function(error){
	  if (error) {
			throw error;
			console.log(error);
		}else{
			console.log('borrarHorarioProfesor correctamente');
		}//.else
	});//.connection.query
}//.horario_profesor.borrarHorarioProfesor

/*
*	muestra todos los id_horario_profesor de la tabla horario_profesores COMPROBAR
*/
horario_profesor.mostrarTodosLosIdHorarioProfesor = function (callback) {							
	connection.query('SELECT id_horario_profesor FROM horario_profesores', function(error,row){
	  if (error) {
			throw error;
			console.log(error);
		}else{
			//console.log(row);
			var id_HorarioProfesorArray = [];
			for (var i= 0;i<row.length;i++){
					//console.log ("row : " + row[i].id_horario_profesor);
					id_HorarioProfesorArray.push(row[i].id_horario_profesor);
				}//.for (var i= 0;i<row.length;i++)
					//console.log(id_HorarioProfesorArray);
					function compareNumbers(a, b) {
					  return a - b;
					} 
					id_HorarioProfesorArray.sort(compareNumbers);
					//console.log("sort: " + id_HorarioProfesorArray);
				callback(null,id_HorarioProfesorArray);
			console.log('mostrarTodosLosIdHorarioProfesor correctamente');
		}//.else
	});//.connection.query
}//.horario_profesor.mostrarTodosLosIdHorarioProfesor 

module.exports = horario_profesor;

