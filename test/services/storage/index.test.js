'use strict';

const assert = require('assert');
const app = require('../../../src/server/app');

describe('storage service', function() {
  it('registered the storages service', () => {
    assert.ok(app.service('storages'));
  });
});
