'use strict';
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: String,
  password: String,
  // salt: String,
  // apiKey: String,
  // role: String,
  admin: Boolean,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', schema);
