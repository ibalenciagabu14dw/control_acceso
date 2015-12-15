var mysql = require('mysql'),

connection = mysql.createConnection(
	{ 
		host: 'localhost', 
		user: 'root',  
		password: 'zubiri', 
		database: 'control_acceso'
	}
);
 
var alumno = {};
 

alumno.buscarAlumnoPorTarjeta = function(num_tarjeta,callback)
{
	if (connection) 
	{
		var sql = 'SELECT id_alumno,tarjetaActivada,presencia FROM alumnos WHERE num_tarjeta = ' + connection.escape(num_tarjeta);
		connection.query(sql, function(error, row) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				console.log(row);
				return row;
				callback(null,row);
			}
		});
	}
}


//profesorModel.verClase('1');
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = alumno;