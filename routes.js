var express = require('express')
, router = express.Router()
, data = {}
/* GENUINE INCLUDE */
, articles = require('./controllers/articles')
, pages = require('./controllers/pages');

router.use(function(req, res, next) {
    next();
});
router.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


router.get('/', pages.index);
router.get('/articles', articles.index);
/* GENUINE ROUTE */



/*
** This should be the last route since it's the 404
*/
router.use(function(req, res, next) {
  res.render('404', {data:data});
});

router.use(function(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err, data:data });
});


module.exports = router
