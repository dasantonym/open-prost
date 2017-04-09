'use strict';

const uuid4 = require('uuid/v4'),
  uuid5 = require('uuid5'),
  slugify = require('slugify');

module.exports.removeUUID = () => {
  return hook => {
    if (hook.data && hook.data.uuid) {
      delete hook.data.uuid;
    }
    return Promise.resolve(hook);
  };
};

module.exports.addUUIDv4 = () => {
  return hook => {
    if (hook.data) {
      hook.data.uuid = uuid4();
    }
    return Promise.resolve(hook);
  };
};

module.exports.addUUIDv5 = (prop, nameSpace = undefined, lowerCase = false) => {
  return hook => {
    if (hook.data[prop]) {
      let val = hook.data[prop];
      if (typeof nameSpace === 'string') {
        val = nameSpace + val;
      }
      if (lowerCase && typeof val === 'string') {
        val = val.toLowerCase();
      }
      hook.data.uuid = uuid5(val);
    }
    return Promise.resolve(hook);
  };
};

module.exports.generateSlug = (prop, lowerCase = true) => {
  return hook => {
    if (hook.data[prop]) {
      hook.data.slug = slugify(hook.data[prop], '-');
      if (lowerCase && typeof hook.data.slug === 'string') {
        hook.data.slug = hook.data.slug.toLowerCase();
      }
    }
    return Promise.resolve(hook);
  };
};
