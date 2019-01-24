import { defineComponent } from './factory';

defineComponent('homepage', {
  template: `
    <div class="container has-text-centered">
      <h1 class="title">Welcome in Furet UI</h1>
      <div class="column is-half is-offset-one-quarter">
        <img class="image _s" v-bind:src="logo" alt="Logo">
      </div>
      <router-link to="/ping">Go to Ping</router-link>
    </div>
  `,
  extend: ['mixin-logo'],
});
