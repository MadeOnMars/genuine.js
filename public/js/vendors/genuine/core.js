const GENUINE = (app, controller, action) => {
  app.common.init();
  if (controller !== '' && app[controller] && typeof app[controller][action] == 'function' ) {
    app[controller].init();
    app[controller][action]();
  }
}

module.exports = GENUINE;
