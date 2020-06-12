import  {loginPages}  from './login-pages';
import { defineComponent } from '../factory';

defineComponent('furet-ui-waiting-login-page', {
  template: `
    <div class="container"> 
        <strong>Waiting loading component</strong>
    </div>
  `,
});

defineComponent('furet-ui-login-page-not-found', {
  template: `
    <div class="container"> 
        <strong>Login page '{{ name }}' not found</strong>
    </div>
  `,
  prototype: {
    props: ['name'],
  },
});

defineComponent('furet-ui-login', {
  template: `
    <component 
      v-bind:is="loginPageComponent" 
      v-bind:name="loginPageComponentName" 
    />`,
  prototype: {
    computed: {
      loginPageComponentName () {
        return this.$store.state.global.loginPage;
      },
      loginPageComponent () {
        const loginPage = this.loginPageComponentName;
        if (loginPage === undefined) return 'furet-ui-waiting-resource';
        if (loginPages[loginPage] !== undefined) return loginPages[loginPage];
        return 'furet-ui-login-page-not-found';
      },
    },
  },
});
