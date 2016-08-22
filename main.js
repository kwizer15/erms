var express = require('express')
  , app = express()
  , httpServer = require('http').createServer(app).listen(3000)
  , io = require('socket.io').listen(httpServer)
  , bodyParser = require('body-parser')
  , nStore = require('nstore');

nStore = nStore.extend(require('nstore/query')());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public.src'));

var modelSigns;

modelSigns = nStore.new("signs.db", function() {
	run(3000);
});

var run = function(port) {
	defineRoutes();
	console.log("Listening on " + port);
}



var defineRoutes = function() {
	app.get('/signs', function(req, res) {
		console.log("GET (ALL) : /signs");
		modelSigns.all(function(err, result) {
			res.json((err) ? err : resultsToArray(result));
		});
	});

	app.post('/signs', function(req, res) {
		console.log("POST CREATE ", req.body);

	    var d = new Date(),
	    model = req.body;
	    model.saveDate = (d.valueOf());

	    modelSigns.save(null, model, function(err, key) {
	      if (err) {
	        console.log("Erreur : ", err);
	        res.json(err);
	      } else {
	        model.id = key;
          io.emit('newSign', model);
	        res.json(model);
	      }
	    });
	});
};

var resultsToArray = function(results) {
	var outs = [];
	for (var key in results) {
		var out = results[key];
		out.id = key;
		outs.push(out);
	}

	return outs;
}
