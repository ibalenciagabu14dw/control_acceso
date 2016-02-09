$(document).ready(function() {

     $.validator.addMethod("valueNotEquals", function(value, element, arg){
      return arg != value;
     }, "Value must not equal arg.");

	//reglas
	var reglas = {
		fecha:{required:true},
        id_alumno:{required:true},
		id_horario_grupo:{required:true},
		observaciones:{required:true},
	};
	//mensajes
	var mensajes = {
		fecha:{required:""},
        id_alumno:{required:""},
		id_horario_grupo:{required:""},
		observaciones:{required:""},
	};

	
	//Buscar alumnos al escribir
	$('#nombre').keyup(function(event) {
		buscarFaltas();
	});

	//Buscar alumnos al clicar Buscar
	$('#form').submit(function(event) {
		event.preventDefault();
		buscarFaltas();
	});
	//Crear formulario para modificar o borrar alumno al clicar en la celda
	$('#resultado').on("click",".celda",function () {
		var datos = $(this).contents();
		console.log(datos);
		buscarFaltaId(datos[0].id)
		.done(function(result) {
    		var formulario = "<form class='form-group' action='/updateFalta' id='formUpdate' name='formUpdate' method='post'>";
    		formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='id_faltas' class='input-group-addon'>ID FALTA</label>";   		
    		formulario += "<input type='text' id='id_faltas' name='id_faltas' class='form-control' value='"+result[0].id_faltas+"'readonly>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
			formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label id='labelFecha' for='fecha' class='input-group-addon'>FECHA</label>"; 
			var prueba = result[0].fecha;
			var prueba2 = prueba.split('T')[0];
            formulario += "<input id='fecha' type='text' name='fecha' class='form-control has-feedback' value='"+prueba2+"'/></br>";
       		formulario += "<span id='fecha1' class='glyphicon form-control-feedback'></span>";
            formulario += "</div>";
  			formulario += "</div><br/>";            
    		formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='id_alumno' class='input-group-addon'>ID ALUMNO</label>";   		
    		formulario += "<input type='text' id='id_alumno' name='id_alumno' class='form-control' value='"+result[0].id_alumno+"'>";
    		formulario += "<span id='id_alumno1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
    		formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='id_horario_grupo' class='input-group-addon'>ID HORARIO GRUPO</label>";   		
    		formulario += "<input type='text' id='id_horario_grupo' name='id_horario_grupo' class='form-control' value='"+result[0].id_horario_grupo+"'>";
    		formulario += "<span id='id_horario_grupo1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
    		formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='observaciones' class='input-group-addon'>OBSERVACIONES</label>";   		
    		formulario += "<textarea id='observaciones' name='observaciones' class='form-control'>"+result[0].observaciones+"</textarea>";
    		formulario += "<span id='observaciones1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";			
			formulario += "</br><input type='submit' name='btnModificar' id='btnModificar' class='btn btn-warning' value='Modificar'>";
    		formulario += "&nbsp;<button id='btnBorrar' class='btn btn-danger'>Borrar</button>";
    		formulario += "&nbsp;<a id='enlace2' href='/config' class='btn btn-primary'>Volver</a>";
    		formulario += "<div id='mensaje' style='display: none' class='alert alert-error fade in'><a href='#' data-dismiss='alert' class='close'>×</a><strong>Comprueba!</strong><span id='sp'> Nombre ya existente</span></div>";	
    		formulario += "</form>";
    		$('#resultado').html(formulario);
		})
		.fail(function() {
    		console.log("error crear formulario");
		});
	});//Formulario modificar y borrar

$('#resultado').on("click","#btnModificar",function () {
		$("#formUpdate").validate({
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
	        		event.preventDefault();
	            	var data = $("#formUpdate").serializeArray();
			            $.ajax({
			                url: '/configFalta/updateFalta',
			                type: 'post',
			                dataType: 'json',
			                data: data,
			                success: function (data) {
			                }
			            })
			            .done(function(data) {
			                console.log(data)
				                if (data.err=="existeFalta"){
				                showAlert($('#resultado #enlace2'),"error","Falta ya existente");
				                }else if (data.dato=="ok"){
				                showAlertRedirect($('#resultado #enlace2'),"ok","Alumno modificada correctamente",'/config');
				                }
				                console.log("success");
					            })
					            .fail(function() {
			                console.log("error");
			            })        
	        }//submitHandler
	    });//Validate
	  //$( "#target" ).submit();
	});

	
	//Funcion con ajax para recoger datos alumnos y crear tabla
	function buscarFaltas () {
		var formData = $('#form').serializeArray();
		$.ajax({
			url: '/configFalta/buscarFaltaPorNombreAlumno',
			type: 'post',
			dataType: 'json',
			data: formData,
			success:function (data) {
				var resp = "";
				for (var i = 0; i < data.length; i++) {
					resp += "<table class='table'><tr><td class='celda'>";
					resp += "<h3 id='"+data[i].id_faltas+"'>"+data[i].id_alumno+""+data[i].fecha+"</h3>";
					resp += "</td></tr></table>";
				};
				$('#resultado').html(resp);
			}
		})//ajax
		.done(function() {
			console.log("success");
		})//done
		.fail(function() {
			console.log("error");
		})//fail
	}//function buscarFaltas

	//funcion para buscar alumnos por id
	function buscarFaltaId (id) { 
		return	$.ajax({
					url: '/configFalta/buscarFaltaPorId',
					type: 'post',
					dataType: 'json',
					data:{ id_faltas:id },
					success:function (data) {
					}
				})//ajax
				.done(function() {
					console.log("success");
				})//done
				.fail(function() {
					console.log("error");
				})//fail
	}//function buscarFaltaPorId

			//Al clicar en borrar el alumno
	$('#resultado').on("click","#btnBorrar",function(event) {
		event.preventDefault();
		if(confirm("Estas seguro de borrar la falta?")) {
			$.ajax({
				url: '/configFalta/borrarFalta',
				type: 'post',
				dataType: 'html',
				data: {'id_faltas':$('#resultado #id_faltas').val()},
				success:function(data){
				}//success
			})//ajax
			.done(function(data) {
				if (data[9]=="o"){
				showAlertRedirect("#enlace2","ok"," Falta borrada correctamente",'/config');
				}
				console.log("success borrar");
			})//done
			.fail(function() {
				console.log("error borrar");
			})//fail
		}//if confirm
	});//click borrar formulario alumno

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
        $('#mensaje').attr('class','alert alert-success fade in');
    }
    $('#mensaje span').html(texto);
    $('#mensaje').insertAfter(lugar);
    $('#mensaje').fadeTo(2000, 500).slideUp(1000, function(){
      window.location.replace(url);
                });

    }
