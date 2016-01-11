$(document).ready(function() {
  var correo = $('#correo').html();
  $.ajax({
    url: 'vistaProfesor/horarioProfesor',
    type: 'get',
    dataType: 'json',
    data: {correo: correo},
    success:function (data) {
      var cont = 1;
      var resp = "<table id='tablaHorario' class='table table-hover tablesorter'><thead><tr><th>Día</th><th>Inicio</th><th>Fin</th><th>Aula</th><th>Asignatura</th><th>Grupo</th></tr></thead><tbody>";
      for (var i = 0; i < data.length; i++) {
        if (cont%2 == 0) {
          resp += "<tr>";
        }else{
          resp += "<tr class='success'>";
        }
        resp += "<td>"+data[i].dia_semana+"</td>";
        resp += "<td>"+data[i].hora_inicio+"</td>";
        resp += "<td>"+data[i].hora_final+"</td>";
        resp += "<td>"+data[i].numero+"</td>";
        resp += "<td>"+data[i].nombre+"</td>";
        resp += "<td>"+data[i].nombre_grupo+"</td>";
        resp += "</tr>";
        cont++;
      };
      resp += "</tbody>";
      $('#horario').html(resp);
      $('#horario #tablaHorario').tablesorter();
    }
  })
  .done(function() {
    console.log("success");
  })
  .fail(function() {
    console.log("error");
  })
  

	$( "#horario").dialog({
      autoOpen: false,
      modal:true,
      maxWidth:700,
      maxHeight: 700,
      width: 700,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      }
    });

	$('#botonHorarioProfesor').click(function() {
		$( "#horario" ).dialog( "open" );
    });

  
});//ready
