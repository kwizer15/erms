const express = require('express');
const bodyParser = require('body-parser');
const front = express();
const front_port = 3000;
const Routes = require('./app/routes');

const initServer = function(server, path) {
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({extended:true}));
  server.use(express.static(__dirname + '/' + path + '.src'));
}

initServer(front, 'public');

const nStore = require('nstore').extend(require('nstore/query')());
var modelSigns = nStore.new("signs.db", function() {
  Routes.front(front, modelSigns);
  run(front, front_port);
});

const run = function(server, port) {
	server.listen(port);
	console.log("Listening on " + port);
}
