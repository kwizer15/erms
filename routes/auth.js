'use strict';
const config = require('../config.js')
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.get('/login', (req, res, next) => {
  res.render('login', {layout: 'base'});
});

router.post('/login', (req, res, next) => {
  User.findOne({
    username: req.body.login
  }, (err, user) => {
    if (err) throw err;
    if (!user || user.password != req.body.password) {
      res.json({ success: false, message: 'Authentication failed. User not found or wrong password.' });
    } else {
      // if user is found and password is right
      // create a token
      var token = jwt.sign(user, config.token.secret, {
        expiresIn: "24h" // expires in 24 hours
      });
      // return the information including token as JSON
      res.json({
        success: true,
        token: token
      });
    };
  });
});

router.post('/logout', (req, res, next) => {
  res.json();
});

module.exports = router;
