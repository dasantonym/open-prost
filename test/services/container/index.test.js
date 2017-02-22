'use strict';

const assert = require('assert');
const app = require('../../../src/server/app');

describe('container service', function() {
  it('registered the containers service', () => {
    assert.ok(app.service('containers'));
  });
});
