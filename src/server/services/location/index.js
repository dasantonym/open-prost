'use strict';

const path = require('path');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const hooks = require('./hooks/index');

module.exports = function(){
  const app = this;

  const db = new NeDB({
    filename: path.join(app.get('nedb'), 'locations.db'),
    autoload: true
  });

  let options = {
    Model: db,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/locations', service(options));

  // Get our initialize service to that we can bind hooks
  const locationService = app.service('/locations');

  // Set up our before hooks
  locationService.before(hooks.before);

  // Set up our after hooks
  locationService.after(hooks.after);
};
