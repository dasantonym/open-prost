import Vue from 'vue'
import Vuex from 'vuex'

import makeModule from './lib/make-module'
import settings from './settings'

import {
  Item,
  Location,
  Person,
  Takeout
} from './models'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      items: makeModule('items', Item),
      locations: makeModule('locations', Location),
      persons: makeModule('persons', Person),
      takeouts: makeModule('takeouts', Takeout),
      settings
    }
  })

  return Store
}
