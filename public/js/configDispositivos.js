$(document).ready(function() {

  //creamos el formulario
  crearFormulario();


  //para abrir el dialog del formulario
  $('#anadirDispositivo').click(function(event) {
    $("#divAnadirDispositivo").dialog("open");
  });


  //cerrar el dialog dispositivos
  $('#cancelarDispositivo').click(function(event) {
    event.preventDefault();
    $("#divAnadirDispositivo").dialog("close");
    crearFormulario();
  });


  //para borrar el dispositivo
  $('td button').click(function(event) {
    borrarDispositivo($(this).val(),function (res) {
      console.log(res);
      if (res == 1) {
        location.reload();
      }else{
        alert("error");
      }
    });//borrarDispositivo
  });//$('td button').click


  //funcion para borrar dispositivo
  function borrarDispositivo (id_dispositivo,callback) {
    $.ajax({
      url: '/config/configDispositivos/borrarDispositivo',
      type: 'post',
      dataType: 'json',
      data: {id:id_dispositivo},
      success: function (data) {
        if (data.result == 'ok') {
          callback(1);
        }else{
          callback(0);
        }
      }//success
    })
    .done(function() {
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    })
  }//borrarDispositivo


  //función para enviar los datos
  function enviar () {
    event.preventDefault();
    var data = $('#formularioDispositivos').serializeArray();
    console.log(data);
    $.ajax({
      url: '/config/configDispositivos/agregarDispositivo',
      type: 'post',
      dataType: 'json',
      data: data,
    })//ajax
    .done(function() {
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    })   
  }//enviar

  
  //funcion para crear el formulario, el modal y el validate
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
          formularioDispositivos += "<div id='error' class='alert alert-danger fade in' style='display:none'><strong>Error</strong> El número de dispositivo existe</div>"
          formularioDispositivos += "<label for='aula'>Selecciona aula: </label>";
          formularioDispositivos += "<select id='aula' name='aula' class='form-control'>";
          for (var i = 0; i < aulas.length; i++) {
            formularioDispositivos += "<option value='"+aulas[i].id_aula+"'>"+aulas[i].numero+" en piso "+aulas[i].piso+"</option>";
          };
          formularioDispositivos += "</select><br/>";
          formularioDispositivos += "<label for='numeroDispositivo'>Número de dispositivo: </label>";
          formularioDispositivos += "<input type='number' id='numeroDispositivo' name='numeroDispositivo' class='form-control'/>";
          formularioDispositivos += "<br/><input type='submit' id='submitDispositivo' class='btn btn-primary' value='Añadir'>";
          formularioDispositivos += "</form>";
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
          },
          close: function (event,ui) {
            crearFormulario();
          }//close
        });//dialog

        //Validate reglas y mensajes
        var reglas = {
          numeroDispositivo:{required:true,number:true},
        }
        var mensajes = {
          numeroDispositivo:{required:" Requerido",number:" Solo números"},
        }
        //validate function
        $('#divAnadirDispositivo #formularioDispositivos').validate({
          rules:reglas,
          messages:mensajes,
          errorPlacement:function (error,element) {
            element.before(error);
          },
          submitHandler:function (form) {
            comprobarIdDispositivo($('#formularioDispositivos #numeroDispositivo').val(),function (respuesta) {
              if(respuesta == 1){
                enviar();
                $("#divAnadirDispositivo").dialog("close");
                crearFormulario();
                location.reload();
              }else{
                $('#error').fadeTo(2000, 500).slideUp(1000, function(){});
              }//if comprobarIdDispositivo
            })//comprobarIdDispositivo
          }//submitHandler
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


  //funcion para comprobar si el número de dispositivo existe
  function comprobarIdDispositivo (id_dispositivo,callback) {
    $.ajax({
      url: '/config/configDispositivos/comprobarIdDispositivo',
      type: 'post',
      dataType: 'json',
      data: {id:id_dispositivo},
      success: function (data) {
        if (data.result == 'ok') {
          callback(1);
        }else{
          callback(0);
        }
      }//success
    })
    .done(function() {
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    })
  }//comprobarIdDispositivo


});//ready