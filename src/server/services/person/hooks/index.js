'use strict';

const globalHooks = require('../../../hooks');
const nameSpace = require('uuid5')('persons');

exports.before = {
  all: [],
  find: [],
  get: [],
  create: [
    globalHooks.generateSlug('name'),
    globalHooks.removeUUID(),
    globalHooks.addUUIDv5('slug', nameSpace)
  ],
  update: [globalHooks.removeUUID()],
  patch: [globalHooks.removeUUID()],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
