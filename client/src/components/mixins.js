import { defineComponent } from './factory';

defineComponent('mixin-logo', {
  prototype: {
    computed: {
      logo() {
        return `${process.env.API_REST_URL}/furet-ui/logo`;
      },
    },
  },
});

