//***************MODELO GRUPO FALTA COMPROBAR

var connection = require('../models/connection');
var app = require('../app');

var grupo = {};
console.log(app);

/*
*	agrega un grupo a la tabla grupos (nombre_grupo,tipo) COMPROBAR
*/
grupo.insertarGrupo = function (nombre_grupo,tipo,callback) {
	if(connection){							
		var grupo = { nombre_grupo: nombre_grupo, tipo: tipo };
		var sqlinsertarGrupo = 'INSERT INTO grupos SET ?';
		connection.query(sqlinsertarGrupo, grupo, function(error){
		  if (error) {
				throw error;
			}else{
				console.log('insertarGrupo correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.grupo.insertarGrupo

/*
*	modificar una grupo en la tabla grupos (id_grupo,nombre_grupo,tipo) con el id_grupo COMPROBAR
*/
grupo.modificarGrupo = function (id_grupo,nombre_grupo,tipo,callback) {
	if(connection){							
		var grupo = { nombre_grupo: nombre_grupo, tipo: tipo };
		var sqlmodificarGrupo = 'UPDATE grupos SET ? WHERE id_grupo ="'+id_grupo+'"';
		connection.query(sqlmodificarGrupo,grupo, function(error){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('modificarAula correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.grupo.modificarGrupo

/*
*	borrar una grupo en la tabla grupos con el id_grupo COMPROBAR
*/
grupo.borrarGrupo = function (id_grupo,callback) {
	if(connection){							
		connection.query('DELETE FROM grupos WHERE id_grupo= "'+id_grupo+'"', function(error){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('borrarGrupo correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.grupo.borrarGrupo

/*
*	muestra todos los id_grupo de la tabla grupos COMPROBAR
*/
grupo.mostrarTodosLosIdGrupo = function (callback) {
	if(connection){							
		connection.query('SELECT id_grupo FROM grupos', function(error,row){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				//console.log(row);
				var id_GrupoArray = [];
				for (var i= 0;i<row.length;i++){
						//console.log ("row : " + row[i].id_aula);
						id_GrupoArray.push(row[i].id_grupo);
					}//.for (var i= 0;i<row.length;i++)
						//console.log(id_GrupoArray);
						function compareNumbers(a, b) {
						  return a - b;
						} 
						id_GrupoArray.sort(compareNumbers);
						//console.log("sort: " + id_GrupoArray);
					callback(null,id_GrupoArray);
				console.log('mostrarTodosLosIdGrupo correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.grupo.mostrarTodosLosIdGrupo 

module.exports = grupo;

