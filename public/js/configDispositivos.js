$(document).ready(function() {

  //creamos el formulario
  crearFormulario();

  //para abrir el dialog del formulario
  $('#anadirDispositivo').click(function(event) {
    $("#divAnadirDispositivo").dialog("open");
  });

  var reglas = {
    numeroDispositivo:{required:true,number:true},
  }
  var mensajes = {
    numeroDispositivo:{required:" Requerido",number:" Solo números"},
  }

  function enviar () {
    event.preventDefault();
    var data = $('#formularioDispositivos').serializeArray();
    console.log(data);
    $.ajax({
      url: '/config/configDispositivos/agregarDispositivo',
      type: 'post',
      dataType: 'json',
      data: data,
      success:function (data) {
        if (data.resp == 'ok') {
          alert("guardado");
        }else{
          alert("no guardado");
        }
      }//success
    })//ajax
    .done(function() {
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    })   
  }//enviar
  
  function crearFormulario () {
    var aulas={};
    //recoger datos aulas sin configurar dispositivo
    $.ajax({
      url: '/config/configDispositivos/dispositivosSinConfigurar',
      type: 'post',
      dataType: 'json',
      success:function (data) {
        aulas = data;
        if (aulas.length != 0) {
          var formularioDispositivos = "<form id='formularioDispositivos' class='form-group'>";
          formularioDispositivos += "<label for='aula'>Selecciona aula: </label>";
          formularioDispositivos += "<select id='aula' name='aula' class='form-control'>";
          for (var i = 0; i < aulas.length; i++) {
            formularioDispositivos += "<option value='"+aulas[i].id_aula+"'>"+aulas[i].numero+" en piso "+aulas[i].piso+"</option>";
          };
          formularioDispositivos += "</select><br/>";
          formularioDispositivos += "<label for='numeroDispositivo'>Número de dispositivo: </label>";
          formularioDispositivos += "<input type='number' id='numeroDispositivo' name='numeroDispositivo' class='form-control'/>";
          formularioDispositivos += "<br/><input type='submit' id='submitDispositivo' class='btn btn-primary' value='Añadir'>";
          formularioDispositivos += "<input type='submit' id='cancelarDispositivo' class='btn btn-primary' value='Cancelar'>";
        }else{
          var formularioDispositivos = "<p class='bg-danger'>No hay aulas sin configurar</p>";
        }
        //lenar el div con el formulario
        $('#divAnadirDispositivo').html(formularioDispositivos);
        //dialog para el formulario
        $( "#divAnadirDispositivo").dialog({
          autoOpen: false,
          modal:true,
          maxWidth:700,
          maxHeight: 500,
          width: 'auto',
          fluid: true,
          autoReposition: true,
          show: {
            effect: "blind",
            duration: 1000
          },
          hide: {
            effect: "explode",
            duration: 1000
          }
        });//dialog
        $('#divAnadirDispositivo #formularioDispositivos').validate({
          rules:reglas,
          messages:mensajes,
          errorPlacement:function (error,element) {
            element.before(error);
          },
          submitHandler:function (form) {
            enviar();
          }
        })//validate
      }//success
    })//ajax
    .done(function() {
      console.log("success");
    })//done
    .fail(function() {
      console.log("error");
    })//fail
  }//crearFormulario

});//ready