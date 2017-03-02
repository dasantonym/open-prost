'use strict';

const assert = require('assert');
const app = require('../../../src/server/app').app;

describe('takeout service', function () {
  it('registered the takeouts service', () => {
    assert.ok(app.service('takeouts'));
  });
});
