$(document).ready(function() {
	var reglas = {
		user:{required:true},
		pass:{required:true}
	}
	var mensajes = {
		user:{required:" Requerido"},
		pass:{required:" Requerido"}
	}

	$('#loginForm').validate({
		rules:reglas,
		messages:mensajes,
	})
});//ready