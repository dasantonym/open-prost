'use strict';

const path = require('path');
const serveStatic = require('feathers').static;
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const feathers = require('feathers');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');

const middleware = require('./middleware');
const services = require('./services');

const app = feathers();

module.exports.app = app;
module.exports.initApp = function () {
  app.use(compress())
    .options('*', cors())
    .use(cors())
    .use('/', serveStatic(app.get('public')))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .configure(hooks())
    .configure(rest())
    .configure(services)
    .configure(middleware);
};
