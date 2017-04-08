require('babel-polyfill');

import Vue from 'vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import 'element-ui/lib/theme-default/index.css';

import feathers from 'feathers/client';
import rest from 'feathers-rest/client';
import superagent from 'superagent';

import LoadItems from './util/load-items';
import LoadEvents from './util/load-events';
import LoadLocations from './util/load-locations';
import LoadPersons from './util/load-persons';

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

const loadEvents = new LoadEvents(app);
app.set('loadEvents', loadEvents);

const loadLocations = new LoadLocations(app);
app.set('loadLocations', loadLocations);

const loadPersons = new LoadPersons(app);
app.set('loadPersons', loadPersons);

const defaultPerson = {
    name: undefined
  },
  defaultLocation = {
    title: undefined
  },
  defaultEvent = {
    title: undefined
  };

Vue.use(ElementUI, {locale });

Vue.component('op-app-main', new AppMain());
Vue.component('op-take-out', new TakeOut(app));
Vue.component('op-manage-take-outs', new ManageTakeOuts(app));
Vue.component('op-manage-items', new ManageItems(app));
Vue.component('op-manage-persons', new ManageCommonResource(app, defaultPerson, 'persons'));
Vue.component('op-manage-locations', new ManageCommonResource(app, defaultLocation, 'locations'));
Vue.component('op-manage-events', new ManageCommonResource(app, defaultEvent, 'events'));

if (typeof window.require === 'function') {
  Vue.component('op-configure', new Configure(app));
}

window.eventBus = new Vue();

new Vue({
  el: '#openprost'
});
