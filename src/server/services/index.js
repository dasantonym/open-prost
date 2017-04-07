'use strict';
const _takeouts = require('./takeout/index');
const _storage = require('./storage/index');
const _location = require('./location/index');
const _person = require('./person/index');
const _event = require('./event/index');
const _item = require('./item/index');
const _authentication = require('./authentication/index');
const _user = require('./user/index');

module.exports = function() {
  const app = this;

  app.configure(_authentication);
  app.configure(_event);
  app.configure(_user);
  app.configure(_item);
  app.configure(_location);
  app.configure(_person);
  app.configure(_storage);
  app.configure(_takeouts);
};
