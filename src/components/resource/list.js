import _ from 'underscore';
import { resources } from './resources';
import { defineComponent } from '../factory';


defineComponent('furet-ui-resource-list', {
  template : `
    <furet-ui-list
      v-bind:title="$t(resource.title)"
      v-bind:default_filters="resource.filters || []"
      v-bind:default_tags="resource.tags || []"
      v-bind:perpage="resource.perpage"
      v-bind:can_go_to_new="manager.can_create"
      rest_api_url="/furet-ui/crud"
      v-bind:rest_api_params="api_params"

      v-bind:rest_api_formater="api_formater"
      v-bind:query="manager.query"

      v-on:update-query-string="updateQueryString"
      v-on:go-to-new="goToNew"
      v-on:go-to-page="goToPage"
    >
      <template slot="hidden_field">
        <section class="section" v-if="hidden_field.length">
          <b-field grouped group-multiline>
            <div 
              v-for="header in hidden_field"
              v-bind:key="header.name"
              class="control"
            >
              <b-checkbox 
                v-bind:value="!header.hidden"
                v-on:input="toggleHidden(header.name)"
              > 
                  {{ $t(header.label) }}
              </b-checkbox>
            </div>
          </b-field>
        </section>
      </template>
      <template slot-scope="props">
        <b-table-column 
          v-for="header in resource.headers" 
          v-bind:key="header.name"
          v-bind:field="header.name" 
          v-bind:label="$t(header.label)" 
          v-bind:sortable="header.sortable"
          v-bind:visible="!header.hidden"
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
      hidden_field () {
        return _.filter(this.resource.headers, header => header.can_be_hidden);
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
      toggleHidden (field) {
        this.$store.commit('UPDATE_RESOURCE_TOGGLE_HIDDEN', {id: this.id, field})
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
