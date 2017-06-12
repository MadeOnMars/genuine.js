const express = require('express');
const config = require('../local-config');
const router = express.Router();

router.use((req, res, next) => {
  res.status(404).render('404', {
    data: {}
  });
});

router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', {
    data: {
      err: err
    }
  });
});

module.exports = router
