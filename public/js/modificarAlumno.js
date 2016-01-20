$(document).ready(function() {
	
	//Buscar alumnos al escribir
	$('#nombre').keyup(function(event) {
		buscarAlumnos();
	});

	//Buscar alumnos al clicar Buscar
	$('#form').submit(function(event) {
		event.preventDefault();
		buscarAlumnos();
	});
	//Crear formulario para modificar o borrar alumno al clicar en la celda
	$('#resultado').on("click",".celda",function () {
		var datos = $(this).contents();
		buscarAlumnoPorId(datos[0].id)
		.done(function(result) {
    		var formulario = "<form class='form-group' action='/updateAlumno' id='formUpdate' name='formUpdate' method='post' enctype='multipart/form-data'>";
    		formulario += "id_alumno: <input type='text' id='id_alumno' name='id_alumno' class='form-control' value='"+result.id_alumno+"'>";
    		formulario += "dni: <input type='text' id='dni' name='dni' class='form-control' value='"+result.dni+"'>";
    		formulario += "Nombre: <input type='text' id='nombre' name='nombre' class='form-control' value='"+result.nombre+"'>";
    		formulario += "Apellidos: <input type='text' id='apellidos' name='apellidos' class='form-control' value='"+result.apellidos+"'>";
    		formulario += "Correo: <input type='text' id='correo' name='correo' class='form-control' value='"+result.correo+"'>";
    		formulario += "<img id='fotoProfesor' alt='fotoProfesor' src='data:img/png;base64,"+result.foto+"' width='100' height='100'/>";
    		formulario += "Foto: <input type='file' id='foto' name='foto' class='form-control' value=''>";
    		formulario += "Tarj_act: <input type='text' id='tarjeta_activada' name='tarjeta_activada' class='form-control' value='"+result.tarjeta_activada+"'>";
    		formulario += "Numero_Tarjeta: <input type='text' id='num_tarjeta' name='num_tarjeta' class='form-control' value='"+result.num_tarjeta+"'>";
			buscarGruposDelAlumno(result.id_alumno);
    		formulario += "Grupos: <div id='gruposdelAlumno'>";
    		formulario += "</div>";
    		buscarTodosLosGrupos(result.id_alumno);
    		formulario += "Grupos: <div id='gruposTodos'>";
    		formulario += "</div>";
    		formulario += "Asignaturas,selecciona la que quieres convalidar: <div id='AsignaturaGrupo'>";
    		formulario += "</div>";
			formulario += "<input type='submit' id='btnModificar' class='btn btn-warning' value='Modificar'>";
    		formulario += "&nbsp;<button id='btnBorrar' class='btn btn-danger'>Borrar</button>";
    		formulario += "&nbsp;<button id='btnVolver' class='btn btn-primary'>Volver</button>";
    		formulario += "</form>";
    		$('#resultado').html(formulario);
		})
		.fail(function() {
    		console.log("error crear formulario");
		});
	});//Formulario modificar y borrar

	
	//Funcion con ajax para recoger datos alumnos y crear tabla
	function buscarAlumnos () {
		var formData = $('#form').serializeArray();
		$.ajax({
			url: '/buscarAlumnoNombre',
			type: 'post',
			dataType: 'json',
			data: formData,
			success:function (data) {
				var resp = "";
				for (var i = 0; i < data.length; i++) {
					resp += "<table class='table'><tr><td class='celda'>";
					resp += "<h3 id='"+data[i].id_alumno+"'>"+data[i].id_alumno+" "+data[i].nombre+"</h3>";
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
	}//function buscarAlumnos

	//funcion para buscar alumnos por id
	function buscarAlumnoPorId (id) { 
		return	$.ajax({
					url: '/buscarAlumnoId',
					type: 'post',
					dataType: 'json',
					data:{ id_alumno:id },
					success:function (data) {
					}
				})//ajax
				.done(function() {
					console.log("success");
				})//done
				.fail(function() {
					console.log("error");
				})//fail
	}//function buscarAlumnoId

			//Al clicar en borrar el alumno
	$('#resultado').on("click","#btnBorrar",function(event) {
		event.preventDefault();
		if(confirm("Estas seguro de borrar al alumno?")) {
			$.ajax({
				url: '/borrarAlumno',
				type: 'post',
				dataType: 'html',
				data: {'id_alumno':$('#resultado #id_alumno').val()},
				success:function(data){
					if (data == "ok") {
						alert("Alumno borrado correctamente");
						buscarAlumnos();
					}else{
						alert("Algo no ha ido bien");
					}//if else
				}//success
			})//ajax
			.done(function() {
				console.log("success borrar");
			})//done
			.fail(function() {
				console.log("error borrar");
			})//fail
		}//if confirm
	});//click borrar formulario alumno

	//funcion para buscar las asignaturas de un grupo
	$('#resultado').on("change","#gruposdelAlumno" || "#gruposTodos",function () {
		$(":checkbox").click(function(){
	        var id = $(this).attr('id'); 
			console.log(id);
			$.ajax({
					url: '/buscarAsignaturasDelGrupo',
					type: 'post',
					dataType: 'json',
					data:{ id_grupo: id},
					success:function (data) {
						var resp = "";
						resp += "<table id='asignaturas'>";
						for (var i = 0; i < data.length; i++) {
							resp += "<tr>";
							resp += "<td>";
							resp += "<input type='checkbox' id='"+data[i].id_asignatura+"' name='asignatura' value='"+data[i].id_asignatura+"'>";
							resp += "<label for='"+data[i].id_asignatura+"'>"+data[i].nombre+"</label>";
							resp += "</td>";
							resp += "</tr>"
						};
						resp += "</table>";
						$('#AsignaturaGrupo').html(resp);
					}
				})//ajax
				.done(function() {
					console.log("success");
				})//done
				.fail(function() {
					console.log("error");
				})//fail
			});
	});

	//funcion para buscar todos los grupos
	function buscarGruposDelAlumno (id) {
		return	$.ajax({
					url: '/buscarGruposdelAlumno',
					type: 'post',
					dataType: 'json',
					data:{ id_alumno:id },
					success:function (data) {
						var resp = "";
						resp += "<table id='gruposdelAlumno'>";
						for (var i = 0; i < data.length; i++) {
							resp += "<tr>";
							resp += "<td>";
							resp += "<input type='checkbox' id='"+data[i].id_grupo+"' name='grupo' value='"+data[i].id_grupo+"' checked>";
							resp += "<label for='"+data[i].id_grupo+"'>"+data[i].nombre_grupo+"</label>";
							resp += "</td>";
							resp += "</tr>"
						};
						resp += "</table>";
						$('#gruposdelAlumno').html(resp);
					}
				})//ajax
				.done(function() {
					console.log("success");
				})//done
				.fail(function() {
					console.log("error");
				})//fail
	}//function buscarTodosLosGrupos

		//funcion para buscar todos los grupos
	function buscarTodosLosGrupos (id) {
		return	$.ajax({
					url: '/buscarTodosLosGrupos',
					type: 'post',
					dataType: 'json',
					data:{ id_alumno:id },
					success:function (data) {
						var resp = "";
						resp += "<table id='gruposTodos'>";
						for (var i = 0; i < data.length; i++) {
							resp += "<tr>";
							resp += "<td>";
							resp += "<input type='checkbox' id='"+data[i].id_grupo+"' name='grupo' value='"+data[i].id_grupo+"'>";
							resp += "<label for='"+data[i].id_grupo+"'>"+data[i].nombre_grupo+"</label>";
							resp += "</td>";
							resp += "</tr>"
						};
						resp += "</table>";
						$('#gruposTodos').html(resp);
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


