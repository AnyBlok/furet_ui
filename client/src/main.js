// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import App from './App';
import router from './router';
import { createComponents } from './components';

Vue.config.productionTip = false;

Vue.use(Buefy);

const startFuretUi = () => {
  // eslint-disable-next-line
  console.log(' ==> start furet ui');
  /* eslint-disable no-new */
  createComponents();
  new Vue({
    el: '#furet-ui-app',
    router,
    components: { App },
    template: '<App/>',
  });
};

window.startFuretUi = startFuretUi;

// eslint-disable-next-line
axios.get(process.env.API_REST_URL + 'furet-ui/app/component/files')
  .then((res) => {
    res.data.css.forEach((file) => {
      const style = document.createElement('link');// create a stylesheet DOM node
      style.href = process.env.API_REST_URL + file;// set its src to the provided URL
      style.rel = 'stylesheet';
      style.type = 'text/css';
      document.head.appendChild(style);
    });
    let modules2beimported = '(async () => {';
    res.data.js.forEach((file) => {
      const moduleSpecifier = process.env.API_REST_URL + file;
      modules2beimported += `
        await import('${moduleSpecifier}');`;
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
