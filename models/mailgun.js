var mailgun = {};
var api_key = process.env.MAILGUN_API_KEY;
var domain = process.env.MAILGUN_DOMAIN;
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
						from: 'admin@mail.controlfid.zubirimanteoweb.com',
						to: data[i].correo,
						subject: 'Falta el dia: '+dia,
						html: 'Estimado alumno '+data[i].nombre+ '.<br/>Tiene usted una falta en la asignatura <b>'+data[i].clave+'</b> en el aula <b>'+data[i].numero+'</b> el día <b>'+dia+'</b>, de las <b>'+data[i].hora_inicio+'</b> a las <b>'+data[i].hora_final+'</b><br/>Si tiene alguna duda dirijase a su profesor/tutor correspondiente.<br/><br/>Saludos', 
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

mailgun.enviarCorreo = function (remitente,asunto,mensaje,callback) {
	var data = {
		from: remitente,
		to: 'admin@mail.controlfid.zubirimanteoweb.com',
		subject: asunto,
		html: mensaje,
	};
	mailgun.messages().send(data,function (error,body) {
		if (error) {
			console.log(error);
			throw error;
		}else{
			callback(null,{envio:'ok'});
		}
	})//messages
}//enviarCorreo

mailgun.enviarCorreoDemo = function (remitenteDemo,callback) {
	var data = {
		from: 'admin@mail.controlfid.zubirimanteoweb.com',
		to: remitenteDemo,
		subject: 'Password Demo ControlFid',
		html: '<h4>Gracias por utilizar nuestra demo</h4>Esperamos que sea de tu agrado<br/>El usuario para poder acceder a la demo es: <b>profesor2@zubirimanteo.com</b>. Y el password es: <b>profesor2</b>.<br/>Para entrar en la configuración de la demo, seleccionar "Entrar como administrador" en el login<br/><br/>El equipo de controlFid',
	};
	mailgun.messages().send(data,function (error,body) {
		if (error) {
			console.log(error);
			throw error;
		}else{
			callback(null,{envio:'ok'});
		}
	})//messages
}//enviarCorreo

module.exports = mailgun;