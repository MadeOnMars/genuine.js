const express = require('express');
const pages = require('../controllers/pages');
const router = express.Router();

router.get('/:slug', pages.page);

module.exports = router;
