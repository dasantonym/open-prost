require('babel-polyfill');

import Vue from 'vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import 'element-ui/lib/theme-default/index.css';

import feathers from 'feathers/client';
import rest from 'feathers-rest/client';
import superagent from 'superagent';

import LoadItems from './util/load-items';

import AppMain from './components/app-main';
import TakeOut from './components/take-out';
import ManageTakeOuts from './components/manage-take-outs';
import Configure from './components/configure';
import ManageItems from './components/manage-items';
import ManageCommonResource from './components/manage-common-resource';

const app = feathers()
  .configure(rest('http://localhost:3030')
  .superagent(superagent));

const loadItems = new LoadItems(app);
app.set('loadItems', loadItems);

const defaultLocation = {
  title: undefined
};

Vue.use(ElementUI, {locale });

Vue.component('op-app-main', new AppMain());
Vue.component('op-take-out', new TakeOut(app));
Vue.component('op-manage-take-outs', new ManageTakeOuts(app));
Vue.component('op-configure', new Configure(app));
Vue.component('op-manage-items', new ManageItems(app));
Vue.component('op-manage-locations', new ManageCommonResource(app, defaultLocation, 'locations'));

window.eventBus = new Vue();

new Vue({
  el: '#openprost'
});
