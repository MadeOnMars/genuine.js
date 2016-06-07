var express = require('express'),
    router = express.Router(),
    i18n = require('i18n-2'),
    acceptLanguage = require('accept-language'),
    config = require('../local-config');

router.use(function(req, res, next) {
  if(req.query.lang){
    if(config.locales.indexOf(req.query.lang) != -1){
        req.session.locale = req.query.lang;
        req.i18n.setLocale(req.query.lang);
    }
  } else if(req.session.locale){
    req.i18n.setLocale(req.session.locale);
  } else {
    // No default langage, we check the accept-language headers
    if(req.headers['accept-language']){
      var preferedLang = acceptLanguage.get(req.headers['accept-language']);
      if(preferedLang){
        req.session.locale = preferedLang;
        req.i18n.setLocale(preferedLang);
      }
    }
  }
  req.lang = req.i18n.getLocale();
  next();
});

module.exports = router;
