global.$ = require('jquery');
const Swiper = require('swiper');

const jQueryBridget = require('jquery-bridget');
const Masonry = require('masonry-layout');

const mustFit = require('must-fit');

// make Masonry a jQuery plugin
jQueryBridget( 'masonry', Masonry, $ );

global.GENUINE = {
