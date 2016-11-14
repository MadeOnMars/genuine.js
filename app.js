var express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    config = require('./local-config'),
    pkg = require ('./package.json'),
    engine = require('ejs-mate'),
    _ = require('lodash'),
    i18n = require('i18n-2'),
    acceptLanguage = require('accept-language'),
    socket = require('./socket'),
    app     = express(),
    router = {
      pages: require('./routes/pages'),
      routes: require('./routes/routes'),
      errors: require('./routes/errors'),
      redirect: require('./routes/301')
    };
    lang = require('./utils/lang'),
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
  app.set('view cache', true);
  app.set('x-powered-by', false);
  app.use(compression());
}
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: true, saveUninitialized: true }));
app.use(function(req,res,next){req.io = io;next();});

app.use(router.redirect);

app.use(lang.firstVisit);

for(var i=1;i<config.locales.length;i++){
  app.use('/'+config.locales[i], router.routes);
  app.use('/'+config.locales[i], router.pages);
}
app.use(router.routes);
app.use(router.pages);

for(var i=1;i<config.locales.length;i++){
  app.use('/'+config.locales[i], router.errors);
}

app.use(router.errors);
