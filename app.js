'use strict';

const config = require('./config');
const mongoose = require('./db');
const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io').listen(httpServer);
const bodyParser = require('body-parser');
// const consolidate = require('./views/engine');
const signs = require('./routes/signs');

var isAuthenticated = (req, res, next) => {
  return next();
}

var hasRight = (req, res, next) => {
  return next();
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public.src'));
// app.engine('html', consolidate.swig);
// app.set('view engine', 'mustache');
// app.set('views', __dirname + '/views');

app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use('/signs', isAuthenticated, hasRight, signs);
// defineRoutes(app);
httpServer.listen(config.http.port, () => {
  console.log("Listening on " + config.http.port);
});
