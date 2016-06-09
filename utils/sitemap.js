var sm = require('sitemap');
var config = require('../local-config');


sitemap = function(req, res){
  var sitemapObj = {
        hostname: config.host,
        cacheTime: 600000,        // 600 sec - cache purge period
        urls: [
          { url: '/',  changefreq: 'daily', priority: 1.0 }
        ]
      };

  var sitemapRaw = sm.createSitemap (sitemapObj);
  sitemapRaw.toXML( function (err, xml) {
    if (err) {
      return res.status(500).end();
    }
    res.header('Content-Type', 'application/xml');
    res.send( xml );
});
}

module.exports = sitemap;
