import isUUID from 'validator/lib/isUUID'
import uuid from 'uuid/v4'
import { DateTime } from 'luxon'

const defaultConstructor = function (data) {
  if (!data.uuid || !isUUID(data.uuid)) data.uuid = uuid()
  if (!data.created) data.created = DateTime.local().toISO()
  this.populate(data)
}

const touch = function () {
  this.updated = DateTime.local().toISO()
}

export {
  defaultConstructor,
  touch
}
