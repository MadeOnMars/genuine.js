var config = {
  port: 3000,
  env: 'dev', //dev, staging or prod
  secret: 'this-is-your-powerful-secret',
  locales: ['en', 'fr'],
  title: 'Genuine.js | The best Framework like ever',
  description: 'A really light Node.js framework, focused on making awesome and fast websites.',
  host: 'http://locahost:3000',
  s3: {
    active: false,
    url: 'https://s3-eu-west-1.amazonaws.com/yourbucket'
  }
};

config.public = {
  env: config.env,
  title: config.title,
  description: config.description,
  host: config.host
}

module.exports = config;
