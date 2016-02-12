$(document).ready(function() {
    
    jQuery.validator.addMethod("lettersonly", function(value, element) { 
    return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);
	},"Please enter only letters");

    jQuery.validator.addMethod("dni", function(value, element) {
        if ($('#dni').val().length == 10){
            return this.optional(element) || /(\d{8})([-]?)([A-Z]{1})/i.test(value);
        }
    });

    //regla correo
    jQuery.validator.addMethod("correo", function(value, element) {
        return this.optional(element) || /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i.test(value);
    });

    jQuery.validator.addMethod("convertHash", function(value) {
        var hash = md5(value, '2063c1608d6e0baf80249c42e2be5804');
        $('#pass').val(hash);
        return hash;
    }, 'Hash');

	//reglas
	var reglas = {
		dni:{required:true,dni:true},
        nombre:{required:true,lettersonly:true},
		apellidos:{required:true,lettersonly:true},
		correo:{required:true,correo:true},
		password:{required:true,convertHash:true},
        num_tarjeta:{required:true},
	};
	//mensajes
	var mensajes = {
		dni:{required:"",dni:""},
        nombre:{required:"",lettersonly:""},
		apellidos:{required:"",lettersonly:""},
		correo:{required:"",correo:""},
		password:{required:"",convertHash:""},
        num_tarjeta:{required:""},
	};

	//Buscar alumnos al escribir
	$('#nombre').keyup(function(event) {
		buscarProfesores();
	});

	//Buscar alumnos al clicar Buscar
	$('#form').submit(function(event) {
		event.preventDefault();
		buscarProfesores();
	});

	//Crear formulario para modificar o borrar alumno al clicar en la celda
	$('#resultado').on("click",".celda",function () {
		var datos = $(this).contents();
		buscarProfesorPorId(datos[0].id)
		.done(function(result) {
    		var formulario = "<form class='form-group' action='/modificarProfesor' id='formUpdate' name='formUpdate'>";
    		formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='id_profesor' class='input-group-addon'>ID PROFESOR</label>";
    		formulario += "<input type='text' id='id_profesor' name='id_profesor' class='form-control' value='"+result.id_profesor+"'readonly>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
    		formulario += "<div class='form-inline' id='alertDni'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='dni' class='input-group-addon'>DNI</label>";
    		formulario += "<input type='text' id='dni' name='dni' class='form-control has-feedback' value='"+result.dni+"'>";
    		formulario += "<span id='dni1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
    		formulario += "<div id='mensaje' style='display: none' class='alert alert-error fade in'><a href='#' data-dismiss='alert' class='close'>×</a><strong>Comprueba!</strong><span id='sp'> Dni ya existente</span></div>";	    		    		
    		formulario += "<div class='form-inline' id='alertNombre'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='nombre' class='input-group-addon'>NOMBRE</label>";
    		formulario += "<input type='text' id='nombre' name='nombre' class='form-control has-feedback' value='"+result.nombre+"'>";
    		formulario += "<span id='nombre1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
    		formulario += "<div class='form-inline' id='alertApellidos'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='apellidos' class='input-group-addon'>APELLIDOS</label>";
    		formulario += "<input type='text' id='apellidos' name='apellidos' class='form-control has-feedback' value='"+result.apellidos+"'>";
    		formulario += "<span id='apellidos1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
    		formulario += "<div class='form-inline' id='alertCorreo'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='correo' class='input-group-addon'>CORREO</label>";
    		formulario += "<input type='text' id='correo' name='correo' class='form-control has-feedback' value='"+result.correo+"'>";
    		formulario += "<span id='correo1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";    		
    		formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='password' class='input-group-addon'>PASSWORD</label>";
    		formulario += "<input type='text' id='password' name='password' class='form-control has-feedback' value='"+result.password+"'>";
    		formulario += "<span id='password1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
    		formulario += "<input type='hidden' id='pass' name='pass' class='form-control'>";
    		formulario += "<img id='fotoProfesor' alt='fotoProfesor' src='data:img/png;base64,"+result.foto+"' width='100' height='100'/>";
    		formulario += "<div class='form-inline' id='alertFoto'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='foto' class='input-group-addon'>FOTO</label>";
    		formulario += "<input type='file' id='foto' name='foto' class='form-control  has-feedback'>";
    		formulario += "<span id='foto1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
    		formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='tarjeta_activada' class='input-group-addon'>TARJETA ACTIVADA</label>";
    		formulario += "<input type='text' id='tarjeta_activada' name='tarjeta_activada' class='form-control  has-feedback' value='"+result.tarjeta_activada+"'>";
    		formulario += "<span id='tarjeta_activada1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
    		formulario += "<div class='form-inline' id='alertNum_tarj'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='num_tarjeta' class='input-group-addon'>NUMERO TARJETA</label>";
    		formulario += "<input type='text' id='num_tarjeta' name='num_tarjeta' class='form-control  has-feedback' value='"+result.num_tarjeta+"'>";
    		formulario += "<span id='num_tarjeta1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
    		formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='admin' class='input-group-addon'>ADMINISTRADOR</label>";
    		formulario += "<input type='text' id='admin' name='admin' class='form-control  has-feedback' value='"+result.admin+"'>";
    		formulario += "<span id='admin1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
    		buscarAsignaturasQueImparte(result.id_profesor);
    		formulario += "<div id='asignaturasdelProfesor'>";
    		formulario += "</div>";
			formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label id='labelTipoGrupo' for='tipo' class='input-group-addon'>TIPO DE ASIGNATURA</label>";
			formulario += "<select id='tipo' name='tipo' class='form-control'>";
    		formulario += "<option value='Ambos'>Ambos</option>";
    		formulario += "<option value='FP'>FP</option>";
    		formulario += "<option value='Bachiller'>Bachiller</option>";    		
     		formulario += "</select>";
     		formulario += "</div>";
  			formulario += "</div><br/>";	
    		buscarTodasLasAsignaturas(result.id_profesor);
    		formulario += "<div id='asignaturasTodas'>";
    		formulario += "</div>";
			formulario += "<input type='submit' id='btnModificar' class='btn btn-warning' value='Modificar'>";
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
	                showAlertValidate("#alertCorreo","Introduce un correo correcto");
	            } else if (error.attr("id") == "foto-error"){
	                showAlertValidate("#alertFoto","Tamaño de la foto maximo 100Kb");
	            }
	            
	        },
	        submitHandler: function (form) {
	        if($('#resultado #asignaturasdelProfesor :checkbox').prop("checked")== false){
	        		showAlertValidate("#enlace2","El profesor tiene que tener un asignatura");
	        } else {			
	        	
	        if ($('#resultado #foto').val() == ''){

	        	
	        	event.preventDefault();
	            $('#password').attr('disabled',true);  
	            var data = $("#formUpdate").serializeArray();
	            $.ajax({
	                url: '/configProfesor/modificarProfesorSinFoto',
	                type: 'post',
	                dataType: 'json',
	                data: data,
	                success: function (data) {
	                }
	            })
	            .done(function(data) {
	                console.log(data)
	                $('#password').attr('disabled',false);
		                if (data.err=="existeDNI"){
		                showAlert($('#resultado #alertDni'),"error","dni ya existente");
		                } else if (data.err=="existeCorreo"){
		                showAlert($('#resultado #alertCorreo'),"error","Correo ya existente");
		                } else if (data.err=="existeTarjeta"){
		                showAlert($('#resultado #alertNum_tarj'),"error","Tarjeta ya existente");
		                }else if (data.dato=="ok"){
		                showAlertRedirect($('#resultado #enlace2'),"ok","Profesor modificada correctamente",'/config');
		                }
		                console.log("success");
			            })
			            .fail(function() {
	                console.log("error");
	                $('#password').attr('disabled',false);
	            })
	            /*
	            *   Form Submit Fin
	            */
	        } else {
	        		 var attach_id = $('#resultado #foto').attr("id");
					var size = $('#'+attach_id)[0].files[0].size;
					   if (size > 102400)// checks the file more than 100 Kb
			           {
			               showAlertValidate("#alertFoto","Tamaño de la foto maximo 100Kb");
			           } else {
	            event.preventDefault();
	            $('#password').attr('disabled',true);  
	            var formData = new FormData($('#resultado #formUpdate')[0]);
	            $.ajax({
	                url: '/configProfesor/modificarProfesor',
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
	                console.log(data)
	                $('#password').attr('disabled',false);
		                if (data.err=="existeDNI"){
		                showAlert($('#resultado #alertDni'),"error","dni ya existente");
		                } else if (data.err=="existeCorreo"){
		                showAlert($('#resultado #alertCorreo'),"error","Correo ya existente");
		                } else if (data.err=="existeTarjeta"){
		                showAlert($('#resultado #alertNum_tarj'),"error","Tarjeta ya existente");
		                }else if (data.dato=="ok"){
		                showAlertRedirect($('#resultado #enlace2'),"ok","Profesor modificada correctamente",'/config');
		                }
		                console.log("success");
			            })
			            .fail(function() {
	                console.log("error");
	                $('#password').attr('disabled',false);
	            })
	            /*
	            *   Form Submit Fin
	            */
	        }//.else if (size > 102400)
	        }//.else
	        }//.else
	        }//submitHandler
	    });//Validate
	  //$( "#target" ).submit();
	});

		//Funcion con buscar asignaturas
	function buscarAsignaturasQueImparte (id) {
		$.ajax({
			url: '/configProfesor/buscarAsignaturasQueImparte',
			type: 'post',
			dataType: 'json',
			data:{ id_profesor:id },
			success:function (data) {
				var resp = "";
				resp += "<div class='form-inline'>";
    			resp += "<div class='input-group'>";
				resp += "<label for='asignaturasTable' class='input-group-addon'>ASIGNATURAS QUE IMPARTE</label>";
				resp += "</div>";
  				resp += "</div><br/>";
				resp += "<table id='asignaturasTable'>";
				for (var i = 0; i < data.length; i++) {
					resp += "<tr>";
					resp += "<td>";
					resp += "<input type='checkbox' id='checkbox' name='checkbox' value='"+data[i].id_asignatura+"' checked>";
					resp += "<label for='"+data[i].id_asignatura+"'>"+data[i].nombre+"</label>";
					resp += "</td>";
					resp += "</tr>"
				};
				resp += "</table>";
				$('#asignaturasdelProfesor').html(resp);
			}
		})//ajax
		.done(function() {
			console.log("success");
		})//done
		.fail(function() {
			console.log("error");
		})//fail
	}//function buscarAsignaturas


		//Funcion con buscar asignaturas
	function buscarTodasLasAsignaturas (id) {
		$.ajax({
			url: '/configProfesor/buscarAsignaturasQueNoImpartePorId',
			type: 'post',
			dataType: 'json',
			data:{ id_profesor:id },
			success:function (data) {
				console.log(data);
				var resp = "";
				resp += "<table id='asignaturasTodas'>";			
				for (var i = 0; i < data.length; i++) {
					resp += "<tr>";
					resp += "<td>";
					resp += "<input type='checkbox' id='checkbox' name='checkbox' value='"+data[i].id_asignatura+"'>";
					resp += "<label for='"+data[i].id_asignatura+"'>"+data[i].nombre+"</label>";
					resp += "</td>";
					resp += "</tr>"
				};
				resp += "</table>";
				$('#asignaturasTodas').html(resp);
			}
		})//ajax
		.done(function() {
			console.log("success");
		})//done
		.fail(function() {
			console.log("error");
		})//fail
	}//function buscarAsignaturas
	
			//Funcion con buscar asignaturas
	function buscarAsignaturasQueNoImpartePorTipo (id,tipo) {
		$.ajax({
			url: '/configProfesor/buscarAsignaturasQueNoImpartePorTipo',
			type: 'post',
			dataType: 'json',
			data:{ id_profesor:id , tipo:tipo},
			success:function (data) {
				//console.log(data);
				var resp = "";
				resp += "<table id='asignaturasTodas'>";			
				for (var i = 0; i < data.length; i++) {
					resp += "<tr>";
					resp += "<td>";
					resp += "<input type='checkbox' id='checkbox' name='checkbox' value='"+data[i].id_asignatura+"'>";
					resp += "<label for='"+data[i].id_asignatura+"'>"+data[i].nombre+"</label>";
					resp += "</td>";
					resp += "</tr>"
				};
				resp += "</table>";
				$('#asignaturasTodas').html(resp);
			}
		})//ajax
		.done(function() {
			console.log("success");
		})//done
		.fail(function() {
			console.log("error");
		})//fail
	}//function buscarAsignaturas
	
	//Funcion con ajax para recoger datos alumnos y crear tabla
	function buscarProfesores () {
		var formData = $('#form').serializeArray();
		$.ajax({
			url: '/configProfesor/buscarProfesorNombre',
			type: 'post',
			dataType: 'json',
			data: formData,
			success:function (data) {
				var resp = "";
				for (var i = 0; i < data.length; i++) {
					resp += "<table class='table'><tr><td class='celda'>";
					resp += "<h3 id='"+data[i].id_profesor+"'>"+data[i].id_profesor+" "+data[i].nombre+"</h3>";
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
	}//function buscarProfesores

	//funcion para buscar alumnos por id
	function buscarProfesorPorId (id) { 
		return	$.ajax({
					url: '/configProfesor/buscarProfesorId',
					type: 'post',
					dataType: 'json',
					data:{ id_profesor:id },
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
		if(confirm("Estas seguro de borrar al profesor?")) {
			$.ajax({
				url: '/configProfesor/borrarProfesor',
				type: 'post',
				dataType: 'html',
				data: {'id_profesor':$('#resultado #id_profesor').val()},
				success:function(data){
				}//success
			})//ajax
			.done(function(data) {
				console.log("success borrar");
				if (data[9]=="o"){
					showAlertRedirect("#enlace2","ok"," Profesor borrado correctamente",'/config');
				}
			})//done
			.fail(function() {
				console.log("error borrar");
			})//fail
		}//if confirm
	});//click borrar formulario alumno

	//cambiar select
	$('#resultado').on("change","#tipo",function(event) {
		 //alert( this.value );
		 if(this.value == "FP"){
		 	//alert("has elegido asignaturas FP");
		 	buscarAsignaturasQueNoImpartePorTipo($('#resultado #id_profesor').val(),this.value);
		 } else if(this.value == "Bachiller"){
		 	//alert("has elegido asignaturas Bachiller");
		 	buscarAsignaturasQueNoImpartePorTipo($('#resultado #id_profesor').val(),this.value);
		 } else {
		 	//alert("has elegido todas");
		 	buscarTodasLasAsignaturas($('#resultado #id_profesor').val());
		 }
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



