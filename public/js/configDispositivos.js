$(document).ready(function() {
	/*
  * Socket.io
  */
  var socket;
  var serverName = window.location.hostname;
  if ((serverName == "localhost") || (serverName == "127.0.0.1")) {
    socket = io();
  } else {
    socket = io('http://controlfid.zubirimanteoweb.com:8000');
  }
  socket = io.connect();

  socket.emit('dispositivos','mensaje dispositivos');

  /*
  * Fin socket.io
  */
});//ready