var data = {};
exports.index = function(req, res) {
  data.controller = 'pages';
  data.action = 'index';
  data.fruit = 'Apple';
  res.render('home', {data:data});
}
