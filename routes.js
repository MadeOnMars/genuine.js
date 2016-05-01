var express = require('express'),
    router = express.Router(),
    /* GENUINE INCLUDE */
    pages = require('./controllers/pages');

router.get('/', pages.index);
/* GENUINE ROUTE */
router.get('/:slug', pages.page);


router.use(function(req, res, next) {
  res.status(404).render('404', {data:{}});
});

router.use(function(err, req, res, next) {
  console.error(err);
  res.status(500).render('error', { data: {err: err}});
});

module.exports = router
