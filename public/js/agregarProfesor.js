$(document).ready(function() {

    //FALTA VALIDAR EL DNI,CORREO,FOTO
    //METODO DNI
    //METODO CORREO
    //TAMAÑO FOTO
    jQuery.validator.addMethod("dni", function(value, element) {
        return this.optional(element) || /(\d{8})([-]?)([A-Z]{1})/i.test(value);
    });

    //regla correo
    jQuery.validator.addMethod("correo", function(value, element) {
        return this.optional(element) || /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i.test(value);
    });

	//reglas
	var reglas = {
		dni:{required:true,dni:true},
        nombre:{required:true},
		apellidos:{required:true},
		correo:{required:true,correo:true},
        foto:{required:true},
        num_tarjeta:{required:true},
	};
	//mensajes
	var mensajes = {
		dni:{required:" Requerido",dni:"introduce un DNI correcto"},
        nombre:{required:" Requerido"},
		apellidos:{required:" Requerido"},
		correo:{required:" Requerido",correo:"introduce un Correo correcto"},
        foto:{required:" Requerido"},
        num_tarjeta:{required:" Requerido"},
	};

	//Validate
	$("#agregarProfesorForm").validate({
        rules:reglas,
		messages:mensajes,
		errorPlacement: function(error,element){
			element.before(error);
		},
        submitHandler: function (form) {
            event.preventDefault();
            var formData = new FormData($("#agregarProfesorForm")[0]);
            console.log(formData);
            $.ajax({
                url: '/configProfesor/agregarProfesor',
                type: 'post',
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                }
            })
            .done(function(data) {
                console.log(data);
                if (data.err=="existeDNI"){
                    showAlert("#dni","error","DNI ya existente");
                } else if (data.err=="existeCorreo"){
                    showAlert("#correo","error","Correo ya existente");    
                }else if(data.err=="existeTarjeta"){
                    showAlert("#num_tarjeta","error","NumeroTarjeta ya existente");    
                }else if (data.dato=="ok"){
                    showAlert("#enlace","ok","Alumno añadida correctamente");
                }
                console.log("successdata");
            })
            .fail(function() {
                console.log("error");
            })
            /*
            *   Form Submit Fin
            */
        }//submitHandler
    });//Validate
});//ready


function showAlert(lugar,tipo,texto) {

    if (tipo=="error"){
        $('#mensaje').attr('class','alert alert-danger fade in');
    }else {
        $('#mensaje').attr('class','alert alert-success fade in');
    }
    $('#mensaje span').html(texto);
    $('#mensaje').insertAfter(lugar);
    $('#mensaje').fadeTo(2000, 500).slideUp(500, function(){
                });
    }