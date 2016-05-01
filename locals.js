var config = require('./local-config');
var locals = {};
locals.config = config.public || {};
// Example
/*
locals.foo = function(){
  return 'bar';
}
*/

module.exports = locals;
