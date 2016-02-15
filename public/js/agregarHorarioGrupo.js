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
		dia:{required:"",valueNotEquals: "" },
        hora_inicio:{required:""},
		hora_final:{required:""},
		id_grupo:{required:"",valueNotEquals: "" },
        id_asignatura:{required:"",valueNotEquals: "" },
        id_aula:{required:"",valueNotEquals: "" },
	};

	//Validate
	$("#agregarHorarioGrupoForm").validate({
        rules:reglas,
        messages:mensajes,
        highlight: function(element) {
                var id_attr = "#" + $( element ).attr("id") + "1";
                $(element).closest('.form-inline').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove'); 
        },
        unhighlight: function(element) {
                var id_attr = "#" + $( element ).attr("id") + "1";
                $(element).closest('.form-inline').removeClass('has-error').addClass('has-success');
                $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');         
        },
        errorPlacement: function(error,element){
        },
        submitHandler: function (form) {
            if ($('#hora_inicio').val() > $('#hora_final').val()){
                $('#hora_inicio').closest('.form-inline').removeClass('has-success').addClass('has-error');
                $('#hora_inicio1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                $('#hora_final').closest('.form-inline').removeClass('has-success').addClass('has-error');
                $('#hora_final1').removeClass('glyphicon-ok').addClass('glyphicon-remove');                
                showAlertValidate("#alertHoraInicio"," Hora Inicio no puede ser mayor a la Hora Final ");            
            } else {
            event.preventDefault();
            var data = $("#agregarHorarioGrupoForm").serializeArray();
            $.ajax({
                url: '/configHorarioGrupo/agregarHorarioGrupo',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function (data) {

                }
            })
            .done(function(data) {
                if (data.err=="existe"){
                $('#selectDiaHorarioGrupo').closest('.form-inline').removeClass('has-success').addClass('has-error');
                $('#selectDiaHorarioGrupo1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                $('#hora_inicio').closest('.form-inline').removeClass('has-success').addClass('has-error');
                $('#hora_inicio1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                $('#hora_final').closest('.form-inline').removeClass('has-success').addClass('has-error');
                $('#hora_final1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                $('#selectHorarioGrupoGrupo').closest('.form-inline').removeClass('has-success').addClass('has-error');
                $('#selectHorarioGrupoGrupo1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                $('#selectHorarioGrupoAsignatura').closest('.form-inline').removeClass('has-success').addClass('has-error');
                $('#selectHorarioGrupoAsignatura1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                $('#selectHorarioGrupoAula').closest('.form-inline').removeClass('has-success').addClass('has-error');
                $('#selectHorarioGrupoAula1').removeClass('glyphicon-ok').addClass('glyphicon-remove');                                                
                showAlert("#enlace","error"," Horario Grupo ya existente ");                
                }else if (data.dato=="ok"){
                showAlertRedirect("#enlace","ok"," Horario Grupo añadido correctamente ",'/config');
                }
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            /*
            *   Form Submit Fin
            */
        }//.else
        }//submitHandler
    });//Validate
});//ready


function showAlertValidate(lugar,texto) {
    $('#mensaje').attr('class','alert alert-warning fade in');
    $('#mensaje span').html(texto);
    $('#mensaje').insertAfter(lugar);
    $('#mensaje').fadeTo(2000, 500).slideUp(1000, function(){
                });
    }


function showAlert(lugar,tipo,texto) {

    if (tipo=="error"){
        $('#mensaje').attr('class','alert alert-danger fade in');
    }else {
        $('#mensaje').attr('class','alert alert-success fade in');
    }
    $('#mensaje span').html(texto);
    $('#mensaje').insertAfter(lugar);
    $('#mensaje').fadeTo(2000, 500).slideUp(1000, function(){
                });

    }

function showAlertRedirect(lugar,tipo,texto,url) {

    if (tipo=="error"){
        $('#mensaje').attr('class','alert alert-danger fade in');
    }else {
        $('#mensaje strong').html(' ');
        $('#mensaje').attr('class','alert alert-success fade in');
    }
    $('#mensaje span').html(texto);
    $('#mensaje').insertAfter(lugar);
    $('#mensaje').fadeTo(2000, 500).slideUp(1000, function(){
      window.location.replace(url);
                });

    }