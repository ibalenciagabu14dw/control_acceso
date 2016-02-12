$(document).ready(function() {
	
     $.validator.addMethod("valueNotEquals", function(value, element, arg){
      return arg != value;
     }, "Value must not equal arg.");

	//reglas
	var reglas = {
		dia:{required:true,valueNotEquals: 'default' },
        hora_inicio:{required:true},
		hora_final:{required:true},
		grupo:{required:true,valueNotEquals: 'default' },
        asignatura:{required:true,valueNotEquals: 'default' },
        aula:{required:true,valueNotEquals: 'default' },
	};
	//mensajes
	var mensajes = {
		dia:{required:"",valueNotEquals: "" },
        hora_inicio:{required:""},
		hora_final:{required:""},
		grupo:{required:"",valueNotEquals: "" },
        asignatura:{required:"",valueNotEquals: "" },
        aula:{required:"",valueNotEquals: "" },
	};

	//Buscar alumnos al escribir
	$('#nombre').keyup(function(event) {
		buscarHorarioGrupos();
	});

	//Buscar alumnos al clicar Buscar
	$('#form').submit(function(event) {
		event.preventDefault();
		buscarHorarioGrupos();
	});

	//Crear formulario para modificar o borrar alumno al clicar en la celda
	$('#resultado').on("click",".celda",function () {
		var datos = $(this).contents();
		buscarHorarioGrupoId(datos[0].id)
		.done(function(result) {
    		var formulario = "<form class='form-group' action='/updateHorarioGrupo' id='formUpdate' name='formUpdate' method='post'>";
    		formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='id_horario_grupo' class='input-group-addon'>ID HORARIO GRUPO</label>";   		
    		formulario += "<input type='text' id='id_horario_grupo' name='id_horario_grupo' class='form-control' value='"+result[0].id_horario_grupo+"'readonly>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
			formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label id='labelDiaHorarioGrupo' for='dia' class='input-group-addon'>DIA</label>";    		
    		formulario += "<select id='selectDiaHorarioGrupo' name='dia' class='form-control'>";
    		formulario += "<option value='default'>Elige el dia</option>";
				if (result[0].dia_semana == 'Lunes'){
                    formulario += "<option value='Lunes' selected>Lunes</option>";   
                } else {
                    formulario += "<option value='Lunes'>Lunes</option>";   
                            }
                if (result[0].dia_semana == 'Martes'){
                	formulario += "<option value='Martes' selected>Martes</option>";   
                } else {
                    formulario += "<option value='Martes'>Martes</option>";   
                }
                if (result[0].dia_semana == 'Miercoles'){
                    formulario += "<option value='Miercoles' selected>Miercoles</option>";   
                } else {
                    formulario += "<option value='Miercoles'>Miercoles</option>";   
                }
                if (result[0].dia_semana == 'Jueves'){
                    formulario += "<option value='Jueves' selected>Jueves</option>";   
                } else {
                    formulario += "<option value='Jueves'>Jueves</option>";   
                }
                if (result[0].dia_semana == 'Viernes'){
                    formulario += "<option value='Viernes' selected>Viernes</option>";   
                } else {
                    formulario += "<option value='Viernes'>Viernes</option>";   
                }
            formulario += "</select><span id='selectDiaHorarioGrupo1' class='glyphicon form-control-feedback'></span>";
            formulario += "</div>";
  			formulario += "</div><br/>";
			formulario += "<div class='form-inline' id='alertHoraInicio'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label id='labelHoraInicio' for='hora_inicio' class='input-group-addon'>HORA INICIO</label>"; 
            formulario += "<input id='hora_inicio' type='time' name='hora_inicio' class='form-control has-feedback' value='"+result[0].hora_inicio+"'/></br>";
       		formulario += "<span id='hora_inicio1' class='glyphicon form-control-feedback'></span>";
            formulario += "</div>";
  			formulario += "</div><br/>";            
            formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label id='labelHoraFinal' for='hora_final' class='input-group-addon'>HORA FINAL</label>"; 
            formulario += "<input id='hora_final' type='time' name='hora_final' class='form-control has-feedback' value='"+result[0].hora_final+"'/></br>";
    		formulario += "<span id='hora_final1' class='glyphicon form-control-feedback'></span>";            
            formulario += "</div>";
  			formulario += "</div><br/>";			
			mostrarTodosLosGruposIdNombre(result[0].id_grupo);
			formulario += "<div id='grupos'>";
    		formulario += "</div></br>";
			buscarTodasLasAsignaturas(result[0].id_asignatura);
			formulario += "<div id='asignaturas'>";
    		formulario += "</div></br>";            
			mostrarTodasLasAulasIdNumero(result[0].id_aula);
			formulario += "<div id='aulas'>";
    		formulario += "</div>"; 
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

		function mostrarTodasLasAulasIdNumero (id_aula) {
			var result = id_aula;
		$.ajax({
			url: '/configAula/mostrarTodosLasAulasIdNumero',
			type: 'post',
			dataType: 'json',
			success:function (data) {
				var resp = "";
				resp += "<div class='form-inline'>";
    			resp += "<div class='input-group'>";
				resp += "<label id='labelHorarioGrupoAula' for='aula' class='input-group-addon'>AULA</label>";
				resp += "<select id='selectHorarioGrupoAula' name='aula' class='form-control'>";
    			resp += "<option value='default'>Elige el aula</option>";
				for (var i = 0; i < data.length; i++) {
					if (data[i].id_aula == result){
						resp += "<option value="+data[i].id_aula+" selected>"+data[i].numero+"</option>";
					} else {
						resp += "<option value="+data[i].id_aula+">"+data[i].numero+"</option>";
					}
				};
				resp += "</select><span id='selectHorarioGrupoAula1' class='glyphicon form-control-feedback'></span>";
				resp += "</div>";
  				resp += "</div>";
				$('#aulas').html(resp);
			}
		})//ajax
		.done(function() {
			console.log("success");
		})//done
		.fail(function() {
			console.log("error");
		})//fail
	}//function buscarAsignaturas

		function buscarTodasLasAsignaturas (id_asignatura) {//FALTA EL POST
			var result = id_asignatura;
		$.ajax({
			url: '/configAsignatura/buscarTodasLasAsignaturas',
			type: 'post',
			dataType: 'json',
			success:function (data) {
				var resp = "";
				resp += "<div class='form-inline'>";
    			resp += "<div class='input-group'>";
				resp += "<label id='labelHorarioGrupoAsignatura' for='asignatura' class='input-group-addon'>ASIGNATURA</label>";
				resp += "<select id='selectHorarioGrupoAsignatura' name='asignatura' class='form-control'>";
    			resp += "<option value='default'>Elige la asignatura</option>";
				for (var i = 0; i < data.length; i++) {
					if (data[i].id_asignatura == result){
						resp += "<option value="+data[i].id_asignatura+" selected>"+data[i].nombre+"</option>";
					} else {
						resp += "<option value="+data[i].id_asignatura+">"+data[i].nombre+"</option>";
					}
				};
				resp += "</select><span id='selectHorarioGrupoAsignatura1' class='glyphicon form-control-feedback'></span>";
				resp += "</div>";
  				resp += "</div>";
				$('#asignaturas').html(resp);
			}
		})//ajax
		.done(function() {
			console.log("success");
		})//done
		.fail(function() {
			console.log("error");
		})//fail
	}//function buscarAsignaturas
	
		function mostrarTodosLosGruposIdNombre (id_grupo) {
			var result = id_grupo;
		$.ajax({
			url: '/configGrupo/mostrarTodosLosGruposIdNombre',
			type: 'post',
			dataType: 'json',
			success:function (data) {
				var resp = "";
				resp += "<div class='form-inline'>";
    			resp += "<div class='input-group'>";
				resp += "<label id='labelHorarioGrupoGrupo' for='grupo' class='input-group-addon'>GRUPO</label>";
				resp += "<select id='selectHorarioGrupoGrupo' name='grupo' class='form-control'>";
    			resp += "<option value='default'>Elige el grupo</option>";
				for (var i = 0; i < data.length; i++) {
					if (data[i].id_grupo == result){
						resp += "<option value="+data[i].id_grupo+" selected>"+data[i].nombre_grupo+"</option>";
					} else {
						resp += "<option value="+data[i].id_grupo+">"+data[i].nombre_grupo+"</option>";
					}
				};
				resp += "</select><span id='selectHorarioGrupoGrupo1' class='glyphicon form-control-feedback'></span>";
				resp += "</div>";
  				resp += "</div>";
				$('#grupos').html(resp);
			}
		})//ajax
		.done(function() {
			console.log("success");
		})//done
		.fail(function() {
			console.log("error");
		})//fail
	}//function buscarAsignaturas

	
	
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
	            if ($('#resultado #hora_inicio').val() >$('#resultado #hora_final').val()){
                 showAlertValidate("#alertHoraInicio"," hora_inicio < hora_final ");
            	} else {	
	            event.preventDefault();
	            var data = $("#formUpdate").serializeArray();
	            console.log(data);
	            $.ajax({
	                url: '/configHorarioGrupo/updateHorarioGrupo',
	                type: 'post',
	                dataType: 'json',
	                data: data,
	                success: function (data) {
	                }
	            })
	            .done(function(data) {
	                console.log(data)
		                if (data.err=="existe"){
		                showAlert($('#resultado #enlace2'),"error","HorarioGrupo ya existente");
		                }else if (data.dato=="ok"){
		                showAlertRedirect($('#resultado #enlace2'),"ok","HorarioGrupo modificado correctamente",'/config');
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
	  //$( "#target" ).submit();
	});

	//Funcion con ajax para recoger datos alumnos y crear tabla
	function buscarHorarioGrupos () {
		var formData = $('#form').serializeArray();
		$.ajax({
			url: '/configHorarioGrupo/buscarHorarioGrupoNombre',
			type: 'post',
			dataType: 'json',
			data: formData,
			success:function (data) {
				var resp = "";
				for (var i = 0; i < data.length; i++) {
					resp += "<table class='table'><tr><td class='celda'>";
					resp += "<h3 id='"+data[i].id_horario_grupo+"'>"+data[i].dia_semana+" "+data[i].hora_inicio+" "+data[i].hora_final+"</h3>";
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
	}//function buscarHorarioGrupos

	//funcion para buscar alumnos por id
	function buscarHorarioGrupoId (id) { 
		return	$.ajax({
					url: '/configHorarioGrupo/buscarHorarioGrupoPorId',
					type: 'post',
					dataType: 'json',
					data:{ id_horario_grupo:id },
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
		console.log($('#resultado #id_horario_grupo').val());
		if(confirm("Estas seguro de borrar el horario del grupo?")) {
			$.ajax({
				url: '/configHorarioGrupo/borrarHorarioGrupo',
				type: 'post',
				dataType: 'html',
				data: {'id_horario_grupo':$('#resultado #id_horario_grupo').val()},
				success:function(data){
				}//success
			})//ajax
			.done(function(data) {
				console.log("success borrar");
				if (data[9]=="o"){
					showAlertRedirect("#enlace2","ok"," Horario Grupo borrado correctamente",'/config');
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
        $('#mensaje').attr('class','alert alert-success fade in');
    }
    $('#mensaje span').html(texto);
    $('#mensaje').insertAfter(lugar);
    $('#mensaje').fadeTo(2000, 500).slideUp(1000, function(){
      window.location.replace(url);
                });

    }