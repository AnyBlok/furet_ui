import axios from 'axios';
import _ from 'underscore';
import { defineComponent } from './factory';

defineComponent('app', {
  template: `
    <div id="furet-ui-app">
      <furet-ui-appbar />
      <notifications position="top center"/>
      <router-view v-bind:key="$route.fullPath"></router-view>
      <furet-ui-footer />
    </div>`,
});

defineComponent('furet-ui-appbar', {
  template: `
    <header class="hero is-primary">
      <furet-ui-appbar-header />
      <furet-ui-appbar-body />
      <furet-ui-appbar-footer />
    </header>
  `,
});

defineComponent('furet-ui-appbar-header', {
  template: `
    <b-navbar type="is-primary">
      <template #brand>
        <furet-ui-appbar-header-brand />
      </template>
      <template #start>
        <furet-ui-appbar-header-menus />
      </template>
      <template #end>
        <furet-ui-appbar-header-user />
      </template>
    </b-navbar>
  `,
  prototype: {
    data() {
      return {
        isOpen: false,
      };
    },
  },
});

defineComponent('furet-ui-appbar-body', {
  template: `
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          Furet UI
        </h1>
        <p class="subtitle">
          Web Client for all your AnyBlok backend
        </p>
      </div>
    </div>
  `,
});

defineComponent('furet-ui-appbar-footer', {
  template: `
    <div class="hero-foot" />
  `,
});

defineComponent('furet-ui-appbar-header-brand', {
  template: `
    <b-navbar-item tag="router-link" :to="{ path: '/' }">
      <img class="image" v-bind:src="logo" />
    </b-navbar-item>
  `,
  extend: ['mixin-logo'],
});

defineComponent('furet-ui-appbar-header-menus', {
  template: `
    <div class="navbar-start">
      <b-navbar-item v-for="menu in space_menus" v-bind:key="menu.code" v-on:click="selectMenu(menu)" tab="dir" :active="menu.code === space_code ? true : false">
          <button :class="['button', 'is-primary', menu.code === space_code ? 'is-active' : '']">
            <b-icon
              v-bind:icon="menu.icon.code"
              v-bind:type="menu.icon.type">
            </b-icon>
            <span>{{ menu.label }}</span>
          </button>
      </b-navbar-item>
    </div>
  `,
  prototype: {
    computed: {
      space_code () {
        return this.$store.state.route.params.code;
      },
      space_menus () {
        const menus = this.$store.state.global.root_menus;
        return menus;
      }
    },
    methods: {
      selectMenu (menu) {
        this.$router.push(menu.path);
        this.$store.commit("ClearBreadcrumb");
        this.$store.commit("CLEAR_CHANGE");
      }
    }
  },
});

defineComponent('furet-ui-appbar-header-user', {
  template: `
    <div>
      <furet-ui-appbar-header-logged-user v-if="loggedIn" />
      <furet-ui-appbar-header-unlogged-user v-else />
    </div>
  `,
  prototype: {
    computed: {
      loggedIn () {
        return this.$store.getters.loggedIn;
      },
    },
  },
});

defineComponent('furet-ui-appbar-header-unlogged-user', {
  template: `
    <b-navbar-item tag="div">
      <div class="buttons">
        <a class="button is-light" @click="call_login_page">
          {{ $t('components.login.appbar') }}
        </a>
      </div>
    </b-navbar-item>
  `,
  prototype: {
    methods: {
      call_login_page () {
        this.$router.push({path: '/login'});
      },
    },
  },
});

defineComponent('furet-ui-appbar-header-logged-user', {
  template: `
    <b-navbar-dropdown :label="userName" hoverable >
      <b-navbar-item v-for="menu in user_menus" :key="menu.label">
        <a v-on:click="routerPush(menu.path)" class="button is-primary is-inverted is-fullwidth">
          {{ menu.label }}
        </a>
      </b-navbar-item>
      <b-navbar-item>
        <a v-on:click="logOut" class="button is-primary is-inverted is-fullwidth">
          {{ $t('components.logout.button') }}
        </a>
      </b-navbar-item>
    </b-navbar-dropdown>
  `,
  prototype: {
    computed: {
      userName () {
        return this.$store.state.global.userName;
      },
      user_menus() {
        return this.$store.state.global.user_menus;
      },
    },
    methods: {
      call_login_page () {
        this.$router.push({path: '/login'});
      },
      routerPush (path) {
        this.$router.push({path});
      },
      logOut() {
        axios.post('/furet-ui/logout')
          .then((result) => {
            this.$dispatchAll(result.data);
          })
          .catch((error) => {
            console.error(error);
          })
      },
    },
  },
});

defineComponent('furet-ui-footer', {
  template: `
    <footer class="footer">
      <div class="content has-text-centered is-success">
        <p>
          <strong>Furet UI</strong> by <a href="https://github.com/jssuzanne">Jean-Sébastien Suzanne</a>. 
          The source code is licensed <a href="http://opensource.org/licenses/MPL-2.0">MPL-2.0</a> and 
          is available on <a href="https://github.com/AnyBlok/furet_ui">Github</a>.
        </p>
      </div>
    </footer>
  `,
});

defineComponent('furet-ui-menu', {
    template: `
      <ul class="menu-list">
        <b-loading v-bind:active.sync="isLoading"></b-loading>
        <li v-for="menu in menus">
            <a v-on:click="onClickMenu(menu)"
               v-bind:class="[menu.id == menuId ? 'is-active' : '']"
            >
              <span v-if="menu.label">
                  {{ menu.label }}
              </span>
            </a>
            <furet-ui-menu
                v-if="(menu.children || []).length != 0"
                v-bind:menus="menu.children || []"
                v-bind:menuId="menuId"
                v-bind:code="code"
            />
        </li>
      </ul>
    `,
    prototype: {
      props: ['menus', 'menuId', 'code'],
      data () {
        return {
          isLoading: false,
        }
      },
      methods: {
        onClickMenu (menu) {
          if (!!menu.resource == true) {
            // TODO CLEAR DATA
            const query = {};
            if (menu.tags) query.tags = menu.tags
            if (menu.order_by) query.orders = menu.order_by
            if (_.keys(menu.filters).length) {
              query.filters = JSON.stringify(menu.filters);
            }
            this.$router.push({
              name: 'resource', 
              params: {code: this.code, menuId: menu.id, id: menu.resource},
              query,
            });
            this.$store.commit("ClearBreadcrumb");
            this.$store.commit("CLEAR_CHANGE");
          } else if (menu.url !== undefined) {
            this.$store.commit("ClearBreadcrumb");
            this.$store.commit("CLEAR_CHANGE");
            if (menu.newtable) window.open(menu.url)
            else location.replace(menu.url)
          } else if (menu.method !== undefined) {
            const params = {};
            this.isLoading = true;
            axios.post(`/furet-ui/resource/0/model/${menu.model}/call/${menu.method}`, params)
              .then((response) => {
                this.isLoading = false;
                this.$dispatchAll(response.data)
              })
              .catch(() => {
                this.isLoading = false;
              });
          }
        }
      }
    }
});

/**
 * furet-ui-breadcrumb is used to display a navigational aid to keep track
 * and maintain awareness of the user location.
 *
 * Its state is saved in an Array to the `global.breadcrumb` vuex store.
 * Each element is an Object::
 *
 *  {
 *     icon: "home",  // a fontAwesome icon name https://fontawesome.com/
 *     label: "Home", // Name of the element in the breadcrumb
 *     route: Object  // A vue-router route which is saved to restore when
 *                    // user want's to come back.
 *   }
 */
defineComponent("furet-ui-breadcrumb", {
  template: `
  <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
    <ul>
      <li v-for="(item, index) in history" :key="index">
        <a v-on:click="backToResource(index, $event)">
          <b-icon
            v-if="item.icon"
            :icon="item.icon"
            size="is-small" />
          <span>{{ item.label }}</span>
        </a>
      </li>
    </ul>
  </nav>
  `,
  prototype: {
    computed: {
      history () {
        return this.$store.state.global.breadcrumb;
      }
    },
    methods: {
      backToResource: function(index, _event) {
        this.$router.push(this.$store.state.global.breadcrumb[index].route);
        this.$store.commit("ClearBreadcrumbFrom", index);
        this.$store.commit("CLEAR_CHANGE");
      }
    }
  }
});

defineComponent('furet-ui-space', {
  template: `
    <div 
        class="columns is-gapless"
        v-bind:style="{marginTop: '5px'}"
    >
      <div v-if="isOpenLeft && left_menus.length > 0" class="column is-one-quarter is-half-mobile">
        <aside class="menu" v-bind:style="{padding: '5px'}">
          <furet-ui-menu 
            v-bind:menus="left_menus" 
            v-bind:menuId="menuId" 
            v-bind:code="code"
          />
        </aside>
      </div>
      <div class="column" v-bind:style="{paddingLeft: '10px', paddingRight: '10px'}">
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <a class="button" v-on:click="isOpenLeft = !isOpenLeft" v-if="left_menus.length > 0">
                <i class="fa fa-bars fa-2x" aria-hidden="true"></i>
              </a>
            </div>
            <div class="level-item">
              <furet-ui-breadcrumb/>
            </div>
          </diV>
        </nav>
        <router-view v-bind:key="$route.fullPath"></router-view>
      </div>
    </div>
  `,
  prototype: {
    props: ['code', 'menuId'],
    computed: {
      isOpenLeft: {
        get () {
          return this.$store.state.global.isOpenLeft;
        },
        set (newvalue) {
          this.$store.commit('OPEN_LEFT_MENU', newvalue);
        },
      },
      left_menus () {
        return this.$store.state.global.left_menus;
      },
    },
    mounted() {
      axios.get(`furet-ui/space/${this.code}`).then((result) => {
        this.$dispatchAll(result.data);
      });
    }
  },
});
