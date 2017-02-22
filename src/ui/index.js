require('babel-polyfill');

import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import AppMain from './components/app-main';

Vue.use(ElementUI);

Vue.component('op-app-main', new AppMain());

window.eventBus = new Vue();

new Vue({
  el: '#openprost'
});
