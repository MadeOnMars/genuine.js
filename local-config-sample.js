var config = {
  port: 3000,
  env: 'dev', //dev, staging or prod
  secret: 'this-is-your-powerful-secret',
  locales: ['en', 'fr', 'se'],
  title: {
    en: 'Genuine.js | The best Framework like ever',
    fr: 'Genuine.js | Juste le meilleur Framework de tous les temps',
    es: 'Genuine.js | El mejor Framework de todos los tiempos'
  },
  description: {
    en: 'A really light Node.js framework, focused on making awesome and fast websites.',
    fr: 'Un framework Node.js super léger pour faire de superbes sites.',
    es: 'Un framework Node.js muy ligero para hacer sitios rápidamente.'
  },
  host: 'http://localhost:3000',
  s3: {
    active: false,
    url: 'https://s3-eu-west-1.amazonaws.com/yourbucket'
  },
  responsiveSizes : [1200, 768, 480, 0]
};

config.public = {
  env: config.env,
  locales: config.locales,
  title: config.title,
  description: config.description,
  host: config.host,
  responsiveSizes: config.responsiveSizes
}

module.exports = config;
