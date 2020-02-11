import moment from 'moment';
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
        return `${process.env.VUE_APP_API_REST_URL}${path}`;
      },
    },
  },
});

defineComponent('date-display', {
  prototype: {
    methods: {
      formatDate(date) {
        if (date) {
          moment.locale(document.documentElement.lang);
          return moment(date).format('LLL');
        }
        return '';
      },
    },
  },
});
