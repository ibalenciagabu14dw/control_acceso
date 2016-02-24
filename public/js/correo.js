$(document).ready(function() {

	crearFormularioCorreo();

	$('#enviarCorreo').click(function(event) {
    	$("#divCorreo").dialog("open");
	});

	function crearFormularioCorreo () {
		var formulario;
		formulario = "<form id='formularioCorreo' class='form-group'>";
		formulario += "<div id='ok' class='alert alert-success fade in' style='display:none'><strong>OK</strong> El correo ha sido enviado</div>";
		formulario += "<div id='noOk' class='alert alert-danger fade in' style='display:none'><strong>Error</strong> El correo no ha sido enviado</div>";
		formulario += "<label for='remitente'>Remitente: </label>";
		formulario += "<input type='text' id='remitente' name='remitente' class='form-control'/>";
		formulario += "<br/><label for='asunto'>Asunto: </label>";
		formulario += "<input type='text' id='asunto' name='asunto' class='form-control'/>";
		formulario += "<br/><label for='mensaje'>Mensaje: </label>";
		formulario += "<textarea id='mensaje' name='mensaje' class='form-control' rows='5'></textarea>";
		formulario += "<br/><input id='submitCorreo' type='submit' class='btn btn-primary' value='Enviar'/>";
		formulario += "</form>";

		$('#divCorreo').html(formulario);
        //dialog para el formulario
        $( "#divCorreo").dialog({
          autoOpen: false,
          modal:true,
          maxWidth:900,
          maxHeight: 500,
          width: 'auto',
          fluid: true,
          autoReposition: true,
          show: {
            effect: "blind",
            duration: 1000
          },
          hide: {
            effect: "explode",
            duration: 1000
          },
          close: function (event,ui) {
            crearFormularioCorreo();
          }//close
        });//dialog

        //regla correo
		jQuery.validator.addMethod("correo", function(value, element) {
			return this.optional(element) || /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i.test(value);
		});
        //validate
        var reglas = {
        	remitente:{required:true,correo:true},
        	asunto:{required:true,maxlength:50},
        	mensaje:{required:true}
        }
        var mensajes = {
        	remitente:{required:" Requerido",correo:" Correo no válido"},
        	asunto:{required:" Requerido",maxlength:" Demasiado largo"},
        	mensaje:{required:" Requerido"}
        }
        $('#divCorreo #formularioCorreo').validate({
        	rules:reglas,
        	messages:mensajes,
        	errorPlacement:function (error,element) {
            	element.before(error);
          	},
          	submitHandler:function (form) {
            	enviarCorreo(function (res) {
            		if (res == 1) {
            			$('#ok').fadeTo(2000, 500).slideUp(1000, function(){
            				$("#divCorreo").dialog("close");
            				crearFormularioCorreo();
            			});
            		}else{
            			$('#noOk').fadeTo(2000, 500).slideUp(1000, function(){
            				$("#divCorreo").dialog("close");
            				crearFormularioCorreo();
            			});
            		}
            	});//enviarCorreo
          	}//submitHandler
        })//validate

	}//crearFormularioCorreo

	function enviarCorreo (callback) {
		event.preventDefault();
		var data = $('#divCorreo #formularioCorreo').serializeArray();
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
});