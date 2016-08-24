'use strict';
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  phone: String,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sign', schema);;

// test

// var sign = new Sign({name:'John Doe', phone:'0123456789'});
// sign.save(function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(sign);
//   }
// });

// Sign.find((err, signs) => {
//   if (err) console.error(err)
//   else console.log(signs);
// });
