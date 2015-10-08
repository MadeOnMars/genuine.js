var api = require('http');
var data = {};
exports.index = function(req, res) {
  api.get(req.protocol + '://' + req.get('host') + '/api' + req.originalUrl + '.json', function(result) {
    var body = '';
    result.on('data', function(chunk) {
      body += chunk;
    });
    result.on('end', function() {
      var element = {"items":[]};
      try {
        element.items = JSON.parse(body);
      } catch (e) {
        console.log("The JSON seems wrong" + e);
      }
      data.controller = 'articles';
      data.action = 'index';
      data.element = element;
      res.render('articles', {data:data});
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
}
