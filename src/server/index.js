'use strict';

const app = require('./app').app;
const Debug = require('debug');
const debug = Debug('feathers');
const configuration = require('feathers-configuration');

/* global window:true */
if (typeof window !== 'undefined' && typeof window.require === 'function') {
  setTimeout(function () {
    const gui = window.require('nw.gui');
    /* global window:false */
    /* jshint node:true */
    process.env.NODE_ENV = 'webkit';
    app.configure(configuration());
    app.set('nedb', require('path').join(gui.App.dataPath, 'nedb'));
    /* jshint node:false */
    require('./app').initApp();
    let port = app.get('port');
    app.listen(port).on('listening', () =>
      debug(`Feathers application started on ${app.get('host')}:${port}`)
    );
  }, 1000);
} else {
  app.configure(configuration());
  require('./app').initApp();
  let port = app.get('port');
  app.listen(port).on('listening', () =>
    debug(`Feathers application started on ${app.get('host')}:${port}`)
  );
}
