var nodeRss = require('rss');
var moment = require('moment');
var config = require('../local-config');

moment.locale('en');

rss = function(req, res){
  var feed = new nodeRss({
    title: config.title,
    description: config.description,
    feed_url: config.host + '/rss',
    site_url: config.host,
    language: req.lang,
    pubDate: moment().format('ddd, DD MMM YYYY HH:mm:ss ZZ'),
    ttl: '60'
  });

  feed.item({
      title:  'Title of an element',
      description: 'Description of the element',
      url: 'His URL',
      date: moment().format('ddd, DD MMM YYYY HH:mm:ss ZZ')
  });

  res.set('Content-Type', 'text/xml');
  res.send(feed.xml());
}

module.exports = rss;
