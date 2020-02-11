import Vue from 'vue'
import axios from 'axios';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import Notifications from 'vue-notification';
import { sync } from 'vuex-router-sync';
import { i18n } from './i18n';
import { createComponents } from './components';
import { createStore } from './store';
import { createRouter, routes } from './router';

import './styles.scss';

Vue.config.productionTip = false
Vue.use(Notifications);
Vue.config.productionTip = false;
Vue.use(Buefy);
axios.defaults.baseURL = process.env.API_REST_URL;


const startFuretUI = (elementId) => {
  const elementExists = document.getElementById(elementId);
  if (elementExists === null) return;
  console.log(` ==> start furet ui on element #${elementId}`);
  createComponents();
  const store = createStore();
  const router = createRouter(store, routes);

  sync(store, router); // use vue-router with vuex
  new Vue({
    // el: '#furet-ui',
    template: '<app/>',
    router,
    store,
    i18n,
  }).$mount(`#${elementId}`)
}
startFuretUI('furet-ui')
