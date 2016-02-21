$(document).ready(function() {
$('#footer').css('bottom', 0);
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
	$('#nombrebusqueda').keyup(function(event) {
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
		$('#footer').css('bottom', "auto");		
    		var formulario = "<form class='form-group' action='/updateFalta' id='formUpdate' name='formUpdate' method='post'>";
    		formulario += "<div class='form-inline has-success'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='id_faltas' class='input-group-addon'>FALTA</label>";   		
    		formulario += "<input type='text' id='id_faltas' name='id_faltas' class='form-control has-feedback' value='"+result[0].id_faltas+"'readonly>";
    		formulario += "<span id='id_faltas1' class='glyphicon form-control-feedback glyphicon-ok'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
			formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label id='labelFecha' for='fecha' class='input-group-addon'>FECHA</label>"; 
			var fecha = result[0].fecha;
			var fechaCortada = fecha.split('T')[0];
            formulario += "<input id='fecha' type='text' name='fecha' class='form-control has-feedback' value='"+fechaCortada+"' readonly/></br>";
       		formulario += "<span id='fecha1' class='glyphicon form-control-feedback'></span>";
            formulario += "</div>";
  			formulario += "</div><br/>";            
  			buscarTodosLosIdNombreApellidosAlumno(result[0].id_alumno);
			formulario += "<div id='alumnos'>";
    		formulario += "</div>";	
    		formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='id_horario_grupo' class='input-group-addon'>ID HORARIO GRUPO</label>";   		
    		formulario += "<input type='text' id='id_horario_grupo' name='id_horario_grupo' class='form-control' value='"+result[0].id_horario_grupo+"' readonly>";
    		formulario += "<span id='id_horario_grupo1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
  			mostrarHorarioGrupo(result[0].id_horario_grupo);
			formulario += "<div id='horarioGrupo'>";
    		formulario += "</div>";
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
    		formulario += "<div id='mensaje2' style='display: none' class='alert alert-error fade in'><a href='#' data-dismiss='alert' class='close'>×</a><strong>Comprueba!</strong><span id='sp2'> Clave ya existente</span></div>";
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
	            	console.log(data);
			            $.ajax({
			                url: '/configFalta/updateFalta',
			                type: 'post',
			                dataType: 'json',
			                data: data,
			                success: function (data) {
			                }
			            })
			            .done(function(data) {
				                if (data.err=="existe"){
                				$('#id_faltas').closest('.form-inline').removeClass('has-success').addClass('has-error');
                				$('#id_faltas1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                				$('#fecha').closest('.form-inline').removeClass('has-success').addClass('has-error');
                				$('#fecha1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                				$('#selectAlumnoFaltasM').closest('.form-inline').removeClass('has-success').addClass('has-error');
                				$('#selectAlumnoFaltasM1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                				$('#id_horario_grupo').closest('.form-inline').removeClass('has-success').addClass('has-error');
                				$('#id_horario_grupo1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                				$('#dia').closest('.form-inline').removeClass('has-success').addClass('has-error');
                				$('#dia1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                				$('#hora_inicio').closest('.form-inline').removeClass('has-success').addClass('has-error');
                				$('#hora_inicio1').removeClass('glyphicon-ok').addClass('glyphicon-remove');				                
                				$('#hora_final').closest('.form-inline').removeClass('has-success').addClass('has-error');
                				$('#hora_final1').removeClass('glyphicon-ok').addClass('glyphicon-remove');					                
                				$('#observaciones').closest('.form-inline').removeClass('has-success').addClass('has-error');
                				$('#observaciones1').removeClass('glyphicon-ok').addClass('glyphicon-remove');	
				                showAlert($('#resultado #enlace2'),"error"," Falta ya existente ");
				                }else if (data.dato=="ok"){
                				$('#id_faltas').closest('.form-inline').removeClass('has-error').addClass('has-success');
                				$('#id_faltas1').removeClass('glyphicon-remove').addClass('glyphicon-ok');				                
                				$('#dia').closest('.form-inline').removeClass('has-error').addClass('has-success');
                				$('#dia1').removeClass('glyphicon-remove').addClass('glyphicon-ok');	
                				$('#hora_inicio').closest('.form-inline').removeClass('has-error').addClass('has-success');
                				$('#hora_inicio1').removeClass('glyphicon-remove').addClass('glyphicon-ok');					                
                				$('#hora_final').closest('.form-inline').removeClass('has-error').addClass('has-success');
                				$('#hora_final1').removeClass('glyphicon-remove').addClass('glyphicon-ok');	
				                showAlertRedirect($('#resultado #enlace2'),"ok"," Falta modificada correctamente",'/config');
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
				console.log(data);
				var resp = "";
				for (var i = 0; i < data.length; i++) {
					resp += "<table class='table'><tr class='active'><td class='celda'>";
					console.log(data);
					var fecha = data[i].fecha;
					var fechaCortada = fecha.split('T')[0];
					resp += "<h3 class='busquedaH3' id='"+data[i].id_faltas+"'>"+data[i].nombre+""+' '+""+data[i].apellidos+""+' '+""+fechaCortada+"</h3>";
					resp += "<img class='busquedaFoto id='fotoAlumno' alt='fotoAlumno' src='data:img/png;base64,"+data[i].foto+"'/>";					
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


		function buscarTodosLosIdNombreApellidosAlumno (id_alumno) {
			var result = id_alumno;
		$.ajax({
			url: '/configAlumno/buscarTodosLosIdNombreApellidosAlumno',
			type: 'post',
			dataType: 'json',
			success:function (data) {
				var resp = "";
				resp += "<div class='form-inline'>";
                resp += "<div class='input-group'>";
                resp += "<label id='labelAlumnoFaltas' for='id_alumno' class='input-group-addon'>ALUMNO</label>";
                resp += "<select id='selectAlumnoFaltasM' name='id_alumno' class='form-control has-feedback'>";
    			resp += "<option value='default'>Elige el alumno</option>";
				for (var i = 0; i < data.length; i++) {
					if (data[i].id_alumno == result){
						resp += "<option value="+data[i].id_alumno+" selected>"+data[i].nombre+"</option>";
					} else {
						resp += "<option value="+data[i].id_alumno+">"+data[i].nombre+"</option>";
					}
				};
				resp += "</select><span id='selectAlumnoFaltasM1' class='glyphicon form-control-feedback'></span>";
				resp += "</div>";
                resp += "</div><br/>";
				$('#alumnos').html(resp);
			}
		})//ajax
		.done(function() {
			console.log("success");
		})//done
		.fail(function() {
			console.log("error");
		})//fail
	}//function buscarTodosLosIdNombreApellidosAlumno


			function mostrarHorarioGrupo (id_horario_grupo) {
			var id = id_horario_grupo;
		$.ajax({
			url: '/configHorarioGrupo/buscarHorarioGrupoPorId',
			type: 'post',
			dataType: 'json',
			data:{ id_horario_grupo:id },
				success:function (data) {
					var resp = "";
					resp += "<table id='horario'>";
				for (var i = 0; i < data.length; i++) {
					resp += "<tr>";
					resp += "<td>";
					resp += "<div class='form-inline has-success'>";
    				resp += "<div class='input-group'>";
					resp += "<label id='labelDiaHorarioProfesor' for='dia' class='input-group-addon'>DIA</label>"; 
					resp += "<input type='text' id='dia' name='dia' class='form-control has-feedback' value='"+data[i].dia_semana+"'readonly></br>";
					resp += "<span id='dia1' class='glyphicon form-control-feedback glyphicon-ok'></span>";
					resp += "</div>";
  					resp += "</div><br/>";
  					resp += "<div class='form-inline has-success'>";
    				resp += "<div class='input-group'>";
					resp += "<label id='labelHoraInicioHorarioProfesor' for='hora_inicio' class='input-group-addon'>HORA INICIO</label>"; 
					resp += "<input type='time' id='hora_inicio' name='hora_inicio' class='form-control has-feedback' value='"+data[i].hora_inicio+"'readonly></br>";
					resp += "<span id='hora_inicio1' class='glyphicon form-control-feedback glyphicon-ok'></span>";
					resp += "</div>";
  					resp += "</div><br/>";
  					resp += "<div class='form-inline has-success'>";
    				resp += "<div class='input-group'>";
					resp += "<label id='labelHoraFinalHorarioProfesor' for='hora_final' class='input-group-addon'>HORA INICIO</label>"; 					
					resp += "<input type='time' id='hora_final' name='hora_final' class='form-control has-feedback' value='"+data[i].hora_final+"'readonly></br>";					
					resp += "<span id='hora_final1' class='glyphicon form-control-feedback glyphicon-ok'></span>";
					resp += "</div>";
  					resp += "</div><br/>";	
					resp += "</td>";
					resp += "</tr>"
					};
					resp += "</table>";
					$('#horarioGrupo').html(resp);
				}
		})//ajax
		.done(function() {
		console.log("success");
		})//done
		.fail(function() {
		console.log("error");
		})//fail
	}//function buscarTodosLosGrupos



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
