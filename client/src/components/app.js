import { defineComponent } from './factory';

defineComponent('app', {
  template: `
    <div id="furet-ui-app">
      <furet-ui-appbar />
      <notifications></notifications>
      <router-view></router-view>
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
      <nav class="nav">
        <div class="container">
         <div class="navbar-brand">
           <furet-ui-appbar-header-brand />
           <span class="navbar-burger burger" data-target="navbarMenuHeroA">
             <span></span>
             <span></span>
             <span></span>
           </span>
         </div>
         <div id="navbarMenuHeroA" class="navbar-menu">
           <furet-ui-appbar-user-menu />
         </div>
        </div>
      </nav>
    </div>
  `,
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
          {{ title }}
        </h1>
      </div>
    </div>
  `,
  prototype: {
    computed: {
      title() {
        return this.$store.state.global.title;
      },
    },
  },
});

defineComponent('furet-ui-appbar-footer', {
  template: `
    <div class="hero-foot">
      <furet-ui-appbar-space-menu />
    </div>
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
            props: menu.props,
          },
          [menu.label]));
      });
      return createElement('div', { class: 'navbar-end' }, menus);
    },
    computed: {
      menus() {
        return this.$store.state.userMenu.menus;
      },
    },
  },
});
