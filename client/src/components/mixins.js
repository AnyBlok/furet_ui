import { defineComponent } from './factory';

defineComponent('mixin-logo', {
  prototype: {
    computed: {
      logo() {
        return this.format_url('/furet-ui/logo');
      },
    },
    methods: {
      format_url(path) {
        return `${process.env.API_REST_URL}${path}`;
      },
    },
  },
});

