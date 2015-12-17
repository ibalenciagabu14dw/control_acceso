var mysql = require('mysql'),

connection = mysql.createConnection(
	{ 
		host: process.env.OPENSHIFT_controlfid_DB_HOST,
		user: process.env.OPENSHIFT_MYSQL_DB_USERNAME,
		password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
		database: process.env.OPENSHIFT_controlfid

		
	}
);



module.exports = connection;
