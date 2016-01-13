var connection = require('../models/connection');
var app = require('../app');

var asignatura = {};
console.log(app);

/*
*	agrega una asignatura a la tabla asignaturas (nombre,clave) COMPROBAR
*/
asignatura.insertarAsigntura = function (nombre,clave,obligatoria,callback) {							
	var asignatura = { nombre: nombre, clave: clave ,obligatoria: obligatoria };
	var sqlinsertarAsigntura = 'INSERT INTO asignaturas SET ?';
	connection.query(sqlinsertarAsigntura,asignatura, function(error){
	  if (error) {
			throw error;
		}else{
			console.log('insertarAsigntura correctamente');
		}//.else
	});//.connection.query
}//.asignatura.insertarAsigntura

/*
*	modificar una asignatura en la tabla asignaturas (nombre,clave) con el id COMPROBAR
*/
asignatura.modificarAsigntura = function (id,nombre,clave,obligatoria,callback) {							
	var asignatura = { nombre: nombre, clave: clave ,obligatoria: obligatoria };
	var sqlmodificarAsigntura = 'UPDATE asignaturas SET ? WHERE id_asignatura ="'+id+'"';
	connection.query(sqlmodificarAsigntura,asignatura, function(error){
	  if (error) {
			throw error;
			console.log(error);
		}else{
			console.log('modificarAsigntura correctamente');
		}//.else
	});//.connection.query
}//.asignatura.modificarAsigntura

/*
*	borrar una asignatura en la tabla asignaturas con el id COMPROBAR
*/
asignatura.borrarAsigntura = function (id,callback) {							
	connection.query('DELETE FROM asignaturas WHERE id_asignatura= "'+id+'"', function(error){
	  if (error) {
			throw error;
			console.log(error);
		}else{
			console.log('borrarAsigntura correctamente');
		}//.else
	});//.connection.query
}//.asignatura.borrarAsigntura

/*
*	muestra todos los id_asignatura de la tabla asignaturas COMPROBAR
*/
asignatura.mostrarTodosLosIdAsigntura = function (callback) {							
	connection.query('SELECT id_asignatura FROM asignaturas', function(error,row){
	  if (error) {
			throw error;
			console.log(error);
		}else{
			//console.log(row);
			var id_AsignaturasArray = [];
			for (var i= 0;i<row.length;i++){
					//console.log ("row : " + row[i].id_asignatura);
					id_AsignaturasArray.push(row[i].id_asignatura);
				}//.for (var i= 0;i<row.length;i++)
					//console.log(id_AsignaturasArray);
					function compareNumbers(a, b) {
					  return a - b;
					} 
					id_AsignaturasArray.sort(compareNumbers);
					//console.log("sort: " + id_AsignaturasArray);
				callback(null,id_AsignaturasArray);
			console.log('mostrarTodosLosIdAsigntura correctamente');
		}//.else
	});//.connection.query
}//.asignatura.mostrarTodosLosIdAsigntura 

module.exports = asignatura;