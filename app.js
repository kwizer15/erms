'use strict';

const mongoose = require('./db');
const config = require('./config');
const express = require('express');
const app = express();
const httpServer = require('http').createServer(app) //.listen(3000);
const io = require('socket.io').listen(httpServer);
const bodyParser = require('body-parser');
const signs = require('./routes/signs');
// var modelSigns = nStore.new("signs.db", function(err, model) {
// 	if (err) {
//     console.error('Echec du chargement de la base de donnée.');
//   } else {
//     console.log('Chargement de signs.db : OK');
//     loadApp(appli, sock);
//   }
// });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public.src'));
app.use(function(req, res, next) {
  req.io = io;
  next();
});
app.use('/signs', signs);
// defineRoutes(app);
httpServer.listen(config.http.port, function() {
  console.log("Listening on " + config.http.port);
});


// var defineRoutes = function() {
// 	app.get('/signs', function(req, res) {
// 		console.log("GET (ALL) : /signs");
// 		modelSigns.all(function(err, result) {
// 			res.json((err) ? err : resultsToArray(result));
// 		});
// 	});
//
// 	app.post('/signs', function(req, res) {
// 		console.log("POST CREATE ", req.body);
//
// 	    var d = new Date(),
// 	    model = req.body;
// 	    model.saveDate = (d.valueOf());
//
// 	    modelSigns.save(null, model, function(err, key) {
// 	      if (err) {
// 	        console.log("Erreur : ", err);
// 	        res.json(err);
// 	      } else {
// 	        model.id = key;
//           io.emit('newSign', model);
// 	        res.json(model);
// 	      }
// 	    });
// 	});
// };
//
//
// var resultsToArray = function(results) {
// 	var outs = [];
// 	for (var key in results) {
// 		var out = results[key];
// 		out.id = key;
// 		outs.push(out);
// 	}
//
// 	return outs;
// }
