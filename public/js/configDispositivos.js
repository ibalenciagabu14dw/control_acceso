$(document).ready(function() {

  /*
  * Modal con formulario para añadir dispositivo
  */
  //recuperar datos aulas sin configurar dispositivo
  $.ajax({
    url: '/config/configDispositivos/dispositivosSinConfigurar',
    type: 'default GET (Other values: POST)',
    dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
    data: {param1: 'value1'},
  })
  .done(function() {
    console.log("success");
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
  
  //Formulario
  var formulario = "<form id='formAnadirDispositivo' class='form-group'>";
  formulario += 
});//ready