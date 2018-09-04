import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

const makeModule = function (name, Model) {
  const db = new Datastore({
    filename: path.join(remote.app.getPath('userData'), `${name}.db`),
    autoload: true
  })
  return {
    namespaced: true,
    state: {},
    actions: {
      find (context, query) {
        return new Promise((resolve, reject) => {
          db.find(query, (err, result) => {
            if (err) return reject(err)
            resolve(result.map(item => new Model(item)))
          })
        })
      },
      get (context, uuid) {
        return new Promise((resolve, reject) => {
          db.findOne({ uuid }, (err, result) => {
            if (err) return reject(err)
            resolve(new Model(result))
          })
        })
      },
      insert (context, data) {
        return new Promise((resolve, reject) => {
          db.insert(new Model(data), (err, result) => {
            if (err) return reject(err)
            resolve(new Model(result))
          })
        })
      },
      update (context, args) {
        const [query, data, options] = args
        return new Promise((resolve, reject) => {
          const instance = new Model(data)
          if (typeof instance.touch === 'function') instance.touch()
          db.update(query, instance, options || {}, (err, result) => {
            if (err) return reject(err)
            resolve(result)
          })
        })
      },
      remove (context, query) {
        return new Promise((resolve, reject) => {
          db.remove(query, (err, result) => {
            if (err) return reject(err)
            resolve(result)
          })
        })
      }
    }
  }
}

export default makeModule
