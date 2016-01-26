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
    		var formulario = "<form class='form-group' action='/updateProfesor' id='formUpdate' name='formUpdate' method='post' enctype='multipart/form-data'>";
    		formulario += "id_profesor: <input type='text' id='id_profesor' name='id_profesor' class='form-control' value='"+result.id_profesor+"'>";
    		formulario += "dni: <input type='text' id='dni' name='dni' class='form-control' value='"+result.dni+"'>";
    		formulario += "Nombre: <input type='text' id='nombre' name='nombre' class='form-control' value='"+result.nombre+"'>";
    		formulario += "Apellidos: <input type='text' id='apellidos' name='apellidos' class='form-control' value='"+result.apellidos+"'>";
    		formulario += "Correo: <input type='text' id='correo' name='correo' class='form-control' value='"+result.correo+"'>";
    		formulario += "Password: <input type='text' id='password' name='password' class='form-control' value='"+result.password+"'>";
    		formulario += "<img id='fotoProfesor' alt='fotoProfesor' src='data:img/png;base64,"+result.foto+"' width='100' height='100'/>";
    		formulario += "Foto: <input type='file' id='foto' name='foto' class='form-control' value=''>";
    		formulario += "Tarj_act: <input type='text' id='tarjeta_activada' name='tarjeta_activada' class='form-control' value='"+result.tarjeta_activada+"'>";
    		formulario += "Numero_Tarjeta: <input type='text' id='num_tarjeta' name='num_tarjeta' class='form-control' value='"+result.num_tarjeta+"'>";
    		formulario += "Admin: <input type='text' id='admin' name='admin' class='form-control' value='"+result.admin+"'>";
    		buscarAsignaturasQueImparte(result.id_profesor);
    		formulario += "Asignaturas: <div id='asignaturasdelProfesor'>";
    		formulario += "</div>";
    		formulario += "<select id='tipo'>";
    		formulario += "<option value='Ambos'>Ambos</option>";
    		formulario += "<option value='FP'>FP</option>";
    		formulario += "<option value='Bachiller'>Bachiller</option>";    		
     		formulario += "</select>";
     		formulario += "</br>";   		
    		buscarTodasLasAsignaturas(result.id_profesor);
    		formulario += "Todas <div id='asignaturasTodas'>";
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



		//Funcion con buscar asignaturas
	function buscarAsignaturasQueImparte (id) {
		$.ajax({
			url: '/buscarAsignaturasQueImparte',
			type: 'post',
			dataType: 'json',
			data:{ id_profesor:id },
			success:function (data) {
				var resp = "";
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
			url: '/buscarTodasLasAsignaturas',
			type: 'post',
			dataType: 'json',
			data:{ id_profesor:id },
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
	
			//Funcion con buscar asignaturas
	function buscarTodasLasAsignaturasDelTipo (id,tipo) {
		$.ajax({
			url: '/buscarTodasLasAsignaturasDelTipo',
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
			url: '/buscarProfesorNombre',
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
					url: '/buscarProfesorId',
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
				url: '/borrarProfesor',
				type: 'post',
				dataType: 'html',
				data: {'id_profesor':$('#resultado #id_profesor').val()},
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

	//cambiar select
	$('#resultado').on("change","#tipo",function(event) {
		 //alert( this.value );
		 if(this.value == "FP"){
		 	//alert("has elegido asignaturas FP");
		 	buscarTodasLasAsignaturasDelTipo($('#resultado #id_profesor').val(),this.value);
		 } else if(this.value == "Bachiller"){
		 	//alert("has elegido asignaturas Bachiller");
		 	buscarTodasLasAsignaturasDelTipo($('#resultado #id_profesor').val(),this.value);
		 } else {
		 	//alert("has elegido todas");
		 	buscarTodasLasAsignaturas($('#resultado #id_profesor').val());
		 }
		});//click borrar formulario alumno

	
});//ready


