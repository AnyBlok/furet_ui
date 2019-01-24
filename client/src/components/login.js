import { defineComponent } from './factory';

defineComponent('furet-ui-appb-user-menu-login', {
  template: `
    <span class="navbar-item">
      <router-link class="button is-fullwidth is-primary is-inverted" to="/login">Log In</router-link>
    </span>
  `,
});

defineComponent('login', {
  template: `
    <section class="section">
      <div class="columns is-mobile">
        <div class="column is-half is-offset-one-quarter">
          <a class="button is-primary" v-on:click="logIn">
            {{ $t('views.clients.login.button') }}
          </a>
        </div>
      </div>
    </section>
  `,
  prototype: {
    methods: {
      logIn() {
        this.$store.dispatch('ADD_NOTIFICATION', { message: 'Welcome my feret', duration: 5000 });
        this.$store.commit('LOGIN');
        if (this.$route.query.redirect !== undefined) this.$router.push(this.$route.query.redirect);
        else this.$router.push('/');
      },
    },
  },
});
