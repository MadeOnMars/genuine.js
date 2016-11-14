var config = require('../local-config'),
    locals = require('../utils/locals'),
    acceptLanguage = require('accept-language');

/*
** firstVisit will redirect the user the correct i18n the acceptLanguage
** is different than the default language
*/
var firstVisit = function(req, res, next){
  if(!req.session.prefLang && req.headers['accept-language']){
    var preferedLang = acceptLanguage.get(req.headers['accept-language']);
    if(preferedLang && config.locales.indexOf(preferedLang) != -1){
      req.session.prefLang = preferedLang;
      if(preferedLang != config.locales[0] && req.url.length < 4){
        res.redirect('/'+preferedLang);
        return;
      }
    }
  }
  next();
}

/*
** setLang parsed the url to return the current language
*/
var setLang = function(req, res, next){
  var lang = config.locales[0];
  var parsedUrl = req.url.split('/');
  for(var i=0;i<config.locales.length;i++){
    if(parsedUrl.indexOf(config.locales[i]) != -1){
      lang = config.locales[i];
      break;
    }
  }
  req.i18n.setLocale(lang);
  req.lang = lang;
  locals.lang = lang;

  next();
}

module.exports.firstVisit = firstVisit;
module.exports.setLang = setLang;
