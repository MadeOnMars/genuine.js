var express = require('express'),
    session = require('express-session'),
    compression = require('compression'),
    config = require('./local-config'),
    pkg = require ('./package.json'),
    engine = require('ejs-mate'),
    _ = require('lodash'),
    i18n = require('i18n-2'),
    acceptLanguage = require('accept-language'),
    socket = require('./socket'),
    app     = express(),
    io = require('socket.io').listen(app.listen(config.port, function(){
      console.log('Genuine.js ' + pkg.version + ' is now on http://localhost:' + config.port);
    }));

socket.listen(io);
acceptLanguage.languages(config.locales);
i18n.expressBind(app, {locales: config.locales});

app.locals.locals = require('./utils/locals');
app.engine('ejs', engine);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
if(config.env == 'prod'){
  app.use(compression());
}
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: config.secret, resave: true, saveUninitialized: true }));
app.use(require('./utils/lang'));
app.use(function(req,res,next){req.io = io;app.locals.lang = req.lang;next();});
app.use(require('./routes'));
