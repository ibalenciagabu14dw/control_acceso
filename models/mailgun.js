var mailgun = {};
var api_key = process.env.MAILGUN_API_KEY;
var domain = 'mail.controlfid.zubirimanteoweb.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

/*
*	Enviar correo a los alumnos con falta
*/
mailgun.enviarCorreoAlumnosFalta = function () {
	
}//enviarCorreoAlumnosFalta

module.exports = mailgun;