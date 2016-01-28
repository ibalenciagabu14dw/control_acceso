$(document).ready(function() {
    $( "div" ).click(function() {
      //alert($(this).attr("id"));
      event.preventDefault();
			$.ajax({
				url: '/buscarProfesorPorIdAulaEnUnaHora',
				type: 'post',
				dataType: 'html',
				data: {'id_aula':$(this).attr("id")},
				success:function(data){
				}//success
			})//ajax
			.done(function(data) {
				console.log(data);
				console.log("success");
			})//done
			.fail(function() {
				console.log("error");
			})//fail
	});//$( "div" ).click(function()
});//ready

//profesor.buscarProfesorPorIdAulaEnUnaHora metodo


