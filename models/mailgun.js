var mailgun = {};
var api_key = 'key-40057b34916672687f946ca5cc20548e'//process.env.MAILGUN_API_KEY;
var domain = 'mail.controlfid.zubirimanteoweb.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var falta = require('../models/falta');

/*
*	Enviar correo a los alumnos con falta
*/
mailgun.enviarCorreoAlumnosFalta = function (alumnos,dia) {
	for (var i = 0; i < alumnos.length; i++) {
		falta.buscarDatosFaltaAlumno(alumnos[i].id_alumno,alumnos[i].id_horario_grupo,function (error,data) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				for (var i = 0; i < data.length; i++) {
					var data = {
						from: 'admin@controlfid.zubirimanteoweb.com',
						to: data[i].correo,
						subject: 'Falta el dia: '+dia,
						html: 'Estimado alumno '+data[i].nombre+ '.<br/>Tiene usted una falta en la asignatura <b>'+data[i].clave+'</b> en el aula '+data[i].numero+' el día <b>'+dia+'</b>, de las <b>'+data[i].hora_inicio+'</b> a las <b>'+data[i].hora_final+'</b><br/>Si tiene alguna duda dirijase a su profesor/tutor correspondiente.<br/><br/>Saludos', 
					};
					mailgun.messages().send(data,function (error,body) {
						if (error) {
							console.log(error);
							throw error;
						}
					})//messages
				};//for
			}
		})//falta.buscarDatosFaltaAlumno
	};
}//enviarCorreoAlumnosFalta

module.exports = mailgun;