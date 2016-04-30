var config = require('../local-config');
var i18n = new (require('i18n-2'))({
    locales: config.locales
});
var data = {};
data.controller = 'pages';

/* GENUINE */
exports.index = function(req, res) {
  i18n.setLocale(req.i18n.getLocale());
  data.action = 'index';
  data.fruit = req.session.fruit || i18n.__('Apple');
  req.session.fruit = i18n.__('Banana');
  res.render('home', {data:data});
}
