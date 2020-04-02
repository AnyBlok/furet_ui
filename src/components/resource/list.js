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
    inject: ['getEntry', 'getNewEntry'],
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
      getBreadcrumbInfo () {
        return {label: this.$t(this.resource.title), icon: "list"}
      },
      api_formater (data) {
        this.$dispatchAll(data.data);
        const res = [];
        if (this.manager.x2m_pks) {
          this.manager.x2m_pks.forEach(pk => {
            if (pk.__x2m_state === 'DELETED') { 
             // do nothing
            } else if (pk.__x2m_state === 'ADDED') { 
              res.push(this.getNewEntry(this.resource.model, pk.uuid))
            } else if (pk.__x2m_state === 'UPDATED') { 
              const pk2 = Object.assign({}, pk)
              delete pk2['__x2m_state']
              res.push(this.getEntry(this.resource.model, pk2))
            } else {
              res.push(this.getEntry(this.resource.model, pk))
            }
          });
        } else {
          data.pks.forEach(pk => {
            res.push(this.getEntry(this.resource.model, pk))
          });
        }
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
