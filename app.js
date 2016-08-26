'use strict';


const mongoose = require('./db');
const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io').listen(httpServer);
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
// const jsonwebtoken = require('jsonwebtoken');
const config = require('./config');
const verifyToken = require('./middlewares/apiToken');




var isAuthentified = (req, res, next) => {
  res.redirect('/login');
}
app.engine('.hbs', exphbs({defaultLayout: 'public', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public.src'));


// Middelware pour acces à Socket.io depuis le router
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Web
app.use('/', require('./routes/public'));
app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));

// API
app.use('/api/signs', verifyToken, require('./routes/api/signs'));
app.use('/api/users', verifyToken, require('./routes/api/users'));

httpServer.listen(config.http.port, () => {
  console.log("Listening on " + config.http.port);
});
