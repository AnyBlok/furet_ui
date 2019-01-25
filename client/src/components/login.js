import { defineComponent } from './factory';

defineComponent('furet-ui-appbar-user-menu-login', {
  template: `
    <span class="navbar-item">
      <router-link class="button is-fullwidth is-primary is-inverted" to="/login">
        {{ $t('components.login.appbar') }}
      </router-link>
    </span>
  `,
});

defineComponent('login', {
  template: `
    <section class="section">
      <div class="container has-text-centered">
       <div class="columns is-mobile">
         <div class="column is-half is-offset-one-quarter">
           <a class="button is-primary is-fullwidth" v-on:click="logIn">
             {{ $t('components.login.button') }}
           </a>
         </div>
       </div>
      </div>
    </section>
  `,
  prototype: {
    methods: {
      logIn() {
        this.$notify({
          title: 'Your are logged',
          text: 'Welcome my feret !!!',
          duration: 5000,
        });
        this.$store.commit('UPDATE_MENUS', {
          user: [
            {
              name: 'user',
              component: 'furet-ui-appbar-user-dropmenu',
            },
          ],
        });
        this.$store.commit('LOGIN');
        if (this.$route.query.redirect !== undefined) this.$router.push(this.$route.query.redirect);
        else this.$router.push('/');
      },
    },
  },
});
