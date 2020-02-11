import { defineComponent } from './factory';

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
        this.$store.commit('LOGIN', { userName: this.$t('components.logout.appbar.administrator') });
        if (this.$route.query.redirect !== undefined) this.$router.push(this.$route.query.redirect);
        else this.$router.push('/');
      },
    },
  },
});
