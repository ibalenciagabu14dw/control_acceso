$(document).ready(function() {
$('img').attr("src",'/images/sshot-1.png');
    jQuery.validator.addMethod("fileSize", function (val, element) {
        var size = element.files[0].size;
        console.log(size);
           if (size > 102400)// checks the file more than 100 Kb
           {
                return false;
           } else {
               return true;
           }

      }, "File type error");
    
    jQuery.validator.addMethod("lettersonly", function(value, element) { 
    return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);
    },"Please enter only letters");

    jQuery.validator.addMethod("dni", function(value, element) {
        if ($('#dniAlumno').val().length == 10){
            return this.optional(element) || /(\d{8})([-]?)([A-Z]{1})/i.test(value);
        }
        
    },"Please enter a dni");

    //regla correo
    jQuery.validator.addMethod("correo", function(value, element) {
        return this.optional(element) || /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i.test(value);
    },"Please enter a correct email");
    
	//reglas
	var reglas = {
		dni:{required:true,dni:true},
        nombre:{required:true,lettersonly:true},
		apellidos:{required:true,lettersonly:true},
		correo:{required:true,correo:true},
        foto:{required:true,fileSize:true},
        num_tarjeta:{required:true},
	};
	//mensajes
	var mensajes = {
		dni:{required:"",dni:""},
        nombre:{required:"",lettersonly:""},
		apellidos:{required:"",lettersonly:""},
		correo:{required:"",correo:""},
        foto:{required:"",fileSize:""},
        num_tarjeta:{required:""},
	};

	//Validate
	$("#agregarAlumnoForm").validate({
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
            console.log(error.attr("id"));
            if (error.attr("id") == "dni-error"){
                 showAlertValidate("#alertDni"," Introduce un dni correcto");
            } else if (error.attr("id") == "nombre-error"){
                showAlertValidate("#alertNombre"," Solo Letras por favor");
            }else if (error.attr("id") == "apellidos-error"){
                showAlertValidate("#alertApellidos"," Solo Letras por favor");
            } else if (error.attr("id") == "correo-error"){
                showAlertValidate("#alertCorreo"," Introduce un correo correcto");
            } else if (error.attr("id") == "foto-error"){
                showAlertValidate("#alertFoto"," Tamaño de la foto maximo 100Kb");
            }
            
        },
        submitHandler: function (form) {
            event.preventDefault();
            var formData = new FormData($("#agregarAlumnoForm")[0]);
            console.log(formData);
            $.ajax({
                url: '/configAlumno/agregarAlumno',
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
                    $('#dni').closest('.form-inline').removeClass('has-success').addClass('has-error');
                    $('#dni1').removeClass('glyphicon-ok').addClass('glyphicon-remove');                    
                    showAlert("#alertDni","error"," DNI ya existente ");                
                } else if (data.err=="existeCorreo"){
                    $('#correo').closest('.form-inline').removeClass('has-success').addClass('has-error');
                    $('#correo1').removeClass('glyphicon-ok').addClass('glyphicon-remove');                        
                    showAlert("#alertCorreo","error"," Correo ya existente ");
                }else if(data.err=="existeTarjeta"){
                    $('#num_tarjeta').closest('.form-inline').removeClass('has-success').addClass('has-error');
                    $('#num_tarjeta1').removeClass('glyphicon-ok').addClass('glyphicon-remove');                        
                    showAlert("#alertNum_tarj","error"," Numero Tarjeta ya existente ");
                }else if (data.dato=="ok"){
                    showAlertRedirect("#enlace","ok"," Alumno añadido correctamente ",'/config');
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

function showAlertValidate(lugar,texto) {
    $('#mensaje').attr('class','alert alert-warning fade in');
    $('#mensaje span').html(texto);
    $('#mensaje').insertAfter(lugar);
    $('#mensaje').show(1000, function(){
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
    $('#mensaje').show(1000, function(){
                });

    }

function showAlertRedirect(lugar,tipo,texto,url) {

    if (tipo=="error"){
        $('#mensaje2').attr('class','alert alert-danger fade in');
    }else {
        $('#mensaje2 strong').html(' ');
        $('#mensaje2').attr('class','alert alert-success fade in');
    }
    $('#mensaje2 span').html(texto);
    $('#mensaje2').insertAfter(lugar);
    $('#mensaje2').slideToggle("slow", function(){
      window.setTimeout(function() {
        window.location.replace(url);
    }, 4000);
    });

 }