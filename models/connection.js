var mysql = require('mysql'),

connection = mysql.createConnection(
	{ 
		host: process.env.OPENSHIFT_controlfid_DB_HOST,
		port :process.env.OPENSHIFT_controlfid_DB_PORT,
		user: process.env.OPENSHIFT_controlfid_DB_USERNAME,
		password: process.env.OPENSHIFT_controlfid_DB_PASSWORD,
		database: process.env.OPENSHIFT_controlfid

		
	}
);



module.exports = connection;
