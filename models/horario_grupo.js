//MODELO HORARIO_GRUPO COMPROBAR

var connection = require('../models/connection');
var time = require('../models/time');
var app = require('../app');

var horario_grupo = {};
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
*	agrega un horario_grupo a la tabla horario_grupos (dia_semana,hora_inicio,hora_final,id_grupo,id_asignatura,id_aula) COMPROBAR
*/
horario_grupo.insertarHorarioGrupo = function (dia_semana, hora_inicio, hora_final, id_grupo, id_asignatura, id_aula, callback) {							
	if(connection){	
		var horario_grupo = { dia_semana: dia_semana, hora_inicio: hora_inicio, hora_final: hora_final, id_grupo: id_grupo, id_asignatura: id_asignatura, id_aula: id_aula };
		var sqlinsertarHorarioGrupo = 'INSERT INTO horario_grupos SET ?';
		connection.query(sqlinsertarHorarioGrupo, horario_grupo, function(error){
		  if (error) {
				throw error;
			}else{
				//console.log('insertarAula correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.horario_grupo.insertarHorarioGrupo

/*
*	modificar un horario_grupo en la tabla horario_grupos (id_horario_grupo, dia_semana,hora_inicio,hora_final,id_grupo,id_asignatura,id_aula) con el id COMPROBAR
*/
horario_grupo.modificarHorarioGrupo = function (id_horario_grupo, dia_semana, hora_inicio, hora_final, id_grupo, id_asignatura, id_aula, callback) {							
	if(connection){	
		var horario_grupo = { id_horario_grupo: id_horario_grupo, dia_semana: dia_semana, hora_inicio: hora_inicio, hora_final: hora_final, id_grupo: id_grupo, id_asignatura: id_asignatura, id_aula: id_aula };
		var modificarHorarioGrupo = 'UPDATE horario_grupos SET ? WHERE id_horario_grupo ="'+id_horario_grupo+'"';
		connection.query(modificarHorarioGrupo, horario_grupo, function(error){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				//console.log('modificarHorarioGrupo correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.horario_grupo.modificarHorarioGrupo

/*
*	borrar un horario_grupo en la tabla horario_grupos con el id_horario_grupo COMPROBAR
*/
horario_grupo.borrarHorarioGrupo = function (id_horario_grupo,callback) {							
	if(connection){	
		connection.query('DELETE FROM horario_grupos WHERE id_horario_grupo= "'+id_horario_grupo+'"', function(error){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				//console.log('borrarHorarioGrupo correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.horario_grupo.borrarHorarioGrupo

/*
*	muestra todos los id_horario_grupo de la tabla horario_grupos COMPROBAR
*/
horario_grupo.mostrarTodosLosIdHorarioGrupo = function (callback) {							
	if(connection){	
		connection.query('SELECT id_horario_grupo FROM horario_grupos', function(error,row){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				//console.log(row);
				var id_horarioGrupoArray = [];
				for (var i= 0;i<row.length;i++){
						//console.log ("row : " + row[i].id_horario_grupo);
						id_horarioGrupoArray.push(row[i].id_horario_grupo);
					}//.for (var i= 0;i<row.length;i++)
						//console.log(id_horarioGrupoArray);
						function compareNumbers(a, b) {
						  return a - b;
						} 
						id_horarioGrupoArray.sort(compareNumbers);
						//console.log("sort: " + id_horarioGrupoArray);
					callback(null,id_horarioGrupoArray);
				//console.log('mostrarTodosLosIdHorarioGrupo correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.horario_grupo.mostrarTodosLosIdHorarioGrupo 

//METODO TODOS LOS HORARIOS DE UN GRUPO

module.exports = horario_grupo;

