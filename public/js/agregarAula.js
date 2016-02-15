$(document).ready(function() {

	//reglas
	var reglas = {
		numero:{required:true,max: 250},
        piso:{required:true,max:3},
		capacidad:{required:true,max:30},
	};
	//mensajes
	var mensajes = {
		numero:{required:"",max:""},
        piso:{required:"",max:""},
		capacidad:{required:"",max:""},
	};

	//Validate
	$("#agregarAulaForm").validate({
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
            //error.insertBefore($(element).closest('.form-inline'));
            if (error.attr("id") == "numero-error"){
                showAlertValidate("#alertNumero"," Numero maximo 250");
            } else if (error.attr("id") == "piso-error"){
                 showAlertValidate("#alertPiso"," Piso maximo 3");
            } else if (error.attr("id") == "capacidad-error"){
                 showAlertValidate("#alertCapacidad"," Capacidad maxima 30");
            }
        },
        submitHandler: function (form) {
            event.preventDefault();
            var data = $("#agregarAulaForm").serializeArray();
            console.log(data);
            $.ajax({
                url: '/configAula/agregarAula',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function (data) {
                }
            })
            .done(function(data) {
                console.log(data);
                if (data.err=="existe"){
                showAlert("#alertNumero","error"," Aula ya existente ");
                $('#numero').closest('.form-inline').removeClass('has-success').addClass('has-error');
                $('#numero1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                }else if (data.dato=="ok"){
                showAlertRedirect("#enlace","ok","Aula añadida correctamente",'/config');
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