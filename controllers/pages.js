var config = require('../local-config');
var pages = require('../data/pages');
var _ = require('lodash');
var i18n = new (require('i18n-2'))({
    locales: config.locales
});

var controller = 'pages';

/* GENUINE */
exports.index = function(req, res) {
  var data = {};
  data.controller = controller;
  i18n.setLocale(req.lang);
  data.title = config.title[req.lang];
  data.description = config.description[req.lang];
  data.action = 'index';
  data.fruit = req.session.fruit || i18n.__('Apple');
  req.session.fruit = i18n.__('Banana');
  data.url = req.url;
  if(req.lang == config.locales[0]){
    data.fullUrl = config.host + req.url;
  } else {
    data.fullUrl = config.host + '/' + req.lang + req.url;
  }
  res.render('home', {data:data});
},
exports.page = function(req, res) {
  var data = {};
  data.controller = controller;
  i18n.setLocale(req.lang);
  var page = _.find(pages, {slug: req.params.slug});
  if(page === undefined){
    res.status(404).render('404', {data:{}});
    return;
  }
  data.action = page.camel;
  if(typeof page.title == 'object'){
    data.title = page.title[req.lang] || page.title[0];
  } else {
    data.title = page.title;
  }
  data.description = page.description || config.description[req.lang];
  data.page = page;
  data.url = req.url;
  if(req.lang == config.locales[0]){
    data.fullUrl = config.host + req.url;
  } else {
    data.fullUrl = config.host + '/' + req.lang + req.url;
  }
  res.render('pages/page', {data:data});
}
