'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const io = require('socket.io');
const Sign = require('../models/Sign');

// Public
router.post('/', (req, res, next) => {
  Sign.create(req.body, (err, sign) => {
    if (err) return next(err);
    // io.emit('newSign', sign);
    res.json(sign);
  })
});

// @todo Secure all
router.get('/', (req, res, next) => {
  Sign.find((err, signs) => {
    if (err) return next(err);
    res.json(signs);
  });
});

router.get('/:id', (req, res, next) => {
  Sign.findById(req.params.id, (err, sign) => {
    if (err) return next(err);
    res.json(sign);
  });
});



router.put('/:id', (req, res, next) => {
  Sign.findByIdAndUpdate(req.params.id, req.body, (err, sign) => {
    if (err) return next(err);
    res.json(sign);
  });
});

router.delete('/:id', (req, res, next) => {
  Sign.findByIdAndRemove(req.params.id, req.body, (err, sign) => {
    if (err) return next(err);
    res.json(sign);
  });
});

module.exports = router;
