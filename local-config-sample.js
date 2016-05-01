var config = {
  port: 3000,
  env: 'dev', //dev, staging or prod
  secret: 'this-is-your-powerful-secret',
  locales: ['en', 'fr']
};

config.public = {
  env: config.env
}

module.exports = config;
