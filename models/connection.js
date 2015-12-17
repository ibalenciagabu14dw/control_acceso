var mysql = require('mysql'),

connection = mysql.createConnection(
	{ 
		host: process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
		port :process.env.OPENSHIFT_MYSQL_DB_PORT || '3306',
		user: process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'root',
		password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'zubiri',
		database: 'controlfid'

		
	}
);



module.exports = connection;
