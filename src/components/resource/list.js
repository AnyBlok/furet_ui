import { resources } from './resources';
import { defineComponent } from '../factory';


defineComponent('furet-ui-resource-list', {
  template : `
    <div>
      <furet-ui-page-errors v-bind:errors="errors"/>
      <furet-ui-list
        v-bind:title="resource.title"
        v-bind:data="data"

        v-on:update-query-string="updateQueryString"
      >
      </furet-ui-list>
    </div>
  `,
  prototype: {
    props: ['id', 'manager'],
    computed: {
      resource () {
        console.log( this.$store.state.global.resources[this.id]);
        return this.$store.state.global.resources[this.id];
      },
    },
    methods: {
      updateQueryString (query) {
        this.$emit('update-query-string', query);
      },
      loadAsyncData() {
        this.loading = true;
        const params = {
          offset: (this.page - 1) * this.perPage,
          limit: this.perPage,
        };
        params[`order_by[${this.sortOrder}]`] = this.sortField;
        _.each(this.filters, (filter) => {
          if (filter.values.length) {
            const value = (filter.op.startsWith('or-') || filter.op === 'in') ? filter.values.toString() : filter.values[0];
            const preop = filter.mode === 'exclude' ? '~' : '';
            params[`${preop}filter[${filter.key}][${filter.op}]`] = value;
          }
        });
        const tags = [];
        _.each(this.tags, (tag) => {
          if (tag.selected) tags.push(tag.key);
        });
        if (tags.length) params.tags = tags.toString();

        axios.get(this.rest_api_url, { params })
          .then((response) => {
            this.data = response.data || [];
            this.total = response.headers['x-total-records'] || response.data.length;
            this.loading = false;
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
            this.loading = false;
          });
      },
    },
    mounted() {
    },
  },
});
resources.list = 'furet-ui-resource-list';
