var express = require('express'),
    sitemap = require('../utils/sitemap'),
    rss = require('../utils/rss'),
    robots = require('../utils/robots'),
    config = require('../local-config'),
    router = express.Router(),
/* GENUINE INCLUDE */

    pages = require('../controllers/pages');

router.get('/', pages.index);
/* GENUINE ROUTE */

router.get('/robots.txt', robots);

router.get('/sitemap', sitemap);
router.get('/sitemap.xml', sitemap);

router.get('/rss', rss);
router.get('/rss.xml', rss);

module.exports = router
