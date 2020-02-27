import { resources } from './resources';
import { defineComponent } from '../factory';


defineComponent('furet-ui-resource-list', {
  template : `
    <furet-ui-list
      v-bind:title="$t(resource.title)"
      v-bind:default_filters="resource.filters || []"
      v-bind:default_tags="resource.tags || []"
      v-bind:perpage="resource.perpage"
      rest_api_url="/furet-ui/read"
      v-bind:rest_api_params="api_params"

      v-bind:rest_api_formater="api_formater"
      v-bind:query="manager.query"

      v-on:update-query-string="updateQueryString"
    >
      <template slot-scope="props">
        <b-table-column 
          v-for="header in resource.headers" 
          v-bind:key="header.name"
          v-bind:field="header.name" 
          v-bind:label="$t(header.label)" 
          v-bind:sortable="header.sortable"
          >
            <component 
              v-bind:is="header.component" 
              v-bind:config="header"
              v-bind:resource="resource"
              v-bind:data="props.row" />
        </b-table-column>
      </template>
    </furet-ui-list>
  `,
  prototype: {
    props: ['id', 'manager'],
    data () {
      return {
        data: [],
      };
    },
    computed: {
      resource () {
        return this.$store.state.global.resources[this.id];
      },
      api_params () {
        return {
          model: this.resource.model,
          fields: this.resource.fields.toString(),
        }
      },
    },
    methods: {
      api_formater (data) {
        this.$dispatchAll(data.data);
        const res = [];
        data.pks.forEach(pk => {
            res.push(this.$store.getters.get_entry(this.resource.model, pk))
        });
        return res;
      },
      updateQueryString (query) {
        this.$emit('update-query-string', query);
      },
    },
  },
});
resources.list = 'furet-ui-resource-list';
