var config = require('../local-config');
var pages = require('../data/pages');
var _ = require('lodash');
var i18n = new (require('i18n-2'))({
    locales: config.locales
});
var data = {};

data.controller = 'pages';

/* GENUINE */
exports.index = function(req, res) {
  i18n.setLocale(req.lang);
  data.action = 'index';
  data.fruit = req.session.fruit || i18n.__('Apple');
  req.session.fruit = i18n.__('Banana');
  res.render('home', {data:data});
},
exports.page = function(req, res) {
  i18n.setLocale(req.lang);
  var page = _.find(pages, {slug: req.params.slug});
  if(page === undefined){
    res.status(404).render('404', {data:{}});
    return;
  }
  data.action = page.camel;
  data.title = page.title;
  data.page = page;
  res.render('pages/page', {data:data});
}
