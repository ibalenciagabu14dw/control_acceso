$(document).ready(function() {
  //recoger el correo del profesor en variable (desde html hidden)
  var correo = $('#correo').html();

/*
* Horario profesor ********************************************
*/
  //llenar la tabla del horario desde horarioProfesor
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
  
//dialog de horario
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
//al clicar en el boton horario abrir el dialog
	$('#botonHorarioProfesor').click(function() {
		$( "#horario" ).dialog( "open" );
    });

  /*
  * fin horario profesor ********************************************
  */

  /*
  * Hover fotos alumnos
  */
  $('.celdaAlumno').hover(function() {
    $(this).css('box-shadow', '0px 0px 25px black');
  }, function() {
    $(this).css('box-shadow', '5px 5px 10px black');
  });


  /*
  * Socket.io
  */
  var socket;
  var serverName = window.location.hostname;
  if ((serverName == "localhost") || (serverName == "127.0.0.1")) {
    socket = io();
  } else {
    socket = io('ws://'+serverName+':8000');
  }
  socket = io.connect("/");

  $('td').click(function(event) {
    var id = $(this).attr('id');
    socket.emit('cambiaCliente',id);
  });

  socket.on('cambiaServidor', function(msg){
    if($('#'+msg).hasClass('presencia1')){
      $('#'+msg).removeClass('presencia1');
      $('#'+msg).addClass('presencia0');
    }else{
      $('#'+msg).removeClass('presencia0');
      $('#'+msg).addClass('presencia1');
    }
  });
  
  
});//ready
