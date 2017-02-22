'use strict';

const assert = require('assert');
const app = require('../../../src/server/app');

describe('location service', function() {
  it('registered the locations service', () => {
    assert.ok(app.service('locations'));
  });
});
