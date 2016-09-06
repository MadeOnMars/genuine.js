var express = require('express'),
    config = require('../local-config'),
    router = express.Router();

router.use(function(req, res, next) {
  res.status(404).render('404', {data:{}});
});

router.use(function(err, req, res, next) {
  console.error(err);
  res.status(500).render('error', { data: {err: err}});
});

module.exports = router
