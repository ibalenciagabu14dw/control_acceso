$(document).ready(function() {
	//regla correo
	jQuery.validator.addMethod("correo", function(value, element) {
		return this.optional(element) || /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i.test(value);
	});
	var reglas = {
		user:{required:true,correo:true},
		pass:{required:true}
	}
	var mensajes = {
		user:{required:" Requerido",correo:" Correo no válido"},
		pass:{required:" Requerido"}
	}

	$('#loginForm').validate({
		rules:reglas,
		messages:mensajes,
	})
	/*if($('#info').html()!=undefined){
		$('#footer').css('bottom', 'auto');
	}*/
	  //control footer
  	function controlFooter(){ 
	    /*el alto que tiene el navegador*/
	    $alto_navegador= $(window).height();
	    /*el alto que tiene el contenido de la pagina*/
	    $alto_documento= $(document).height(); 
	    /*  aqui condicionamos si el alto del contenido 
	     *  es mayor que
	     *  el alto del navegador*/
	    if ($alto_documento>$alto_navegador){
	        $("#footer").css({"bottom":"auto"})
	    }else if($alto_documento>=$alto_navegador){
	        $("#footer").css({"bottom":"0px"})
	    } 
 	}//controlFooter

	/***redirect a landing page***/
	$('#titulo').click(function(event) {
		window.location.replace("/");
	});
});//ready