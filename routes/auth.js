'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('login', {layout: 'base'});
});

router.post('/', (req, res, next) => {
  res.end('ok');
});

module.exports = router;
