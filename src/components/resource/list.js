import _ from 'underscore';
import { resources } from './resources';
import { safe_eval } from '../fields/common';
import { defineComponent } from '../factory';
import axios from 'axios';


defineComponent('furet-ui-resource-list', {
  template : `
    <furet-ui-list
      ref="list"
      v-bind:title="resource.title"
      v-bind:default_filters="resource.filters || []"
      v-bind:default_tags="resource.tags || []"
      v-bind:default_header_component_name="manager.multi_header_component_name || null"
      v-bind:perpage="resource.perpage"
      v-bind:can_go_to_new="manager.can_create"
      v-bind:rest_api_url="rest_api_url"
      v-bind:rest_api_params="api_params"

      v-bind:rest_api_formater="api_formater"
      v-bind:query="manager.query"
      v-bind:readonly="manager.readonly"
      v-bind:pagination_size="manager.pagination_size"

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
      <template slot="actions" slot-scope="props">
        <furet-ui-list-button 
          v-for="button in resource.buttons" 
          v-bind:key="button.call"
          v-bind:resource="resource"
          v-bind:data="props.data"
          v-bind:config="button" />
      </template>
      <template slot-scope="props">
        <b-table-column class="is-action">
          <a class="button is-outlined" v-on:click="revert_modification(props.row)">
            <b-icon icon="redo-alt" size="is-small"/>
          </a>
        </b-table-column>
        <b-table-column 
          v-for="header in resource.headers" 
          class="is-list-cell"
          v-bind:key="header.name"
          v-bind:field="typeof header.sortable === 'string'? header.sortable : header.name" 
          v-bind:label="header.label" 
          v-bind:sortable="typeof header.sortable === 'string'? true: header.sortable"
          v-bind:visible="!safe_eval(header['hidden-column'], props.row)"
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
    inject: ['getEntry', 'getNewEntries'],
    data () {
      return {
        data: [],
      };
    },
    computed: {
      hidden_columns () {
        return _.filter(this.resource.headers, header => header['column-can-be-hidden']);
      },
      rest_api_url () {
        return `/furet-ui/resource/${this.id}/crud`;
      },
      api_params () {
        return {
          'context[model]': this.resource.model,
          'context[fields]': this.resource.fields.toString(),
        }
      }
    },
    methods: {
      safe_eval (hidden, row) {
        const resource = Object.assign({manager: this.manager}, this.resource)
        return safe_eval(hidden, row, resource)
      },
      getBreadcrumbInfo() {
        return {label: this.$t(this.resource.title), icon: "list"};
      },
      revert_modification(row){
        this.$emit("revert-data", row)
      },
      api_formater (obj, data) {
        this.$dispatchAll(data.data);
        let res = [];
        if(data.pks === undefined){
          data.pks = [];
        }
        data.pks.forEach(pk => {
          res.push(this.getEntry(this.resource.model, pk))
        });
        const news = this.getNewEntries(this.resource.model);
        const total = (data.total || 0) + news.length;
        if (res.length < obj.perPage){
          const modulus = data.total % obj.perPage;
          const page_count = Math.floor(data.total / obj.perPage) + 1;
          let start = ((obj.page - page_count) * obj.perPage);
          if(start > 0 ){
            start -= modulus;
          }
          const end = start + obj.perPage - res.length;
          obj.data = res.concat(news.slice(start, end));
        } else {
          obj.data = res;
        }
        data.total = total;
        obj.total = total;

        let created = 0;
        let updated = 0;
        let deleted = 0;
        let linked = 0;
        let unlinked = 0;

        (this.manager.changed_rows || []).forEach(change => {
          switch (change.__x2m_state) {
            case 'ADDED':
              created++;
              break;
            case 'UPDATED':
              updated++;
              break;
            case 'DELETED':
              deleted++;
              break;
            case 'LINKED':
              linked++;
              break;
            case 'UNLINKED':
              unlinked++;
              break;
          }
        })
        obj.number_created = created;
        obj.number_updated = updated;
        obj.number_deleted = deleted;
        obj.number_linked = linked;
        obj.number_unlinked = unlinked;
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
        if(row.__change_state !== "delete") this.$emit('go-to-page', row);
      },
      refresh() {
        this.$refs.list.loadAsyncData();
      },
    },
  },
});
resources.list = 'furet-ui-resource-list';

defineComponent('furet-ui-list-button', {
  template: `
    <a class="button is-primary is-outlined" v-on:click="server_call">
      {{ $t(config.label) }}
    </a>
  `,
  // extend: ['furet-ui-helper-mixin'], waittin readony / readwrite on view
  prototype: {
    props: ['resource', 'data', 'config'],
    methods: {
      server_call () {
        this.$parent.$parent.errors = [];
        this.$parent.$parent.loading = true;
        axios.post(`/furet-ui/resource/${this.resource.id}/model/${this.resource.model}/call/${this.config.call}`, {})
          .then((response) => {
            this.$parent.$parent.loading = false;
            if (response.data.length) {
              this.$dispatchAll(response.data)
            } else {
              this.$parent.$parent.loadAsyncData()
            }
          })
          .catch((error) => {
            this.$parent.$parent.loading = false;
            this.$parent.$parent.errors = error.response.data.errors;
          });
      },
    },
  },
})
