'use strict';
const config = require('./config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.db.url)
  .then(() => console.log('MongoDB is loaded'))
  .catch((err) => console.error(err));

module.exports = mongoose;
