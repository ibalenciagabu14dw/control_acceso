$(document).ready(function() {
	
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
			console.log(result);
    		var formulario = "<form class='form-group' id='formUpdate'>id_profesor: <input type='text' id='id_profesor' name='id_profesor' class='form-control' value='"+result[0].id_profesor+"' disabled='disabled'>";
    		formulario += "dni: <input type='text' id='dni' name='dni' class='form-control' value='"+result[0].dni+"'>";
    		formulario += "Nombre: <input type='text' id='nombre' name='nombre' class='form-control' value='"+result[0].nombre+"'>";
    		formulario += "Apellidos: <input type='text' id='apellidos' name='apellidos' class='form-control' value='"+result[0].apellidos+"'>";
    		formulario += "Correo: <input type='text' id='correo' name='correo' class='form-control' value='"+result[0].correo+"'>";
    		formulario += "Password: <input type='text' id='password' name='password' class='form-control' value='"+result[0].password+"'>";
    		formulario += "Foto: <input type='file' id='foto' name='foto' class='form-control' value='"+result[0].nombre+"'>";
    		formulario += "Tarj_act: <input type='text' id='tarjeta_activada' name='tarjeta_activada' class='form-control' value='"+result[0].tarjeta_activada+"'>";
    		formulario += "Numero_Tarjeta: <input type='text' id='num_tarjeta' name='num_tarjeta' class='form-control' value='"+result[0].num_tarjeta+"'>";
    		formulario += "Admin: <input type='text' id='admin' name='admin' class='form-control' value='"+result[0].admin+"'>";
    		//formulario += "Asignaturas: <input type='checkbox' id='nombre' name='nombre' class='form-control' value='"+result.nombre+"'>";
    		formulario += "<br/><input type='submit' id='btnModificar' class='btn btn-warning' value='Modificar'>";
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
	function buscarProfesores () {
		var formData = $('#form').serializeArray();
		$.ajax({
			url: 'buscarProfesorNombre',
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
					url: 'buscarProfesorId',
					type: 'post',
					dataType: 'json',
					data:{ id_profesor:id },
					success:function (data) {
						//console.log(data);
					}
				})//ajax
				.done(function() {
					console.log("success");
				})//done
				.fail(function() {
					console.log("error");
				})//fail
	}//function buscarProfesores

	/*

			//Al clicar en borrar el alumno
	$('#resultado').on("click","#btnBorrar",function(event) {
		event.preventDefault();
		if(confirm("Estas seguro de borrar al alumno?")) {
			$.ajax({
				url: 'php/borrarAlumno.php',
				type: 'post',
				dataType: 'html',
				data: {'id':$('#resultado #id').val()},
				success:function(data){
					if (data == "ok") {
						alert("Alumno borrado correctamente");
						buscarProfesores();
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

	//Al clicar en modificar el Alumno
	$('#resultado').on("click","#btnModificar",function(event) {
		event.preventDefault();
	    if(confirm("Estas seguro de modificar el alumno??")){
	    	var datos = {'id':$('#resultado #id').val(), 'nombre':$('#resultado #nombre').val(), 'imagen':$('#resultado #imagen').val()};
	    	console.log(datos);
	    	$.ajax({
	    		url: 'php/updateAlumno.php',
	    		type: 'post',
	    		dataType: 'html',
	    		data: datos,
	    		success:function(data){
					if (data == "ok") {
						alert("Alumno modificado correctamente");
						buscarProfesores();
					}else{
						alert("Algo no ha ido bien");
					}//if else
				}//success
	    	})//ajax
	    	.done(function() {
				console.log("success modificar");
			})//done
			.fail(function() {
				console.log("error modificar");
			})//fail
	    }
	});//click modificar formulario alumno




	*/
	
});//ready

