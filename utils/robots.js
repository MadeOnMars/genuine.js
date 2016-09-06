var config = require('../local-config');

robots = function(req, res){
  res.writeHead(200, {"Content-Type": "text/plain"});
  var response = "User-agent: Twitterbot\nDisallow:\n\n";
  response += "User-agent: *\nDisallow:";
  if(config.env == 'dev' || config.env == 'staging'){
    response += ' /';
  }
  res.end(response);
}

module.exports = robots;
