var connection = require('../models/connection');
var app = require('../app');

var aula = {};

/*
*	agrega una aula a la tabla aulas (numero,piso,capacidad) COMPROBAR
*/
aula.insertarAula = function (numero,piso,capacidad,callback) {
	if(connection){
		var aula = { numero: numero, piso: piso, capacidad: capacidad };
		var sqlinsertarAula = 'INSERT INTO aulas SET ?';
		connection.query(sqlinsertarAula,aula, function(error){
		  if (error) {
				throw error;
			}else{
				callback(null,{dato:"ok"});
			}//.else
		});//.connection.query
	}//.if (connection)
}//.aula.insertarAula

/*
*	modificar una aula en la tabla aulas (nombre,clave) con el id COMPROBAR
*/
aula.modificarAula = function (id,numero,piso,capacidad,callback) {
	if(connection){
		var aula = { numero: numero, piso: piso, capacidad: capacidad };
		var sqlmodificarAula = 'UPDATE aulas SET ? WHERE id_aula ="'+id+'"';
		connection.query(sqlmodificarAula,aula, function(error){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,{dato:"ok"});
			}//.else
		});//.connection.query
	}//.if (connection)
}//.aula.modificarAula

/*
*	borrar una aula en la tabla aulas con el id COMPROBAR
*/
aula.borrarAula = function (id,callback) {
	if(connection){							
		connection.query('DELETE FROM aulas WHERE id_aula= "'+id+'"', function(error){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				//console.log('borrarAula correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.aula.borrarAula

/*
*	muestra todos los id_aula de la tabla aulas COMPROBAR
*/
aula.mostrarTodosLosIdAula = function (callback) {
	if(connection){							
		connection.query('SELECT id_aula FROM aulas', function(error,row){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				//console.log(row);
				var id_AulaArray = [];
				for (var i= 0;i<row.length;i++){
						//console.log ("row : " + row[i].id_aula);
						id_AulaArray.push(row[i].id_aula);
					}//.for (var i= 0;i<row.length;i++)
						//console.log(id_AulaArray);
						function compareNumbers(a, b) {
						  return a - b;
						} 
						id_AulaArray.sort(compareNumbers);
						//console.log("sort: " + id_AulaArray);
					callback(null,id_AulaArray);
				//console.log('mostrarTodosLosIdAula correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.aula.mostrarTodosLosIdAula 

aula.buscarAulaPorNumero = function(numero,callback){
	if (connection){
		var sql = 'SELECT id_aula,numero,piso,capacidad FROM aulas WHERE numero LIKE ' + connection.escape(numero+'%');
		connection.query(sql, function (error, row){
			if(error){
				throw error;
			}else{
				//console.log(row);
				callback(null,row);
			}//.else
		});//.connection.query
	}//.if (connection)
}//.aula.buscarAulaPorNumero

aula.buscarAulaPorIdNumero = function(id_aula,numero,callback){
	if(connection){
		var sql = 'SELECT id_aula,numero,piso,capacidad FROM aulas WHERE id_aula ="'+id_aula+'" AND numero ="'+numero+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				console.log(row);
				callback(null,row);
			}//.else
		});//.connection.query
	}//.if(connection)
}//.aula.buscarAulaPorIdNumero

aula.buscarAulaPorId = function(id_aula,callback){
	if(connection){
		var sql = 'SELECT id_aula,numero,piso,capacidad FROM aulas WHERE id_aula ="'+id_aula+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				console.log(row);
				callback(null,row);
			}//.else
		});//.connection.query
	}//.if(connection)
}//.aula.buscarAulaPorIdNumero

aula.mostrarTodosLosIdNumeroAula = function (callback) {
	if(connection){							
		connection.query('SELECT id_aula,numero FROM aulas', function(error,row){
		  if (error) {
				throw error;
				console.log(error);
			}else{
					callback(null,row);
				//console.log('mostrarTodosLosIdNumeroAula correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.aula.mostrarTodosLosIdNumeroAula 

module.exports = aula;