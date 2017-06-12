const config = require('../local-config');

const robots = (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain"
  });
  let response = "User-agent: Twitterbot\nDisallow:\n\n";
  response += "User-agent: *\nDisallow:";
  if (config.env == 'dev' || config.env == 'staging') {
    response += ' /';
  }
  res.end(response);
}

module.exports = robots;
