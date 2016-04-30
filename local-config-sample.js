var config = {
  port: 3000,
  env: 'dev' //dev, staging or prod
};

config.public = {
  env: config.env
}

module.exports = config;
