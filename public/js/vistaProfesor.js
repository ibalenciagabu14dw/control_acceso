$(document).ready(function() {
  var correo = $('#correo').html();
  $.ajax({
    url: 'vistaProfesor/horarioProfesor',
    type: 'get',
    dataType: 'json',
    data: {correo: correo},
    success:function (data) {
      var resp = "";
      for (var i = 0; i < data.length; i++) {
        resp+= data[i].dia_semana;
      };
      $('#horario').html(resp);
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
      maxWidth:600,
      maxHeight: 500,
      width: 600,
      height: 500,
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
});
