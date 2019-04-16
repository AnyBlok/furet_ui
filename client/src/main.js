// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import Notifications from 'vue-notification';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { sync } from 'vuex-router-sync';
import { createComponents } from './components';
import { getRoutes } from './resources';
import { i18n, updateLocales, updateLang } from './i18n';
import { createStore } from './store';
import { createRouter } from './router';
import './styles.scss';


Vue.use(Notifications);
Vue.config.productionTip = false;
Vue.use(Buefy);
library.add(far, fas, fab);
Vue.component('font-awesome-icon', FontAwesomeIcon);
axios.defaults.baseURL = process.env.API_REST_URL;
window.axios = axios;
const store = createStore();

const startFuretUi = () => {
  document.getElementById('import_reporting').remove();
  // eslint-disable-next-line
  console.log(' ==> start furet ui');
  /* eslint-disable no-new */
  createComponents();
  const router = createRouter(store, getRoutes());

  sync(store, router); // use vue-router with vuex
  // eslint-disable-next-line
  new Vue({
    el: '#furet-ui-app',
    template: '<app/>',
    store,
    router,
    i18n,
  });
};

window.startFuretUi = startFuretUi;

axios.get('furet-ui/app/component/files')
  .then((res) => {
    if (res.data.global !== undefined) store.commit('UPDATE_GLOBAL', res.data.global);
    if (res.data.menus !== undefined) store.commit('UPDATE_MENUS', res.data.menus);
    if (res.data.lang !== undefined) updateLang(res.data.lang);
    if (res.data.langs !== undefined) updateLocales(res.data.langs);
    if (res.data.templates !== undefined) {
      const node = document.getElementById('templates');
      let templateSize = 0;
      node.setAttribute('max', Object.keys(res.data.templates).length);
      // eslint-disable-next-line
      for (const [name, description] of Object.entries(res.data.templates)) {
        const template = document.createElement('template');// create a stylesheet DOM node
        template.id = name;
        template.innerHTML = description;
        document.body.appendChild(template);
        templateSize += 1;
        node.setAttribute('value', templateSize);
      }
    }
    if (res.data.css !== undefined) {
      const node = document.getElementById('styles');
      let stylesSize = 0;
      node.setAttribute('max', res.data.css.length);
      res.data.css.forEach((file) => {
        const style = document.createElement('link');// create a stylesheet DOM node
        style.href = `${process.env.API_REST_URL}/${file}`;// set its src to the provided URL
        style.rel = 'stylesheet';
        style.type = 'text/css';
        document.head.appendChild(style);
        stylesSize += 1;
        node.setAttribute('value', stylesSize);
      });
    }
    if (res.data.js !== undefined) {
      let modules2beimported = '(async () => {';
      modules2beimported += `
        document.getElementById('error').remove();
        const node = document.getElementById('prototypes');
        node.setAttribute('max', ${res.data.js.length});`;
      let jsSize = 0;
      res.data.js.forEach((file) => {
        jsSize += 1;
        modules2beimported += `
          await import('${process.env.API_REST_URL}/${file}');
          node.setAttribute('value', ${jsSize});`;
      });
      const script = document.createElement('script');// create a script DOM node
      script.type = 'module';
      modules2beimported += `
          startFuretUi();
        })();
      `;
      script.text = modules2beimported;
      document.body.appendChild(script);
    }
  })
  .catch((error) => {
    // eslint-disable-next-line
    console.error(error);
  });
