var connection = require('../models/connection');
var app = require('../app');

var asignatura = {};
console.log(app);

/*
*	agrega una asignatura a la tabla asignaturas (nombre,clave) COMPROBAR
*/
asignatura.insertarAsigntura = function (nombre,clave,obligatoria,callback) {
	if(connection){						
		var asignatura = { nombre: nombre, clave: clave ,obligatoria: obligatoria };
		var sqlinsertarAsigntura = 'INSERT INTO asignaturas SET ?';
		connection.query(sqlinsertarAsigntura,asignatura, function(error){
		  if (error) {
				throw error;
			}else{
				//console.log('insertarAsigntura correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.asignatura.insertarAsigntura

/*
*	modificar una asignatura en la tabla asignaturas (nombre,clave) con el id COMPROBAR
*/
asignatura.modificarAsigntura = function (id,nombre,clave,obligatoria,callback) {
	if(connection){							
		var asignatura = { nombre: nombre, clave: clave ,obligatoria: obligatoria };
		var sqlmodificarAsigntura = 'UPDATE asignaturas SET ? WHERE id_asignatura ="'+id+'"';
		connection.query(sqlmodificarAsigntura,asignatura, function(error){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				//console.log('modificarAsigntura correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.asignatura.modificarAsigntura

/*
*	borrar una asignatura en la tabla asignaturas con el id COMPROBAR
*/
asignatura.borrarAsigntura = function (id,callback) {
	if(connection){							
		connection.query('DELETE FROM asignaturas WHERE id_asignatura= "'+id+'"', function(error){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				//console.log('borrarAsigntura correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.asignatura.borrarAsigntura

/*
*	muestra todos los id_asignatura de la tabla asignaturas COMPROBAR
*/
asignatura.mostrarTodosLosIdAsigntura = function (callback) {
	if(connection){							
		connection.query('SELECT id_asignatura FROM asignaturas', function(error,row){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				var id_AsignaturasArray = [];
				for (var i= 0;i<row.length;i++){
						id_AsignaturasArray.push(row[i].id_asignatura);
					}//.for (var i= 0;i<row.length;i++)
						function compareNumbers(a, b) {
						  return a - b;
						} 
						id_AsignaturasArray.sort(compareNumbers);
					callback(null,id_AsignaturasArray);
				//console.log('mostrarTodosLosIdAsigntura correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.asignatura.mostrarTodosLosIdAsigntura 

asignatura.mostrarTodosLosIdNombreAsigntura = function (callback) {
	if(connection){							
		connection.query('SELECT id_asignatura,nombre FROM asignaturas', function(error,row){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				//console.log(row);
			    callback(null,row);
				//console.log('mostrarTodosLosIdNombreAsigntura correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.asignatura.mostrarTodosLosIdNombreAsigntura


asignatura.lasAsignaturasQueFaltan = function (id_profesor,callback){
	if(connection){						
		var sqllasAsignaturasQueFaltan = 'SELECT id_asignatura,nombre FROM asignaturas WHERE id_asignatura not like (SELECT id_asignatura FROM profesores_asignaturas WHERE id_profesor ="'+id_profesor+'")';
		connection.query(sqllasAsignaturasQueFaltan,asignatura, function(error,row){
		  if (error) {
				throw error;
			}else{
				//console.log(row);
				callback(null,row);
				//console.log('lasAsignaturasQueFaltan correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.asignatura.lasAsignaturasQueFaltan

/*
*	devuelve nombre , id de la asignatura
*/
asignatura.buscarAsignaturasDelProfesor = function(id_profesor,callback){
	if(connection){
		var sql = 'SELECT id_asignatura,nombre FROM asignaturas WHERE id_asignatura IN (SELECT id_asignatura FROM profesores_asignaturas WHERE id_profesor ="'+id_profesor+'")';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				//console.log(row);
				callback(null,row);
			}//.else
		});//.connection.query
	}//.if(connection)
}//.asignatura.buscarAsignaturasDelProfesor



module.exports = asignatura;