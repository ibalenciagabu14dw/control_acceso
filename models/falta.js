//*************MODELO FALTAS FALTA COMPROBAR*****************

var connection = require('../models/connection');
var time = require('../models/time');
var app = require('../app');

var falta = {};
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
*	agrega una falta a la tabla faltas (fecha, id_alumno,id_horario_grupo,observaciones) COMPROBAR
*/
falta.insertarFalta = function (fecha,id_alumno,id_horario_grupo,observaciones,callback) {
	if(connection){							
		var falta = { fecha: fecha, id_alumno: id_alumno, id_horario_grupo: id_horario_grupo, observaciones: observaciones };
		var sqlinsertarFalta = 'INSERT INTO faltas SET ?';
		connection.query(sqlinsertarFalta,falta, function(error){
		  if (error) {
				throw error;
			}else{
				//console.log('insertarFalta correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.falta.insertarFalta

/*
*	modificar una falta en la tabla faltas (id_falta,fecha,id_alumno,id_horario_grupo,observaciones) con el id COMPROBAR
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
				//console.log('modificarFalta correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.falta.modificarFalta

/*
*	borrar una falta en la tabla faltas con el id_falta COMPROBAR
*/
falta.borrarFalta = function (id_falta,callback) {
	if(connection){							
		connection.query('DELETE FROM faltas WHERE id_falta= "'+id_falta+'"', function(error){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				//console.log('borrarFalta correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.falta.borrarFalta

/*
*	muestra todos los id_falta de la tabla faltas COMPROBAR
*/
falta.mostrarTodosLosIdFalta = function (callback) {
	if(connection){							
		connection.query('SELECT id_falta FROM faltas', function(error,row){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				//console.log(row);
				var id_FaltaArray = [];
				for (var i= 0;i<row.length;i++){
						//console.log ("row : " + row[i].id_falta);
						var id = row[i].id_falta;
						id_FaltaArray.push(id);
					}//.for (var i= 0;i<row.length;i++)
						//console.log(id_FaltaArray);
						function compareNumbers(a, b) {
						  return a - b;
						} 
						id_FaltaArray.sort(compareNumbers);
						//console.log("sort: " + id_FaltaArray);
					callback(null,id_FaltaArray);
				//console.log('mostrarTodosLosIdFalta correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.falta.mostrarTodosLosIdAula 

module.exports = falta;

