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
    <div class="hero-head">
      <nav class="navbar is-primary" role="navigation">
        <div id="navbarUserMenu" v-bind:class="['navbar-menu', isOpen ? 'is-active' : '']">
          <furet-ui-appbar-spaces-menu />
          <furet-ui-appbar-user-menu />
        </div>
      </nav>
    </div>
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

defineComponent('furet-ui-appbar-user-menu', {
  prototype: {
    render(createElement) {
      const menus = [];
      this.menus.forEach((menu) => {
        menus.push(createElement(
          menu.component,
          {
            class: menu.class,
            style: menu.style,
            attrs: menu.attrs,
            props: menu.props,
            domProps: menu.domProps,
            on: menu.on,
            nativeOn: menu.nativeOn,
          },
          [menu.label]));
      });
      return createElement('div', { class: 'navbar-end' }, menus);
    },
    computed: {
      menus() {
        return this.$store.state.menus.user;
      },
    },
  },
});

defineComponent('furet-ui-appbar-router-link-goto', {
  prototype: {
    props: ['label', 'to'],
    methods: {
      goTo() {
        // TODO clear data
        this.$router.push(this.to);
      },
      format_label(label) {
        return this.$i18n.t(label);
      },
    },
  },
});

defineComponent('furet-ui-appbar-head-router-link', {
  template: `
    <a class="navbar-item" v-on:click="goTo">
      {{ format_label(label) }}
    </a>
  `,
  extend: ['furet-ui-appbar-router-link-goto'],
});

defineComponent('furet-ui-appbar-head-router-link-button', {
  template: `
    <span class="navbar-item">
      <a class="button is-primary is-inverted is-fullwidth" v-on:click="goTo">
        <span class="icon" v-if="icon">
          <b-icon v-bind:icon="icon" />
        </span>
        <span>{{ format_label(label) }}</span>
      </a>
    </span>
  `,
  extend: ['furet-ui-appbar-router-link-goto'],
  prototype: {
    props: ['icon'],
  },
});

defineComponent('furet-ui-appbar-head-router-link-dropdown', {
  template: `
    <div class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link">
        <router-link v-bind:to="to" v-if="to">
          <b-icon v-bind:icon="icon" v-if="child.icon" />
          <span>{{ format_label(label) }}</span>
        </router-link>
        <div v-else>
          <b-icon v-bind:icon="icon" v-if="icon" />
          <span>{{ format_label(label) }}</span>
        </div>
      </a>
      <div class="navbar-dropdown">
        <div v-bind:key="child.name" v-for="child in children">
          <hr class="navbar-divider" v-if="child.divider === 'before'">
          <div class="navbar-item">
            <a class="button is-primary is-inverted is-fullwidth">
              <router-link v-bind:to="child.to">
                <b-icon v-bind:icon="child.icon" v-if="child.icon" />
                <span>{{ format_label(child.label) }}</span>
              </router-link>
            </a>
          </div>
          <hr class="navbar-divider" v-if="child.divider === 'after'">
        </div>
      </div>
    </div>
  `,
  extend: ['furet-ui-appbar-router-link-goto'],
  prototype: {
    props: ['icon', 'children'],
  },
});

defineComponent('furet-ui-appbar-spaces-menu', {
  template: `
    <div class="navbar-start">
      <b-button 
        type="is-primary"
        v-on:click="toggle_menu"
        icon-left="bars"
     >
        {{ $t(space_name) }}
     </b-button>
    </div>
  `,
  prototype: {
    computed: {
        space_name () {
          return this.$store.state.global.space_name;
        },
    },
    methods: {
      toggle_menu () {
        if (this.$route.name == 'space_menus') {
          this.$router.push(this.$store.state.global.previous_route);
        } else {
          this.$store.commit('UPDATE_PREVIOUS_ROUTE', {route: this.$route});
          this.$router.push({name: 'space_menus'});
        }
      }
    }
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

defineComponent('furet-ui-space-menus', {
  template: `
    <div class="container">
      <h1 class="subtitle">{{$t('components.spaces.title')}}</h1>
      <b-field>
        <b-input 
          v-model="searchText"
          v-bind:placeholder="this.$i18n.t('components.spaces.search')"
          icon="search"
          rounded
        >
        </b-input>
      </b-field>
      <section class="section">
        <div class="columns is-multiline">
          <div 
            v-for="menu in space_menus" 
            v-bind:key="menu.code"
            class="column is-one-quarter-desktop is-half-tablet is-12-mobile"
          >
            <div class="box" v-on:click="selectMenu(menu)">
              <article class="media">
                <figure class="media-left">
                  <p class="image is-64x64">
                    <b-icon
                      v-bind:icon="menu.icon.code"
                      size="is-large"
                      v-bind:type="menu.icon.type">
                    </b-icon>
                  </p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>{{ $t(menu.label) }}</strong>
                      <br>
                      {{ $t(menu.description) }}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  prototype: {
    data () {
        return {
            searchText: '',
        }
    },
    computed: {
        space_menus () {
          const menus = this.$store.state.global.space_menus;
          if (! this.searchText) return menus;
          return _.filter(
              menus,
              (menu) => {
                  if (menu.label.search(this.searchText) >= 0) return true;
                  if (menu.description.search(this.searchText) >= 0) return true;
                  return false;
              }
          );
        }
    },
    methods: {
      selectMenu (menu) {
        this.$router.push(menu.path);
        this.$store.commit("ClearBreadcrumb");
        this.$store.commit("CLEAR_CHANGE");
      }
    },
    mounted() {
      axios.get(
        'furet-ui/spaces').then((result) => {
          this.$dispatchAll(result.data);
        })
        .catch(() => {
          // console.error(error);
        });
    }
  },
});

defineComponent('furet-ui-space-menu', {
    template: `
      <ul class="menu-list">
        <b-loading v-bind:active.sync="isLoading"></b-loading>
        <li v-for="menu in menus">
            <a v-on:click="onClickMenu(menu)"
               v-bind:class="[menu.id == menuId ? 'is-active' : '']"
            >
              <span v-if="menu.label">
                  {{ $t(menu.label) }}
              </span>
            </a>
            <furet-ui-space-menu
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
              <furet-ui-space-menu 
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
          <div class="level-right">
            <div class="level-item">
              <a class="button" 
                v-on:click="isOpenRight = !isOpenRight" v-if="right_menus.length > 0">
                  <i class="fa fa-bars fa-2x" aria-hidden="true"></i>
              </a>
            </div>
          </diV>
        </nav>
        <router-view v-bind:key="$route.fullPath"></router-view>
      </div>
      <div v-if="isOpenRight && right_menus.length > 0" class="column is-one-quarter is-half-mobile">
          <aside class="menu" v-bind:style="{padding: '5px'}">
              <furet-ui-space-menu 
                  v-bind:menus="right_menus" 
                  v-bind:menuId="menuId" 
                  v-bind:spaceId="spaceId"
              />
          </aside>
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
      isOpenRight: {
        get () {
          return this.$store.state.global.isOpenRight;
        },
        set (newvalue) {
          this.$store.commit('OPEN_RIGHT_MENU', newvalue);
        },
      },
      left_menus () {
        return this.$store.state.global.left_menus;
      },
      right_menus () {
        return this.$store.state.global.right_menus;
      },
    },
    mounted() {
      axios.get(`furet-ui/space/${this.code}`).then((result) => {
        this.$dispatchAll(result.data);
      });
    }
  },
});
