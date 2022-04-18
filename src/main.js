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
import PluginDispatch from "./plugins/dispatch.js";

import './styles.scss';

Vue.config.productionTip = false
Vue.use(Notifications);
Vue.use(Buefy, {defaultIconPack: 'fa'});

export const startFuretUI = (elementId, routes) => {
  const elementExists = document.getElementById(elementId);
  if (elementExists === null) return;
  console.log(` ==> start furet ui on element #${elementId}`);
  createComponents();
  const store = createStore();
  const router = createRouter(store, routes);

  sync(store, router); // use vue-router with vuex
  Vue.use(PluginDispatch, {router, store, i18n});
  new Vue({
    // el: '#furet-ui',
    template: `
      <div>
        <app/>
        <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>
      </div>
    `,
    router,
    store,
    i18n,
    data() {
      return {
          isLoading: true,
      }
    },
    created () {
      axios.get('furet-ui/initialize', this.$route.name)
        .then((result) => {
            this.$dispatchAll(result.data);
            this.$store.commit('FURETUI LOADED');
            this.isLoading = false;
        })
        .catch((error) => {
          console.error('call initialize', error);
        });
    },
  }).$mount(`#${elementId}`)
}
startFuretUI('furet-ui', routes)
export default {
    startFuretUI,
};
