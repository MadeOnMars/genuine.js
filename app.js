const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const compression = require('compression');
const config = require('./local-config');
const pkg = require ('./package.json');
const engine = require('ejs-mate');
const i18n = require('i18n-2');
const acceptLanguage = require('accept-language');
const socket = require('./socket');
const app = express();
const router = require('./routes');
const lang = require('./utils/lang');
const http = require('http').Server(app);
const io = require('socket.io').listen(http);

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
app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: true
  })
);
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(router.redirect);

app.use(lang.firstVisit);
app.use(lang.setLang);

for(let i = 1; i < config.locales.length; i++) {
  app.use('/' + config.locales[i], router.routes);
  app.use('/' + config.locales[i], router.pages);
}
app.use(router.routes);
app.use(router.pages);

for(let i = 1; i < config.locales.length; i++) {
  app.use('/' + config.locales[i], router.errors);
}

app.use(router.errors);

http.listen(config.port, () => {
  console.log(`Genuine.js ${pkg.version} on http://localhost:${config.port}`);
});
