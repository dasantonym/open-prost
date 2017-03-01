'use strict';
const takeouts = require('./takeout/index');
const storage = require('./storage/index');
const location = require('./location/index');
const item = require('./item/index');
const authentication = require('./authentication/index');
const user = require('./user/index');

module.exports = function() {
  const app = this;


  app.configure(authentication);
  app.configure(user);
  app.configure(item);
  app.configure(location);
  app.configure(storage);
  app.configure(takeouts);
};
