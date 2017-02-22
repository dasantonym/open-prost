'use strict';

const assert = require('assert');
const app = require('../../../src/server/app');

describe('item service', function() {
  it('registered the items service', () => {
    assert.ok(app.service('items'));
  });
});
