'use strict';
const storage = require('./storage/index');
const location = require('./location/index');
const category = require('./category/index');
const container = require('./container/index');
const item = require('./item/index');
const authentication = require('./authentication/index');
const user = require('./user/index');

module.exports = function() {
  const app = this;


  app.configure(authentication);
  app.configure(user);
  app.configure(item);
  app.configure(container);
  app.configure(category);
  app.configure(location);
  app.configure(storage);
};
