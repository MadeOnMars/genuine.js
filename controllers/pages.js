var data = {};
data.controller = 'pages';
/* GENUINE */
exports.index = function(req, res) {
  data.action = 'index';
  data.fruit = 'Apple';
  res.render('home', {data:data});
}
