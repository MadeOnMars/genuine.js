var express = require('express'),
    engine = require('ejs-mate'),
    app     = express(),
    fs      = require('fs');


var app_name = "";
try {
  stats = fs.lstatSync('./genuine.json');
  var genuine = require('./genuine.json');
  app_name = genuine.app_name;
}
catch (e) {
  app_name = "dev";
}

app.engine('ejs', engine);
app.set('port', process.env["NODE_ENV_"+app_name+"_port"] || 3000);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(require('./routes'));

app.listen(app.get('port'), function() {
  console.log('Genuine.js is now on http://localhost:'+app.get('port'));
});
