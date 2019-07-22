import { defineComponent } from './factory';

defineComponent('app', {
  template: `
    <div id="furet-ui-app">
      <furet-ui-appbar />
      <notifications />
      <router-view></router-view>
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
        <div class="container">
          <div class="navbar-brand">
            <furet-ui-appbar-header-brand />
            <a 
              role="button" 
              v-bind:class="['navbar-burger', 'burger', isOpen ? 'is-active' : '']" 
              aria-label="menu" 
              aria-expanded="false" 
              data-target="navbarUserMenu" 
              v-on:click="isOpen = !isOpen"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div id="navbarUserMenu" v-bind:class="['navbar-menu', isOpen ? 'is-active' : '']">
            <furet-ui-appbar-spaces-menu />
            <furet-ui-appbar-user-menu />
          </div>
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

defineComponent('furet-ui-appbar-header-brand', {
  template: `
    <img class="image is-64x64" v-bind:src="logo" alt="Logo">
  `,
  extend: ['mixin-logo'],
});

defineComponent('furet-ui-appbar-body', {
  template: `
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          Furet UI
        </h1>
        <p class="subtitle">
          Web Client for any backend serveur
        </p>
      </div>
    </div>
  `,
});

defineComponent('furet-ui-appbar-footer', {
  template: `
    <div class="hero-foot" v-if="hasSpaceMenus">
      <furet-ui-appbar-space-menus />
    </div>
  `,
  prototype: {
    computed: {
      hasSpaceMenus() {
        return this.$store.state.menus.spaceMenus.length !== 0;
      },
    },
  },
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
      return createElement('div', { class: 'navbar-start' }, menus);
    },
    computed: {
      menus() {
        return this.$store.state.menus.spaces;
      },
    },
  },
});

defineComponent('furet-ui-appbar-space-menus', {
  prototype: {
    render(createElement) {
      const menus = [];
      this.menus.forEach((menu) => {
        menus.push(createElement('li', [
          createElement(
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
            [menu.label]),
        ]));
      });
      return createElement('nav', { class: 'tabs is-boxed' }, [
        createElement('div', { class: 'container' }, [
          createElement('ul', [menus]),
        ]),
      ]);
    },
    computed: {
      menus() {
        return this.$store.state.menus.spaceMenus;
      },
    },
  },
});

defineComponent('furet-ui-appbar-foot-router-link', {
  template: `
    <a v-on:click="goTo">
      {{ format_label(label) }}
    </a>
  `,
  extend: ['furet-ui-appbar-router-link-goto'],
});

defineComponent('furet-ui-appbar-foot-router-link-button', {
  template: `
    <a class="button is-primary is-inverted" v-on:click="goTo">
      <span class="icon" v-if="icon">
        <b-icon v-bind:icon="icon" />
      </span>
      <span>{{ format_label(label) }}</span>
    </a>
  `,
  extend: ['furet-ui-appbar-router-link-goto'],
  prototype: {
    props: ['icon'],
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
