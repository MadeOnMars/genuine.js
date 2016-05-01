var listen = function(io){
  io.on('connection', function(socket){
    // Example
    /*
    socket.on('status', function(data){
      if(data.status == 'ok'){
        socket.emit('status_ok');
      } else {
        socket.emit('status_err');
      }
    });
    */
  });
}

module.exports.listen = listen;
