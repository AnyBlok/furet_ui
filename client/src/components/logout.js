import { defineComponent } from './factory';

defineComponent('furet-ui-appbar-user-dropmenu', {
  template: `
    <div class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link">
        {{ $t('components.logout.appbar.administrator') }}
      </a>
      <div class="navbar-dropdown">
        <div class="navbar-item">
         <a v-on:click="logOut">
           {{ $t('components.logout.button') }}
         </a>
        </div>
        <hr class="navbar-divider">
        <div class="navbar-item">
         <router-link to="/about">{{ $t('components.logout.appbar.about') }}</router-link>
        </div>
      </div>
    </div>
  `,
  prototype: {
    methods: {
      logOut() {
        this.$store.commit('UPDATE_MENUS', {
          user: [
            {
              name: 'login',
              component: 'furet-ui-appbar-user-menu-login',
            },
          ],
        });
        this.$store.commit('LOGOUT');
        this.$router.push('/');
      },
    },
  },
});
