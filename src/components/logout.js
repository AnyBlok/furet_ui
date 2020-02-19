import axios from 'axios';
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
        axios.post('/furet-ui/logout')
          .then((result) => {
            this.$dispatchAll(result.data);
          })
      },
    },
  },
});
