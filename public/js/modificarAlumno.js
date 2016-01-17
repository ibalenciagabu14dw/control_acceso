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
	
});//ready


