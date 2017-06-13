const sm = require('sitemap');
const config = require('../local-config');


const sitemap = (req, res) => {
  const sitemapObj = {
    hostname: config.host,
    cacheTime: 600000,
    urls: [
      {
        url: '/',
        changefreq: 'daily',
        priority: 1.0
      }
    ]
    };

  const sitemapRaw = sm.createSitemap(sitemapObj);
  sitemapRaw.toXML((err, xml) => {
    if (err) {
      return res.status(500).end();
    }
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  });
}

module.exports = sitemap;
