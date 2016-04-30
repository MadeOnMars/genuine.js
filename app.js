var express = require('express'),
    config = require('./local-config'),
    engine = require('ejs-mate'),
    _ = require('lodash'),
    socket = require('./socket'),
    app     = express(),
    io = require('socket.io').listen(app.listen(config.port, function(){
      console.log('Genuine.js is now on http://localhost:' + config.port);
    }));

socket.listen(io);
app.engine('ejs', engine);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(function(req,res,next){
  req.io = io;
  next();
});
app.use(require('./routes'));
