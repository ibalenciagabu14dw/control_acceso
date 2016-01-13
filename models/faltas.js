//MODELO FALTAS CAMBIAR NO FUNCIONA

var connection = require('../models/connection');
var time = require('../models/time');
var app = require('../app');

var aula = {};
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
*	agrega una aula a la tabla aulas (numero,piso,capacidad) COMPROBAR
*/
aula.insertarAula = function (numero,piso,capacidad,callback) {							
	var aula = { numero: numero, piso: piso, capacidad: capacidad };
	var sqlinsertarAula = 'INSERT INTO aulas SET ?';
	connection.query(sqlinsertarAula,aula, function(error){
	  if (error) {
			throw error;
		}else{
			console.log('insertarAula correctamente');
		}//.else
	});//.connection.query
}//.aula.insertarAula

/*
*	modificar una aula en la tabla aulas (nombre,clave) con el id COMPROBAR
*/
aula.modificarAula = function (id,numero,piso,capacidad,callback) {							
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
}//.aula.modificarAula

/*
*	borrar una aula en la tabla aulas con el id COMPROBAR
*/
aula.borrarAula = function (id,callback) {							
	connection.query('DELETE FROM aulas WHERE id_aula= "'+id+'"', function(error){
	  if (error) {
			throw error;
			console.log(error);
		}else{
			console.log('borrarAula correctamente');
		}//.else
	});//.connection.query
}//.aula.borrarAula

/*
*	muestra todos los id_aula de la tabla aulas COMPROBAR
*/
aula.mostrarTodosLosIdAula = function (callback) {							
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
}//.aula.mostrarTodosLosIdAula 

module.exports = aula;

