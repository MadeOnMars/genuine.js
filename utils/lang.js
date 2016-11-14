var config = require('../local-config')
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

module.exports.firstVisit = firstVisit;
