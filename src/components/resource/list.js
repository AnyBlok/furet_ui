import _ from 'underscore';
import { resources } from './resources';
import { defineComponent } from '../factory';


defineComponent('furet-ui-resource-list', {
  template : `
    <furet-ui-list
      v-bind:title="resource.title"
      v-bind:default_filters="resource.filters || []"
      v-bind:default_tags="resource.tags || []"
      v-bind:perpage="resource.perpage"
      v-bind:can_go_to_new="manager.can_create"
      rest_api_url="/furet-ui/crud"
      v-bind:rest_api_params="api_params"

      v-bind:rest_api_formater="api_formater"
      v-bind:query="manager.query"
      v-bind:readonly="manager.readonly"

      v-on:update-query-string="updateQueryString"
      v-on:go-to-new="goToNew"
      v-on:go-to-page="goToPage"
    >
      <template slot="hidden_columns">
        <section v-if="hidden_columns.length">
          <b-field grouped group-multiline>
            <div 
              v-for="header in hidden_columns"
              v-bind:key="header.name"
              class="control"
            >
              <b-checkbox 
                v-bind:value="!header.column_column"
                v-on:input="toggleHiddenColumn(header.name)"
              > 
                  {{ header.label }}
              </b-checkbox>
            </div>
          </b-field>
        </section>
      </template>
      <template slot-scope="props">
        <b-table-column 
          v-for="header in resource.headers" 
          v-bind:key="header.name"
          v-bind:field="typeof header.sortable === 'string'? header.sortable : header.name" 
          v-bind:label="header.label" 
          v-bind:sortable="typeof header.sortable === 'string'? true: header.sortable"
          v-bind:visible="!header['hidden-column']"
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
  extend: ['furet-ui-resource'],
  prototype: {
    props: ['id', 'manager'],
    inject: ['getEntry'],
    data () {
      return {
        data: [],
      };
    },
    computed: {
      hidden_columns () {
        return _.filter(this.resource.headers, header => header['column-can-be-hidden']);
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
          res.push(this.getEntry(this.resource.model, pk))
        });
        return res;
      },
      toggleHiddenColumn (field) {
        this.$store.commit('UPDATE_RESOURCE_TOGGLE_HIDDEN_COLUMN', {id: this.id, field})
      },
      updateQueryString (query) {
        this.$emit('update-query-string', query);
      },
      goToNew() {
        this.$emit('go-to-new');
      },
      goToPage(row) {
        this.$emit('go-to-page', row);
      },
    },
  },
});
resources.list = 'furet-ui-resource-list';
