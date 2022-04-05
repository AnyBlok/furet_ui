import moment from 'moment-timezone';
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
        if (process.env.VUE_APP_API_REST_URL) {
          return `${process.env.VUE_APP_API_REST_URL}${path}`;
        }
        return path
      },
    },
  },
});

defineComponent('date-display', {
  prototype: {
    methods: {
      formatDate(date) {
        if (date) {
          const timezone = this.$store.state.global.userTimeZone;
          moment.locale(document.documentElement.lang);
          return moment(date).tz(timezone).format('LLL');
        }
        return '';
      },
    },
  },
});
