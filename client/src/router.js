import Vue from 'vue';
import Router from 'vue-router';
import { store } from './store';

Vue.use(Router);

export const createRouter = (routes) => {
  const router = new Router({ routes });
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.getters.loggedIn) {
        next({ path: '/login', query: { redirect: to.fullPath } });
      } else {
        next();
      }
    } else {
      next(); // make sure to always call next()!
    }
  });
  return router;
};

export default {
  createRouter,
};
