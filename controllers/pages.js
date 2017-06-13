const config = require('../local-config');
const pages = require('../data/pages');
const fullUrl = require('../utils/fullUrl');
const redirect = require('../utils/redirect');
const _ = require('lodash');

/* GENUINE */
exports.index = (req, res) => {
  const data = {
    controller: 'pages',
    action: 'index',
    description: config.description,
    title: config.title,
    url: req.url,
    fullUrl: fullUrl(req)
  };

  data.fruit = req.session.fruit || req.i18n.__('Apple');
  req.session.fruit = req.i18n.__('Banana');

  res.render('home', {data: data});
}

exports.page = (req, res) => {
  const page = _.find(pages, {slug: req.params.slug});
  if(page === undefined){
    res.status(404).render('404', {data: {}});
    return;
  }
  const data = {
    controller: 'pages',
    action: page.camel,
    description: page.description || config.description,
    title: page.title || config.title,
    url: req.url,
    fullUrl: fullUrl(req),
    page: page
  };

  res.render('pages/page', {data: data});
}
