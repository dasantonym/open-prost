'use strict';

const path = require('path');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const hooks = require('./hooks/index');

module.exports = function(){
  const app = this;

  const db = new NeDB({
    filename: path.join(app.get('nedb'), 'items.db'),
    autoload: true
  });

  let options = {
    Model: db,
    paginate: {
      default: 25,
      max: 100
    }
  };

  app.use('/items', service(options));

  const itemService = app.service('/items');
  itemService.before(hooks.before);
  itemService.after(hooks.after);
};
