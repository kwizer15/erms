'use strict';
const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.get('/', (req, res, next) => {
  User.find((err, users) => {
    if (err) return next(err);
    res.json(users);
  });
});

module.exports = router;
