const config = require('../local-config');

const redirect = (path, req, res) => {
  if (req.lang === config.locales[0]) {
    return res.redirect(path);
  }
  return res.redirect(`/${req.lang}${path}`);
}
module.exports = redirect;
