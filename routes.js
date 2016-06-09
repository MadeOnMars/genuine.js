var express = require('express'),
    sitemap = require('./utils/sitemap'),
    config = require('./local-config'),
    router = express.Router(),
/* GENUINE INCLUDE */
    pages = require('./controllers/pages');

router.get('/', pages.index);
/* GENUINE ROUTE */

router.get('/robots.txt', function(req, res){
  res.writeHead(200, {"Content-Type": "text/plain"});
  var response = "User-agent: Twitterbot\nDisallow:\n\n";
  response += "User-agent: *\nDisallow:";
  if(config.env == 'dev' || config.env == 'staging'){
    response += ' /';
  }
  res.end(response);
});

router.get('/sitemap.xml', sitemap);

router.get('/:slug', pages.page);

router.use(function(req, res, next) {
  res.status(404).render('404', {data:{}});
});

router.use(function(err, req, res, next) {
  console.error(err);
  res.status(500).render('error', { data: {err: err}});
});

module.exports = router
