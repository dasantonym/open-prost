'use strict';

const path = require('path');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const hooks = require('./hooks/index');

module.exports = function () {
  const app = this;

  const db = new NeDB({
    filename: path.join(app.get('nedb'), 'persons.db'),
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
  app.use('/persons', service(options));

  // Get our initialize service to that we can bind hooks
  const personService = app.service('/persons');

  // Set up our before hooks
  personService.before(hooks.before);

  // Set up our after hooks
  personService.after(hooks.after);
};
