$(document).ready(function() {
	
	$.validator.addMethod("valueNotEquals", function(value, element, arg){
      return arg != value;
    }, "Value must not equal arg.");

    jQuery.validator.addMethod("lettersonly", function(value, element) { 
    return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);
    },"Please enter only letters");

	//reglas
	var reglas = {
		nombre:{required:true,lettersonly:true},
        clave:{required:true},
		obligatoria:{required:true},
		tipo:{required:true,valueNotEquals: "default" }
	};
	//mensajes
	var mensajes = {
		nombre:{required:"",lettersonly:""},
        clave:{required:""},
		obligatoria:{required:""},
		tipo:{required:"",valueNotEquals: "" }
	};

	//Buscar alumnos al escribir
	$('#nombre').keyup(function(event) {
		buscarAsignaturas();
	});

	//Buscar alumnos al clicar Buscar
	$('#form').submit(function(event) {
		event.preventDefault();
		buscarAsignaturas();
	});

	//Crear formulario para modificar o borrar alumno al clicar en la celda
	$('#resultado').on("click",".celda",function () {
		var datos = $(this).contents();
		buscarAsignaturaId(datos[0].id)
		.done(function(result) {
    		var formulario = "<form class='form-group' action='/modificarAsignatura' id='formUpdate' name='formUpdate' method='post'>";
    		formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='id_asignatura' class='input-group-addon'>ID ASIGNATURA</label>";    		    		
    		formulario += "<input type='text' id='id_asignatura' name='id_asignatura' class='form-control has-feedback' value='"+result[0].id_asignatura+"'readonly>";
    		formulario += "<span id='id_asignatura1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
    		formulario += "<div class='form-inline' id='alertNombre'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='nombre' class='input-group-addon'>NOMBRE</label>";    		
    		formulario += "<input type='text' id='nombre' name='nombre' class='form-control has-feedback' value='"+result[0].nombre+"'>";
    		formulario += "<span id='nombre1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
    		formulario += "<div class='form-inline' id='alertClave'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='clave' class='input-group-addon'>CLAVE</label>";     		
    		formulario += "<input type='text' id='clave' name='clave' class='form-control has-feedback' value='"+result[0].clave+"'>";
    		formulario += "<span id='clave1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";    		
    		formulario += "<div id='mensaje' style='display: none' class='alert alert-error fade in'><a href='#' data-dismiss='alert' class='close'>×</a><strong>Comprueba!</strong><span id='sp'> Clave ya existente</span></div>";	
    			if(result[0].obligatoria == 1){
					formulario += "<div class='form-inline' id='obl'>";
    				formulario += "<div class='input-group'>";
				    formulario += "<label id='labelObligatoria' for='obligatoria' class='input-group-addon'>OBLIGATORIA</label><br/>";
				    formulario += "<label id='labelradio1' for='radio1'>SI</label>";
				    formulario += "<input id='radio1' type='radio' name='obligatoria' value='1' class='radio form-control' checked='checked'/><br/>";
				    formulario += "<label id='labelradio' for='radio'>NO  </label>";
				    formulario += "<input id='radio' type='radio' name='obligatoria' value='0' class='radio form-control'/><span id='radio11' class='glyphicon form-control-feedback'></span>";
					formulario += "</br>";
					formulario += "</div>";
  					formulario += "</div><br/>";
				} else {
					formulario += "<div class='form-inline'>";
    				formulario += "<div class='input-group'>";
				    formulario += "<label id='labelObligatoria' for='obligatoria' class='input-group-addon'>OBLIGATORIA</label><br/>";
				    formulario += "<label id='labelradio1' for='radio1'>SI</label>";
				    formulario += "<input id='radio1' type='radio' name='obligatoria' value='1' class='radio form-control'/><br/>";
				    formulario += "<label id='labelradio' for='radio'>NO  </label>";
				    formulario += "<input id='radio' type='radio' name='obligatoria' value='0' class='radio form-control'checked='checked'/><span id='radio11' class='glyphicon form-control-feedback'></span>";
					formulario += "</br>";
					formulario += "</div>";
  					formulario += "</div><br/>";					
				}
				if(result[0].tipo == 'FP'){
					formulario += "<div class='form-inline'>";
    				formulario += "<div class='input-group'>";
					formulario += "<label id='labelTipoGrupo' for='tipo' class='input-group-addon'>TIPO</label>";
					formulario += "<select id='selectTipoGrupo' name='tipo' class='form-control has-feedback'>";
					formulario += "<option value='default'>Elige el tipo</option>";
					formulario += "<option value='Bachiller'>Bachiller</option>";
					formulario += "<option value='FP' selected>FP</option>";
					formulario += "</select><span id='selectTipoGrupo1' class='glyphicon form-control-feedback'></span>";
					formulario += "</div>";
  					formulario += "</div>";
				} else {
					formulario += "<div class='form-inline'>";
    				formulario += "<div class='input-group'>";
					formulario += "<label id='labelTipoGrupo' for='tipo' class='input-group-addon'>TIPO</label>";
					formulario += "<select id='selectTipoGrupo' name='tipo' class='form-control has-feedback'>";
					formulario += "<option value='default'>Elige el tipo</option>";
					formulario += "<option value='Bachiller'selected>Bachiller</option>";
					formulario += "<option value='FP'>FP</option>";
					formulario += "</select><span id='selectTipoGrupo1' class='glyphicon form-control-feedback'></span>";
					formulario += "</div>";
  					formulario += "</div>";				
				}
			formulario += "</br><input type='submit' name='btnModificar' id='btnModificar' class='btn btn-warning' value='Modificar'>";
    		formulario += "&nbsp;<button id='btnBorrar' class='btn btn-danger'>Borrar</button>";
    		formulario += "&nbsp;<a id='enlace2' href='/config' class='btn btn-primary'>Volver</a>";
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
	        if (element.type == "radio"){
	            if ($("input[name=obligatoria]:checked").val() == 1){
	                $(element).closest('.form-inline').removeClass('has-success').addClass('has-error');
	                $("#radio11").removeClass('glyphicon-ok').addClass('glyphicon-remove');
	            } else {
	                $(element).closest('.form-inline').removeClass('has-success').addClass('has-error');
	                $("#radio11").removeClass('glyphicon-ok').addClass('glyphicon-remove'); 
	            }
	        } else {
	                var id_attr = "#" + $( element ).attr("id") + "1";
	                $(element).closest('.form-inline').removeClass('has-success').addClass('has-error');
	                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove'); 
	        }
	      
	        },
	        unhighlight: function(element) {
	            if (element.type == "radio"){
	                if ($("input[name=obligatoria]:checked").val() == 1){
	                    $(element).closest('.form-inline').removeClass('has-error').addClass('has-success');
	                    $("#radio11").removeClass('glyphicon-remove').addClass('glyphicon-ok'); 
	                } else {
	                    $(element).closest('.form-inline').removeClass('has-error').addClass('has-success');
	                    $("#radio11").removeClass('glyphicon-remove').addClass('glyphicon-ok'); 
	                }
	            } else {
	                var id_attr = "#" + $( element ).attr("id") + "1";
	                $(element).closest('.form-inline').removeClass('has-error').addClass('has-success');
	                $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');  
	            }         
	        },
			errorPlacement: function(error,element){
				//error.insertBefore($(element).closest('.form-inline'));
	            if (error.attr("id") == "nombre-error"){
	                showAlertValidate("#alertNombre"," Solo Letras por favor");
	            }
			},
	        submitHandler: function (form) {
	            event.preventDefault();
	            var data = $("#formUpdate").serializeArray();
	            console.log(data);
	            $.ajax({
	                url: '/configAsignatura/modificarAsignatura',
	                type: 'post',
	                dataType: 'json',
	                data: data,
	                success: function (data) {
	                }
	            })
	            .done(function(data) {
		                console.log(data);
		                if (data.err=="existe"){
		                	showAlert("#alertClave","error"," Clave ya existente");
			                $('#clave').closest('.form-inline').removeClass('has-success').addClass('has-error');
			                $('#clave1').removeClass('glyphicon-ok').addClass('glyphicon-remove'); 		                
		                }else if (data.dato=="ok"){
			                $('#id_asignatura').closest('.form-inline').removeClass('has-error').addClass('has-success');
			                $('#id_asignatura1').removeClass('glyphicon-remove').addClass('glyphicon-ok');		                	
		                	showAlertRedirect("#enlace2","ok"," Asignatura modificada correctamente",'/config'); 			                	
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
	  //$( "#target" ).submit();
	});

	



	//Funcion con ajax para recoger datos alumnos y crear tabla
	function buscarAsignaturas () {
		var formData = $('#form').serializeArray();
		$.ajax({
			url: '/configAsignatura/buscarAsignaturaNombre',
			type: 'post',
			dataType: 'json',
			data: formData,
			success:function (data) {
				var resp = "";
				for (var i = 0; i < data.length; i++) {
					resp += "<table class='table'><tr class='active'><td class='celda'>";
					resp += "<h3 id='"+data[i].id_asignatura+"'>"+data[i].nombre+" "+data[i].tipo+"</h3>";
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
	}//function buscarAsignaturas

	//funcion para buscar alumnos por id
	function buscarAsignaturaId (id) { 
		return	$.ajax({
					url: '/configAsignatura/buscarAsignaturaPorId',
					type: 'post',
					dataType: 'json',
					data:{ id_asignatura:id },
					success:function (data) {
					}
				})//ajax
				.done(function() {
					console.log("success");
				})//done
				.fail(function() {
					console.log("error");
				})//fail
	}//function buscarProfesores
	
			//Al clicar en borrar el alumno
	$('#resultado').on("click","#btnBorrar",function(event) {
		event.preventDefault();
		console.log($('#resultado #id_asignatura').val());
		if(confirm("Estas seguro de borrar la asignatura?")) {
			$.ajax({
				url: '/configAsignatura/borrarAsignatura',
				type: 'post',
				dataType: 'html',
				data: {'id_asignatura':$('#resultado #id_asignatura').val()},
				success:function(data){
				}//success
			})//ajax
			.done(function(data) {
				console.log("success borrar");
				if (data[9]=="o"){
					showAlertRedirect("#enlace2","ok"," Asignatura borrada correctamente",'/config');
				}
				
			})//done
			.fail(function() {
				console.log("error borrar");
			})//fail
		}//if confirm
	});//click borrar formulario asiganura
	
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