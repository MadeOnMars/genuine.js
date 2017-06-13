const express = require('express');
const sitemap = require('../utils/sitemap');
const rss = require('../utils/rss');
const robots = require('../utils/robots');
const config = require('../local-config');
const router = express.Router();
/* GENUINE INCLUDE */

    pages = require('../controllers/pages');

router.get('/', pages.index);
/* GENUINE ROUTE */

router.get('/robots.txt', robots);

router.get('/sitemap', sitemap);
router.get('/sitemap.xml', sitemap);

router.get('/rss', rss);
router.get('/rss.xml', rss);

module.exports = router;
