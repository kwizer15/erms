
const resultsToArray = function(results) {
  var outs = [];
  for (var key in results) {
    var out = results[key];
    out.id = key;
    outs.push(out);
  }
  return outs;
}

const front = function(server, modelSigns) {
    // GET /signs
    server.get('/signs', function(req, res) {
      console.log("GET (ALL) : /signs");
      modelSigns.all(function(err, result) {
        res.json((err) ? err : resultsToArray(result));
      });
    });
    // POST /signs
    server.post('/signs', function(req, res) {
      console.log("POST CREATE ", req.body);

      var d = new Date(),
      model = req.body;
      model.saveDate = (d.valueOf());

      modelSigns.save(null, model, function(err, key) {
        if (err) {
          console.error("Erreur : ", err);
          res.json(err);
        } else {
          model.id = key;
          res.json(model);
        }
      });
    });
  }



exports.front = front;
