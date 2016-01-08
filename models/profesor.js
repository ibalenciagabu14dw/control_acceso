var connection = require('../models/connection');
var time = require('../models/time');
 
var profesor = {};

var day;
time.diaDeLaSemana(function (error,data) {
	if (error) {
		throw error;
	}else{
		day = data;
		console.log(day);
	}
});

/*
*	devuelve el id,tarjeta_activada,presencia de profesor seguun numero de tarjeta
*/
profesor.buscarProfesorPorTarjeta = function(num_tarjeta,callback){
	if (connection){
		var sql = 'SELECT id_profesor,tarjeta_activada,presencia FROM profesores WHERE num_tarjeta = ' + connection.escape(num_tarjeta);
		connection.query(sql, function (error, row){
			if(error){
				throw error;
			}
			else{
				console.log(row);
				callback(null,row);
			}
		});
	}
}//buscarProfesorPorTarjeta

/*
*	devuelve nombre y foto del profesor
*/
profesor.buscarProfesorPorId = function(id_profesor,callback){
	if(connection){
		var sql = 'SELECT nombre,foto FROM profesores WHERE id_profesor ='+id_profesor;
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				var fotoFinal = row[0].foto;
				callback(null,row[0].nombre,fotoFinal);
			}
		});
	}
}//buscar profesor por id

/*
*	devuelve profesor segun correo
*/
profesor.buscarProfesorPorCorreo = function(correo,callback) {
	if (connection) {
		var sql = 'SELECT id_profesor,nombre,apellidos,correo,password,foto,admin from profesores WHERE correo = "'+correo+'"';
		connection.query(sql, function (error,row) {
			if (error) {
				throw error;
			}else{
				console.log(row);
				callback(null,row);
			}
		});
	};
}//buscarProfesorPorCorreo

/*
*	devuelve el id_aula en el que tiene que estar segun tarjeta dia de la semana y hora
*/
profesor.aulaEnLaQueTieneQueEstar = function (idT,curr_time,callback) {
	if (connection) {
		var sqlAula = 'SELECT id_aula FROM horario_grupos WHERE dia_semana = "'+day+'" and ("'+curr_time+'" BETWEEN hora_inicio and hora_final) and id_horario_grupo IN (SELECT id_horario_grupo FROM horario_profesores WHERE dia_semana = "'+day+'" and ("'+curr_time+'" BETWEEN hora_inicio and hora_final) and id_profesor IN (SELECT id_profesor FROM profesores WHERE num_tarjeta ="'+idT+'"))';
		connection.query(sqlAula, function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}
		});
	}//if connection
}//aulaEnLaQueTieneQueEstar


/*
*	conmuta la presencia del profesor a 0 o a 1
*/
profesor.updatePresenciaProfesor = function (idT,callback) {
	this.presenciaProfesor(idT,function (error,data) {
		if (data[0].presencia == 0) {
			var sqlUpdate = 'UPDATE profesores SET presencia = 1 WHERE num_tarjeta ="'+idT+'"';
			connection.query(sqlUpdate,function (error) {
				if (error) {
					throw error;
				}else{
					callback(null);
				}
			});
		}else{
			var sqlUpdate = 'UPDATE profesores SET presencia = 0 WHERE num_tarjeta ="'+idT+'"';
			connection.query(sqlUpdate,function (error) {
				if (error) {
					throw error;
				}else{
					callback(null);
				}
			});
		}
	});
}

/*
*	devuelve el estado de presencia segun la tarjeta
*/
profesor.presenciaProfesor = function (idT,callback) {
	var sqlProfesorPresencia = 'SELECT presencia FROM profesores WHERE num_tarjeta ="'+idT+'"';
	connection.query(sqlProfesorPresencia, function (error,row) {
		if (error) {
			throw error;
		}else{
			callback(null,row);
		}
	});
}


/*
*	devuelve los alumnos del profesor en la hora actual en esa clase
*/
profesor.losAlumnosDeSuClaseActual = function (idProfesor,curr_time,callback) {

	if (connection) {

		/*'SELECT id_aula FROM horario_grupos WHERE dia_semana = "'+diasSemana[day]+'" and 
		("'+time+'" BETWEEN hora_inicio and hora_final) and id_horario_grupo IN 
		(SELECT id_horario_grupo FROM horario_profesores WHERE dia_semana = "'+diasSemana[day]+'" and
			("'+time+'" BETWEEN hora_inicio and hora_final) and id_profesor IN 
			(SELECT id_profesor FROM profesores WHERE num_tarjeta ="'+idT+'"))';*/

		var sqlProfesorClaseActual = 'SELECT nombre,apellidos,foto FROM alumnos WHERE id_alumno IN (SELECT id_alumno FROM alumno_grupos  WHERE id_grupo IN (SELECT id_grupo FROM horario_grupos WHERE id_horario_grupo and (dia_semana="'+day+'") and ("'+curr_time+'" between hora_inicio and hora_final) and id_horario_grupo IN (SELECT id_horario_grupo FROM horario_profesores WHERE id_profesor="'+idProfesor+'"  and (dia_semana="'+day+'") and ("'+curr_time+'" between hora_inicio and hora_final))))';
		connection.query(sqlProfesorClaseActual, function (error,row) {
			if (error) {
				throw error;
			}else{
				//console.log("hora actual" + current_hour);
				//console.log(row);

				var nombreArray = [];
				var apellidosArray = [];
				var fotoArray = [];

				var alumnosArray = [];				

				for (var i= 0;i<row.length;i++){

					//console.log (row[i]);

					var nombre = row[i].nombre;
					var apellidos = row[i].apellidos;
					var foto = row[i].foto;
					var fotofinal = foto.toString('base64')
					
					nombreArray.push(nombre); 
					apellidosArray.push(apellidos);
					fotoArray.push(fotofinal);

									
					//console.log(nombre);
					//console.log(apellidos);
					//console.log(foto);


				}
					console.log(nombreArray);
					console.log(apellidosArray);
					console.log(fotoArray);
					

				callback(null,nombreArray,apellidosArray,fotoArray);
			}
		});
	}//if connection
}//losAlumnosDeSuClaseActual

module.exports = profesor;