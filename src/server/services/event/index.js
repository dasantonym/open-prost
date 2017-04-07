'use strict';

const path = require('path');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const hooks = require('./hooks/index');

module.exports = function () {
  const app = this;

  const db = new NeDB({
    filename: path.join(app.get('nedb'), 'events.db'),
    autoload: true
  });

  let options = {
    Model: db,
    paginate: {
      default: 25,
      max: 100
    }
  };

  // Initialize our service with any options it requires
  app.use('/events', service(options));

  // Get our initialize service to that we can bind hooks
  const eventService = app.service('/events');

  // Set up our before hooks
  eventService.before(hooks.before);

  // Set up our after hooks
  eventService.after(hooks.after);
};
