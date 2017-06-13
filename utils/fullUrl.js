const config = require('../local-config');

const fullUrl = (req) => {
  if (req.lang === config.locales[0]) {
    return `${config.host}${req.url}`;
  }
  return `${config.host}/${req.lang}${req.url}`;
}

module.exports = fullUrl;
