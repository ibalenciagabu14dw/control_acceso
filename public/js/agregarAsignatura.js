$(document).ready(function() {

     $.validator.addMethod("valueNotEquals", function(value, element, arg){
      return arg != value;
     }, "Value must not equal arg.");

	//reglas
	var reglas = {
		nombre:{required:true},
        clave:{required:true},
		obligatoria:{required:true},
		tipo:{required:true,valueNotEquals: "default" }
	};
	//mensajes
	var mensajes = {
		nombre:{required:" Requerido"},
        clave:{required:" Requerido"},
		obligatoria:{required:" Requerido"},
		tipo:{required:" Requerido",valueNotEquals: "elige un tipo: FP O Bachiller" }
	};

	//Validate
	$("#agregarAsignaturasForm").validate({
        rules:reglas,
		messages:mensajes,
		errorPlacement: function(error,element){
			element.before(error);
		},
        submitHandler: function (form) {
            event.preventDefault();
            var data = $("#agregarAsignaturasForm").serializeArray();
            console.log(data);
            $.ajax({
                url: '/agregarAsignatura',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function (data) {

                }
            })
            .done(function(data) {
                console.log(data);
                if (data.err=="existe"){
                    //$('#mensaje').show();
                    //$('#mensaje').fadeTo(2000, 500).slideUp(500, function(){
                    //$(".alert-dismissable").alert('close');
                    //});
                showAlert("#clave","error","Clave ya existente");
                }else if (data.dato=="ok"){
                showAlert("#send","ok","Asignatura añadida correctamente");
                }
                console.log("success");
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
                    //$(".alert-dismissable").alert('close');
                });

//            $('#mensaje').html('<div class="alert"><a class="close" data-dismiss="alert">×</a><span>'+message+'</span></div>')
    }