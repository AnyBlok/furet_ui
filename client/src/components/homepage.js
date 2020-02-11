import { defineComponent } from './factory';

defineComponent('homepage', {
  template: `
    <div class="container has-text-centered">
      <h1 class="title">Welcome in Furet UI</h1>
      <div class="column is-half is-offset-one-quarter">
        <img class="image" v-bind:src="logo" alt="Logo">
      </div>
    </div>
  `,
  extend: ['mixin-logo'],
});
