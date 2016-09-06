var express = require('express'),
    sitemap = require('../utils/sitemap'),
    rss = require('../utils/rss'),
    config = require('../local-config'),
    router = express.Router(),
/* GENUINE INCLUDE */

    pages = require('../controllers/pages');

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

router.get('/sitemap', sitemap);
router.get('/sitemap.xml', sitemap);

router.get('/rss', rss);
router.get('/rss.xml', rss);

module.exports = router
