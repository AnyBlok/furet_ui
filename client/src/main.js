// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import Notifications from 'vue-notification';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { sync } from 'vuex-router-sync';
import { createComponents } from './components';
import { getRoutes } from './resources';
import { i18n } from './i18n';
import { store } from './store';
import { createRouter } from './router';

Vue.use(Notifications);
Vue.config.productionTip = false;
Vue.use(Buefy);
library.add(fas, fab);
Vue.component('font-awesome-icon', FontAwesomeIcon);
axios.defaults.baseURL = process.env.API_REST_URL;

const startFuretUi = () => {
  // eslint-disable-next-line
  console.log(' ==> start furet ui');
  /* eslint-disable no-new */
  createComponents();
  const router = createRouter(getRoutes());

  sync(store, router); // use vue-router with vuex
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
    // eslint-disable-next-line
    for (const [name, description] of Object.entries(res.data.templates)) {
      const template = document.createElement('template');// create a stylesheet DOM node
      template.id = name;
      template.innerHTML = description;
      document.body.appendChild(template);
    }
    res.data.css.forEach((file) => {
      const style = document.createElement('link');// create a stylesheet DOM node
      style.href = `${process.env.API_REST_URL}/${file}`;// set its src to the provided URL
      style.rel = 'stylesheet';
      style.type = 'text/css';
      document.head.appendChild(style);
    });
    let modules2beimported = '(async () => {';
    res.data.js.forEach((file) => {
      modules2beimported += `
        await import('${process.env.API_REST_URL}/${file}');`;
    });
    const script = document.createElement('script');// create a script DOM node
    script.type = 'module';
    modules2beimported += `
        startFuretUi();
      })();
    `;
    script.text = modules2beimported;
    document.body.appendChild(script);
  })
  .catch((error) => {
    // eslint-disable-next-line
    console.error(error);
  });
