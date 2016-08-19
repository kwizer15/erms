var express = require('express')
  , http = require('http')
  , bodyParser = require('body-parser')
  , nStore = require('nstore')
  , app = express()
  , http_port = 3000;

app.use(express.static(__dirname + '/public.src'));
app.use(bodyParser.json());

app.listen(http_port);
console.log("Listening on " + http_port);