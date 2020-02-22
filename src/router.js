import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const routes = [
    {
        name: 'homepage',
        path: '/',
        component: {
            template: '<homepage />',
        },
        meta: { requiresAuth: false },
    },
    {
        name: 'login',
        path: '/login',
        component: {
            template: '<login />',
        },
        meta: { requiresAuth: false },
    },
    {
        name: 'space_menus',
        path: '/space/menus',
        component: {
            template: '<furet-ui-space-menus />',
        },
        meta: { requiresAuth: true },
    },
    {
        name: 'space',
        path: '/space/:code/menu/:menuId',
        component: {
            template: `
              <furet-ui-space 
                v-bind:code="$route.params.code"
                v-bind:menuId="$route.params.menuId"
              />`,
        },
        meta: { requiresAuth: true },
        children: [
          {
            name: 'resource',
            path: 'resource/:id',
            component: {
                template: `
                    <furet-ui-space-resource-manager v-bind:id="$route.params.id" />
                `,
            },
          }
        ],
    },
];

export const createRouter = (store, routes) => {
  const router = new Router({ routes });

  router.beforeEach((to, from, next) => {
    const proceed = () => {
      if (store.state.global.appLoaded) {
        if (to.matched.some(record => record.meta.requiresAuth)) {
          if (!store.getters.loggedIn) {
            next({ path: '/login', query: { redirect: to.fullPath } });
          } else {
            next();
          }
        } else {
          next(); // make sure to always call next()!
        }
      }
    }

    if (!store.state.global.appLoaded) {
      store.watch(
        (state) => state.global.appLoaded,
        (value) => {
          if (value === true) {
            proceed()
          }
        }
      )
    } else {
      proceed()
    }

  });
  return router;
};

export default {
  routes,
  createRouter,
};
