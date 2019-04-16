import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const createRouter = (store, routes) => {
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
