var config = require('../local-config');
var pkg = require ('../package.json');
var locals = {};
locals.config = config.public || {};
locals.version = pkg.version || '0.0.1';
// Example
/*
locals.foo = function(){
  return 'bar';
}
*/

module.exports = locals;
