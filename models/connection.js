var mysql = require('mysql'),

connection = mysql.createConnection(
	{ 
		host: 'localhost', 
		user: 'root',  
		password: 'nati666000', 
		database: 'control_acceso'
	}
);

module.exports = connection;