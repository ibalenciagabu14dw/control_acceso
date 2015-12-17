var mysql = require('mysql'),

connection = mysql.createConnection(
	{ 
		/*host: '127.2.85.2:3306', 
		user: 'admin1wNN6rU',  
		password: 'pK3_Nh5PQS2g', 
		database: 'controlfid'*/

		OPENSHIFT_MYSQL_DB_PORT='3306',
		OPENSHIFT_MYSQL_DB_HOST='127.2.85.2',
		OPENSHIFT_MYSQL_DB_PASSWORD='pK3_Nh5PQS2g',
		OPENSHIFT_MYSQL_DB_USERNAME='admin1wNN6rU',
		OPENSHIFT_MYSQL_DB_URL='mysql://admin1wNN6rU:pK3_Nh5PQS2g@127.2.85.2:3306/'
	}
);

module.exports = connection;
