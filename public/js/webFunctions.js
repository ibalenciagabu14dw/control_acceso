$(document).ready(function() {

	/*
	*	Animación de paginación
	*/
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'jswing', function () {
	        window.location.hash = target;
	    });
	});
	/*
	*	FIN Animación de paginación
	*/

	/*
	*	redireccion a demo
	*/
	$('#irADemo').click(function(event) {
		window.location.replace("/demo");
	});
	/*
	*	FIN redireccion a demo
	*/

	/*
	*	Validate contact form
	*/
	//regla correo
	jQuery.validator.addMethod("correo", function(value, element) {
		return this.optional(element) || /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i.test(value);
	});
	var reglas = {
		remitente:{required:true,correo:true},
		asunto:{required:true},
		mensaje:{required:true}
	}
	var mensajes = {
		remitente:{required:" requerido",correo:" formato de correo no válido"},
		asunto:{required:" requerido"},
		mensaje:{required:" requerido"}
	}

	$('#formContact').validate({
		rules:reglas,
		messages:mensajes,
		errorPlacement:function (error,element) {
        	element.before(error);
      	},
      	submitHandler:function (form) {
        	enviarCorreo(function (res) {
        		if (res == 1) {
        			$('#submitContact').css('display', 'none');
        			$('#remitente,#asunto,#mensaje').val("");
        			$('#ok').fadeTo(2000, 500).slideUp(1000, function(){
        				$('#submitContact').css('display', 'block');
        			});
        		}else{
        			$('#noOk').fadeTo(2000, 500).slideUp(1000, function(){});
        		}
        	});//enviarCorreo
      	}//submitHandler
	})//validate

	/*
	*	FIN Validate contact form
	*/

	/*
	*	Validate demo form
	*/
	var reglasDemo = {
		remitenteDemo:{required:true,correo:true},
	}
	var mensajesDemo = {
		remitenteDemo:{required:" requerido",correo:" formato de correo no válido"}
	}
	$('#formContactDemo').validate({
		rules:reglasDemo,
		messages:mensajesDemo,
		errorPlacement:function (error,element) {
        	element.before(error);
      	},
      	submitHandler:function (form) {
        	enviarCorreoDemo(function (res) {
        		if (res == 1) {
        			$('#submitContactDemo').css('display', 'none');
        			$('#remitenteDemo').val("");
        			$('#okDemo').fadeTo(2000, 500).slideUp(1000, function(){
        				$('#submitContactDemo').css('display', 'block');
        			});
        		}else{
        			$('#noOkDemo').fadeTo(2000, 500).slideUp(1000, function(){});
        		}
        	});//enviarCorreo
      	}//submitHandler
	})//validate
	/*
	*	FIN validate demo
	*/

	/*
	*	enviar correo
	*/
	function enviarCorreo (callback) {
		event.preventDefault();
		var data = $('#formContact').serializeArray();
		$.ajax({
			url: '/enviarCorreo',
			type: 'post',
			dataType: 'json',
			data: data,
			success: function (data) {
				if (data.envio == 'ok') {
					callback(1);
				}else{
					callback(0);
				}
			}//success
		})//ajax
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})	
	}//enviarCorreo
	/*
	*	FIN enviar correo
	*/

	/*
	*	enviar correo demo
	*/
	function enviarCorreoDemo (callback) {
		event.preventDefault();
		var data = $('#formContactDemo').serializeArray();
		console.log(data);
		$.ajax({
			url: '/enviarCorreoDemo',
			type: 'post',
			dataType: 'json',
			data: data,
			success: function (data) {
				if (data.envio == 'ok') {
					callback(1);
				}else{
					callback(0);
				}
			}//success
		})//ajax
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})	
	}//enviarCorreoDemo
	/*
	*	FIN enviar correo demo
	*/
	
});