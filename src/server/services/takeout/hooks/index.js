'use strict';

const globalHooks = require('../../../hooks');

exports.before = {
  all: [],
  find: [],
  get: [],
  create: [globalHooks.removeUUID(), globalHooks.addUUIDv4()],
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
