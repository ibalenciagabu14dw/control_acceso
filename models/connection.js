var mysql = require('mysql'),

connection = mysql.createConnection(
	{ 
		host: 'localhost', 
		user: 'root',  
		password: 'zubiri', 
		database: 'controlfid'
	}
);

module.exports = connection;
