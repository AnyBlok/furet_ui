// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'buefy/dist/buefy.css';
import Buefy from 'buefy';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Buefy);

/* eslint-disable no-new */
new Vue({
  el: '#furet-ui-app',
  router,
  components: { App },
  template: '<App/>',
});
