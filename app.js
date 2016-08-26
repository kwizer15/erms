'use strict';

const config = require('./config');
const mongoose = require('./db');
const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io').listen(httpServer);
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const public_routes = require('./routes/public');
const admin_routes = require('./routes/admin');
const auth_routes = require('./routes/auth');
const signs = require('./routes/signs');

var isAuthentified = (req, res, next) => {
  res.redirect('/login');
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public.src'));


app.engine('.hbs', exphbs({defaultLayout: 'public', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');

// Middelware pour acces à Socket.io depuis le router
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use('/', public_routes);
app.use('/admin', isAuthentified, admin_routes);
app.use('/login', auth_routes);
app.use('/signs', signs);
httpServer.listen(config.http.port, () => {
  console.log("Listening on " + config.http.port);
});
