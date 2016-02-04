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
		nombre:{required:" Requerido",lettersonly:"solo letras"},
        clave:{required:" Requerido"},
		obligatoria:{required:" Requerido"},
		tipo:{required:" Requerido",valueNotEquals: "elige un tipo: FP O Bachiller" }
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
    		formulario += "<input type='text' id='id_asignatura' name='id_asignatura' class='form-control' value='"+result[0].id_asignatura+"'readonly>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
    		formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='nombre' class='input-group-addon'>NOMBRE</label>";    		
    		formulario += "<input type='text' id='nombre' name='nombre' class='form-control' value='"+result[0].nombre+"'>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
    		formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='clave' class='input-group-addon'>CLAVE</label>";     		
    		formulario += "<input type='text' id='clave' name='clave' class='form-control' value='"+result[0].clave+"'>";
    		formulario += "</div>";
  			formulario += "</div><br/>";    		
    		formulario += "<div id='mensaje' style='display: none' class='alert alert-error fade in'><a href='#' data-dismiss='alert' class='close'>×</a><strong>Comprueba!</strong><span> Clave ya existente</span></div>";	
    			if(result[0].obligatoria == 1){
					formulario += "<div class='form-inline'>";
    				formulario += "<div class='input-group'>";
    				formulario += "<label id='labelObligatoria' for='obligatoria' class='input-group-addon'>OBLIGATORIA</label>";
					formulario += "<input type='radio' name='obligatoria' class='radio'  value='1' checked/>Si";
					formulario += "<input type='radio' name='obligatoria' class='radio'  value='0'/>No";
					formulario += "</br>";
					formulario += "</div>";
  					formulario += "</div><br/>";
				} else {
					formulario += "<div class='form-inline'>";
    				formulario += "<div class='input-group'>";
					formulario += "<label id='labelObligatoria' for='obligatoria' class='input-group-addon'>OBLIGATORIA</label>";
					formulario += "<input type='radio' name='obligatoria' class='radio' value='1'/>Si";
					formulario += "<input type='radio' name='obligatoria' class='radio' value='0'checked/>No";
					formulario += "</br>";
					formulario += "</div>";
  					formulario += "</div><br/>";					
				}
				if(result[0].tipo == 'FP'){
					formulario += "<div class='form-inline'>";
    				formulario += "<div class='input-group'>";
					formulario += "<label id='labelTipoGrupo' for='tipo' class='input-group-addon'>TIPO</label>";
					formulario += "<select id='selectTipoGrupo' name='tipo' class='form-control'>";
					formulario += "<option value='default'>Elige el tipo</option>";
					formulario += "<option value='Bachiller'>Bachiller</option>";
					formulario += "<option value='FP' selected>FP</option>";
					formulario += "</select>";
					formulario += "</div>";
  					formulario += "</div>";
				} else {
					formulario += "<div class='form-inline'>";
    				formulario += "<div class='input-group'>";
					formulario += "<label id='labelTipoGrupo' for='tipo' class='input-group-addon'>TIPO</label>";
					formulario += "<select id='selectTipoGrupo' name='tipo' class='form-control'>";
					formulario += "<option value='default'>Elige el tipo</option>";
					formulario += "<option value='Bachiller'selected>Bachiller</option>";
					formulario += "<option value='FP'>FP</option>";
					formulario += "</select>";
					Formulario += "</div>";
  					formulario += "</div>";				
				}
			formulario += "</br><input type='submit' name='btnModificar' id='btnModificar' class='btn btn-warning' value='Modificar'>";
    		formulario += "&nbsp;<button id='btnBorrar' class='btn btn-danger'>Borrar</button>";
    		formulario += "&nbsp;<a id='enlace' href='/config' class='btn btn-primary'>Volver</a>";
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
			errorPlacement: function(error,element){
				element.before(error);
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
	                console.log(data)
		                if (data.err=="existe"){
		                showAlert($('#resultado #clave'),"error","Clave ya existente");
		                }else if (data.dato=="ok"){
		                showAlert($('#resultado #enlace'),"ok","Asignatura modificada correctamente");
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
					resp += "<table class='table'><tr><td class='celda'>";
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
			.done(function() {
				console.log("success borrar");
			})//done
			.fail(function() {
				console.log("error borrar");
			})//fail
		}//if confirm
	});//click borrar formulario asiganura
	
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