import { defineComponent } from './factory';

defineComponent('furet-ui-appbar-user-dropmenu', {
  template: `
    <div class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link">
        {{ userName }}
      </a>
      <div class="navbar-dropdown">
        <div class="navbar-item">
         <a v-on:click="logOut" class="button is-primary is-inverted is-fullwidth">
           {{ $t('components.logout.button') }}
         </a>
        </div>
        <hr class="navbar-divider">
        <div class="navbar-item">
         <a class="button is-primary is-inverted is-fullwidth">
           <router-link to="/about">{{ $t('components.logout.appbar.about') }}</router-link>
         </a>
        </div>
      </div>
    </div>
  `,
  prototype: {
    computed: {
      userName() {
        return this.$store.state.global.userName;
      },
    },
    methods: {
      logOut() {
        this.$store.commit('UPDATE_MENUS', {
          user: [
            {
              name: 'login',
              component: 'furet-ui-appbar-head-router-link-button',
              props: { to: '/login', label: this.$t('components.login.appbar') },
            },
          ],
        });
        this.$store.commit('LOGOUT');
        this.$router.push('/');
      },
    },
  },
});
