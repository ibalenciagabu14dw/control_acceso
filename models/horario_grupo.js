//MODELO HORARIO_GRUPO CAMBIAR NO FUNCIONA

var connection = require('../models/connection');
var time = require('../models/time');
var app = require('../app');

var horarioGrupo = {};
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
*	agrega un horario_grupo a la tabla horario_grupos (grupo,dia_semana,hora_inicio,hora_final,id_grupo,id_asignatura,id_aula) COMPROBAR
*/
horarioGrupo.insertarHorarioGrupo = function (grupo, dia_semana, hora_inicio, hora_final, id_grupo, id_asignatura, id_aula, callback) {							
	var horariogrupo = { grupo: grupo, dia_semana: dia_semana, hora_inicio: hora_inicio, hora_final: hora_final, id_grupo: id_grupo, id_asignatura: id_asignatura, id_aula: id_aula };
	var sqlinsertarHorarioGrupo = 'INSERT INTO aulas SET ?';
	connection.query(sqlinsertarHorarioGrupo, horarioGrupo, function(error){
	  if (error) {
			throw error;
		}else{
			console.log('insertarAula correctamente');
		}//.else
	});//.connection.query
}//.horarioGrupo.insertarAula

/*
*	modificar una horarioGrupo en la tabla aulas (nombre,clave) con el id COMPROBAR
*/
horarioGrupo.modificarAula = function (id,numero,piso,capacidad,callback) {							
	var aula = { numero: numero, piso: piso, capacidad: capacidad };
	var sqlmodificarAula = 'UPDATE aulas SET ? WHERE id_aula ="'+id+'"';
	connection.query(sqlmodificarAula,aula, function(error){
	  if (error) {
			throw error;
			console.log(error);
		}else{
			console.log('modificarAula correctamente');
		}//.else
	});//.connection.query
}//.horarioGrupo.modificarAula

/*
*	borrar una horarioGrupo en la tabla aulas con el id COMPROBAR
*/
horarioGrupo.borrarAula = function (id,callback) {							
	connection.query('DELETE FROM aulas WHERE id_aula= "'+id+'"', function(error){
	  if (error) {
			throw error;
			console.log(error);
		}else{
			console.log('borrarAula correctamente');
		}//.else
	});//.connection.query
}//.horarioGrupo.borrarAula

/*
*	muestra todos los id_aula de la tabla aulas COMPROBAR
*/
horarioGrupo.mostrarTodosLosIdAula = function (callback) {							
	connection.query('SELECT id_aula FROM aulas', function(error,row){
	  if (error) {
			throw error;
			console.log(error);
		}else{
			//console.log(row);
			var id_AulaArray = [];
			for (var i= 0;i<row.length;i++){
					//console.log ("row : " + row[i].id_aula);
					var id = row[i].id_aula;
					id_AulaArray.push(id);
				}//.for (var i= 0;i<row.length;i++)
					//console.log(id_AulaArray);
					function compareNumbers(a, b) {
					  return a - b;
					} 
					id_AulaArray.sort(compareNumbers);
					//console.log("sort: " + id_AulaArray);
				callback(null,id_AulaArray);
			console.log('mostrarTodosLosIdAula correctamente');
		}//.else
	});//.connection.query
}//.horarioGrupo.mostrarTodosLosIdAula 

//METODO TODAS LAS ASIGNATURAS DE UN GRUPO

module.exports = horarioGrupo;

