var config = {
  port: 3000,
  env: 'dev', //dev, staging or prod
  secret: 'this-is-your-powerful-secret',
  locales: ['en', 'fr'],
  title: 'Genuine.js | The best Framework like ever',
  description: 'A really light Node.js framework, focused on making awesome and fast websites.',
  host: 'http://locahost:3000'
};

config.public = {
  env: config.env,
  title: config.title,
  description: config.description,
  host: config.host
}

module.exports = config;
