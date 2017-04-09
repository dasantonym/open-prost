'use strict';

const path = require('path');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const hooks = require('./hooks/index');

module.exports = function () {
  const app = this;

  const db = new NeDB({
    filename: path.join(app.get('nedb'), 'takeouts.db'),
    autoload: true
  });

  let options = {
    Model: db,
    paginate: {
      default: 25,
      max: 100
    }
  };

  app.use('/takeouts', service(options));

  const takeOutService = app.service('/takeouts');
  takeOutService.before(hooks.before);
  takeOutService.after(hooks.after);
};
