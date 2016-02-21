$(document).ready(function() {
	/*
	*	Animación de paginación
	*/
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'jswing', function () {
	        window.location.hash = target;
	    });
	});
	/*
	*	FIN Animación de paginación
	*/
	
});