$(document).ready(function() {
	/*
	*	Formulario
	*/
	var form = "<form id='formBuscador' class='form-group'>";
	form += "<div id='accordion'>";
	form += "<h3><a href='#'>Por nombre</a></h3>";
	form += "<div><label for='nombre'>Nombre: </label><input type='text' id='nombre' name='nombre' class='required form-control' /><label for='apellidos'>Apellidos: </label><input type='text' id='apellidos' name='apellidos' class='required form-control' /></div>";
	form += "<h3><a href='#'>Por DNI</a></h3>";
	form += "<div><label for='dni'>DNI: </label><input type='text' id='dni' name='dni' class='required form-control' /></div>";
	form += "<h3><a href='#'>Por correo</a></h3>";
	form += "<div><label for='correo'>Correo:</label><input type='text' id='correo' name='correo' class='required form-control' /></div>";
	form += "</div>";
	form += "<p><button id='buscadorSubmit' class='btn btn-primary'>Buscar</button></p>";
	$('#buscador').html(form);
	$("#accordion").accordion();

	/*
	*	Formulario fin
	*/

	/*
	*	Validate
	*/
	//regla dni
	jQuery.validator.addMethod("dni", function(value, element) {
		return this.optional(element) || /(\d{8})([-]?)([A-Z]{1})/i.test(value);
	});

	//regla correo
	jQuery.validator.addMethod("correo", function(value, element) {
		return this.optional(element) || /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i.test(value);
	});

	//reglas
	var reglas = {
		nombre:{required:true},
		apellidos:{required:true},
		dni:{required:true,dni:true},
		correo:{required:true,correo:true}
	};
	//mensajes
	var mensajes = {
		nombre:{required:" Requerido"},
		apellidos:{required:" Requerido"},
		dni:{required:" Requerido", dni:" Formato no válido"},
		correo:{required:" Requerido",correo:" Formato no válido"}
	};

	//Validate
	$("#buscador #formBuscador").validate({
        rules:reglas,
		messages:mensajes,
		errorPlacement: function(error,element){
			element.before(error);
				}
    });

    /*
    *	Validate Fin
    */

    /*
    *	Dialog
    */
	$( "#buscador").dialog({
      autoOpen: false,
      modal:true,
      maxWidth:700,
      maxHeight: 500,
      width: 700,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      }
    });//dialog buscador

    //al clicar en el boton horario abrir el dialog
	$('#botonBuscador').click(function() {
		$( "#buscador" ).dialog( "open" );
    });

    /*
    *	Dialog Fin
    */

    /*
    *	Form Submit
    */
    $('#formBuscador').submit(function(event) {
    	event.preventDefault();
    	var data = $(this).serializeArray();
    	console.log(data);
    	$.ajax({
    		url: '/buscarPersona',
    		type: 'get',
    		dataType: 'json',
    		data: data,
    		success: function (data) {
    			var resp = "<table class='table table-hover'><tr><th>Nombre</th><th>Apellidos</th><th>Correo</th></tr>";
                for (var i = 0; i < data.length; i++) {
                    resp += "<tr><td id='"+data[i].id_alumno+"'>"+data[i].nombre+"</td><td>"+data[i].apellidos+"</td><td>"+data[i].correo+"</td></tr>";
                };
                resp += "</table>";
                $('#buscador').html(resp);
    		}
    	})
    	.done(function() {
    		console.log("success");
    	})
    	.fail(function() {
    		console.log("error");
    	})
    });

    /*
    *	Form Submit Fin
    */
});