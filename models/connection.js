var mysql = require('mysql'),

connection = mysql.createConnection(
	{ 
		host: process.env.OPENSHIFT_MYSQL_DB_HOST,
		port :process.env.OPENSHIFT_MYSQL_DB_PORT,
		user: process.env.OPENSHIFT_MYSQL_DB_USERNAME,
		password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
		database: 'controlfid'

		
	}
);



module.exports = connection;
