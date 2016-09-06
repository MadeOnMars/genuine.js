var express = require('express'),
    pages = require('../controllers/pages'),
    router = express.Router();

router.get('/:slug', pages.page);

module.exports = router
