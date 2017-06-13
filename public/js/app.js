const $ = require('jquery');
const mustFit = require('must-fit');

const app = {
  common: require('./src/common'),
  pages: require('./src/pages')
}

const genuine = require('./vendors/genuine/core');
const onResizeFunctions = require('./vendors/genuine/resize');

const socket = io.connect();

const body = document.body;
const controller = body.getAttribute('data-controller');
const action = body.getAttribute('data-action');

$(document).ready(() => {
  genuine(app, controller, action);
  onResizeFunctions.init($(window).width(), $(window).height());
});

$(window).resize(function() {
  onResizeFunctions.init($(this).width(), $(this).height());
});
