require('babel-polyfill');

import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import feathers from 'feathers/client';
import rest from 'feathers-rest/client';
import superagent from 'superagent';

import AppMain from './components/app-main';
import TakeOut from './components/take-out';
import ManageItems from './components/manage-items';

const app = feathers()
  .configure(rest('http://localhost:3030')
  .superagent(superagent));

Vue.use(ElementUI);

Vue.component('op-app-main', new AppMain());
Vue.component('op-take-out', new TakeOut());
Vue.component('op-items', new ManageItems());

window.eventBus = new Vue();

new Vue({
  el: '#openprost'
});
