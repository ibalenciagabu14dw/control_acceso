$(document).ready(function() {
	//regla correo
	jQuery.validator.addMethod("correo", function(value, element) {
		return this.optional(element) || /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i.test(value);
	});
	var reglas = {
		user:{required:true,correo:true},
		pass:{required:true}
	}
	var mensajes = {
		user:{required:" Requerido",correo:" Correo no válido"},
		pass:{required:" Requerido"}
	}

	$('#loginForm').validate({
		rules:reglas,
		messages:mensajes,
	})
	if($('#info').html()!=undefined){
		$('#footer').css('bottom', 'auto');
	}

	/***redirect a landing page***/
	$('#titulo').click(function(event) {
		window.location.replace("/");
	});
});//ready