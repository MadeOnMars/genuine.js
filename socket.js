const listen = (io) => {
  io.on('connection', (socket) => {
    socket.emit('message', {
      status: 'OK',
      msg: 'Hello World'
    });
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
