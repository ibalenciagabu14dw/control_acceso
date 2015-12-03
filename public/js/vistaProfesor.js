$(document).ready(function() {
	$( "#horario").dialog({
      autoOpen: false,
      modal:true,
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
