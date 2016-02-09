var time = {};
var diasSemana = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
var horario_grupo = require('../models/horario_grupo');
var falta = require('../models/falta');
var mailgun = require('../models/mailgun');
var app = require('../app');
var io = app.io;
/*
*	Later
*/
var later = require('later');
var later2 = require('later');
later.date.UTC();
later2.date.UTC();
// momento del dia desde las 00:00 en segundos menos 3600 (UTC())
var schedule = {
    schedules:
    [
        {t:[23400]},//07:30 UTC()+1 23400
    ],
    exceptions:
    [
    	//menos sábado y domingo
        {dw:[1,7]},
    ]
};
//Activar
var timer = later.setInterval(primeraHora, schedule);
var timer2;

//Funcion principal
function primeraHora() {
   	console.log("Funcion principal "+ new Date());
   	var schedule2 = {schedules:[]};
   	var dia;
   	//sacar dia de la semana para llamar a la funcion
   	time.diaDeLaSemana(function (error,data) {
		if (error) {
   			console.log(error);
   			throw error;
   		}else{
   			dia = data;
   		}
   		//sacar las horas finales de cada clase
   		horario_grupo.buscarHoraFinalPorDia(dia, function (error,data) {
   			if (error) {
   				console.log(error);
   				throw error;
   			}else{
   				//configurar el segundo trigger con las horas finales de cada clase en segundos
				for (var i = 0; i < data.length; i++) {
					//var sec = 41220 + (i*60);
					var hora = data[i].hora_final.split(':');
					var sec = parseInt((((parseInt(hora[0])*60)+parseInt(hora[1]))*60)-3600);
					schedule2.schedules.push({t:[sec]});
					console.log(sec);
				};
				//activar segundo trigger
				timer2 = later2.setInterval(finDeClase,schedule2);
   			}//else if error
   		});//buscarHoraFinalPorDia
	});//time.diaDeLaSemana
};//funcion primeraHora

function finDeClase () {
	console.log("Funcion secundaria "+ new Date());
	var dia;
	var hora;
	var diaCompleto;
	time.diaDeLaSemana(function (error,data) {
		if (error) {
			console.log(error);
			throw error;
		}else{
			dia = data;
			time.horaActual(function (error,data2) {
				if (error) {
					console.log(error);
					throw error;
				}else{
					hora = data2;
					time.diaCompleto(function (error,data3) {
						if (error) {
							console.log(error);
							throw error;
						}else{
							diaCompleto = data3;
							falta.buscarFaltasDeAlumnosNoConvalidados(dia, hora, function (error,data4) {
								if (error) {
									console.log(error);
									throw error;
								}else{
									for (var i = 0; i < data4.length; i++) {
										falta.agregarFalta(diaCompleto, data4[i].id_alumno, data4[i].id_horario_grupo, "Falta automatizada", function (error) {
											if (error) {
												console.log(error);
												throw error;
											}
										})//agregarFalta
									};//for
									mailgun.enviarCorreoAlumnosFalta(data4,dia,function (error) {
										if (error) {
											console.log(error);
											throw error;
										};
									})//mailgun.enviarCorreoAlumnosFalta
								}//else error buscarFaltasDeAlumnosNoConvalidados
							})//buscarFaltasDeAlumnosNoConvalidados
						}//else dia completo
					})//dia completo
				}//else error hora actual
			})//hora actual
		}//else error dia de la semana
	})//dia de la semana
	falta.updatePresencia0ATodos(function (error) {
		if (error) {
			console.log(error);
			throw error;
		}else{
			io.emit('refresh','Presencia 0 a todos');
		}
	});//falta.updatePresencia
}

/*
*	FIN Later
*/



/*
*	devuelve la hora del sistema hh:mm:ss
*/
time.horaActual = function(callback) {
	var now = new Date();
	now.setHours(now.getUTCHours()+1);
	var curr_time;
	var hour = now.getHours();
	var min = now.getMinutes();
	var sec = now.getSeconds();
	if (hour < 10) {
		hour = "0"+hour;
	};//.if
	if (min < 10) {
		min = "0"+min;
	};//.if
	if (sec < 10) {
		sec = "0"+sec;
	};//.if
	curr_time = hour+":"+min+":"+sec;
	console.log(curr_time);
	if (curr_time) {
		callback(null,curr_time);
	}else{
		console.log("error obteniendo la hora");
	}//.else
}//.time.horaActual

/*
*	devuelve el dia de la semana
*/
time.diaDeLaSemana = function (callback) {
	var now = new Date();
	var day = diasSemana[now.getDay()];
	if (day) {
		callback(null,day);
	}else{
		console.log("Error obteniendo dia");
	}//.else
}//.time.diaDeLaSemana 

/*
*	devuelve el dia completo año,mes,dia xxxx-xx-xx
*/
time.diaCompleto = function (callback) {
	var now = new Date();
	var ano = now.getFullYear();
	var mes = now.getMonth()+1;
	if (mes < 10) {
		mes = "0"+mes;
	};//.if
	var dia = now.getDate();
	var diaCompleto = ano+"-"+mes+"-"+dia;
	if (diaCompleto) {
		callback(null,diaCompleto);
	}else{
		console.log("Error obteniendo dia completo");
	}//.else
}//.time.diaCompleto 

module.exports = time;