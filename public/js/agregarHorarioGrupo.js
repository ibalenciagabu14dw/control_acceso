$(document).ready(function() {

     $.validator.addMethod("valueNotEquals", function(value, element, arg){
      return arg != value;
     }, "Value must not equal arg.");

	//reglas
	var reglas = {
		dia:{required:true,valueNotEquals: "default" },
        hora_inicio:{required:true},
		hora_final:{required:true},
		id_grupo:{required:true,valueNotEquals: "default" },
        id_asignatura:{required:true,valueNotEquals: "default" },
        id_aula:{required:true,valueNotEquals: "default" },
	};
	//mensajes
	var mensajes = {
		dia:{required:" Requerido",valueNotEquals: "elige el dia" },
        hora_inicio:{required:" Requerido"},
		hora_final:{required:" Requerido"},
		id_grupo:{required:" Requerido",valueNotEquals: "elige el grupo" },
        id_asignatura:{required:" Requerido",valueNotEquals: "elige la asignatura" },
        id_aula:{required:" Requerido",valueNotEquals: "elige el aula" },
	};

	//Validate
	$("#agregarHorarioGrupoForm").validate({
        rules:reglas,
		messages:mensajes,
		errorPlacement: function(error,element){
			element.before(error);
		},
        submitHandler: function (form) {
            event.preventDefault();
            var data = $("#agregarHorarioGrupoForm").serializeArray();
            //console.log(data);
            $.ajax({
                url: '/agregarHorarioGrupo',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function (data) {

                }
            })
            .done(function(data) {
                console.log(data);
                if (data.err=="existe"){
                showAlert("#dia","error","Dia ya existente");
                showAlert("#hora_inicio","error","Hora Inicio ya existente");
                showAlert("#hora_final","error","Hora Final ya existente");
                showAlert("#id_grupo","error","grupo ya existente");
                }else if (data.dato=="ok"){
                showAlert("#enlace","ok","HorarioGrupo añadida correctamente");
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
                });
    }