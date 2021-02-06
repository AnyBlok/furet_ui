import axios from 'axios';
import { resources } from './resources';
import { defineComponent } from '../factory';


defineComponent('furet-ui-resource-kanban', {
  template : `
    <furet-ui-kanban
      ref="kanban"
      v-bind:title="resource.title"
      v-bind:default_filters="resource.filters || []"
      v-bind:default_tags="resource.tags || []"
      v-bind:default_header_component_name="manager.multi_header_component_name || null"
      v-bind:can_go_to_new="manager.can_create"
      v-bind:go_to_new_choices="manager.create_choices"

      v-bind:headers="headers"
      v-bind:field_identity="resource.field_identity"
      v-bind:field_order="resource.field_order"
      v-bind:pks="resource.pks"

      v-bind:rest_api_url="rest_api_url"
      v-bind:rest_api_params="api_params"

      v-bind:rest_api_formater="api_formater"
      v-bind:query="manager.query"
      v-bind:readonly="manager.readonly"
      v-bind:pagination_size="manager.pagination_size"

      v-on:update-thumbnail="updateThumbnail"
      v-on:update-query-string="updateQueryString"
      v-on:go-to-new="goToNew"
      v-on:go-to-page="goToPage"
    >
      <template slot="actions" slot-scope="props">
        <furet-ui-list-button 
          v-for="button in resource.buttons" 
          v-bind:key="button.call"
          v-bind:resource="resource"
          v-bind:data="props.data"
          v-bind:config="button" />
      </template>
      <template slot-scope="props">
        <div class="card">
          <component 
            v-bind:is="form_card_header_template" 
            v-bind:resource="resource"
            v-bind:data="props.data"
          />
          <div class="card-content">
            <component 
              v-bind:is="form_card_body_template" 
              v-bind:resource="resource"
              v-bind:data="props.data"
              v-bind:key="'body_' + resource.id"
            />
          </div>
          <component 
            v-bind:is="form_card_footer_template" 
            v-bind:resource="resource"
            v-bind:data="props.data"
            v-bind:key="'footer_' + resource.id"
          />
        </div>
      </template>
    </furet-ui-kanban>
  `,
  extend: ['furet-ui-resource-with-ssr', 'furet-ui-resource-with-search'],
  prototype: {
    inject: ['getEntry', 'getNewEntries'],
    computed: {
      headers () {
        const headers = [];
        if ((this.resource.headers || []).length !== 0) headers.push(...this.resource.headers);
        return headers;
      },
      api_params () {
        const fields = Object.assign([], this.resource.fields)
        fields.push(this.resource.field_identity)
        fields.push(this.resource.field_order)
        return {
          'context[model]': this.resource.model,
          'context[fields]': fields.toString(),
        }
      }
    },
    methods: {
      updateThumbnail (header, e) {
        if (e.added !== undefined) {
          this.server_call('change_column', {
            pks: e.added.element.pks,
            identity: header.value,
            index: e.added.newIndex,
          });
        } else if (e.moved !== undefined) {
          this.server_call('change_position', {
            pks: e.moved.element.pks,
            fromIndex: e.moved.oldIndex,
            toIndex: e.moved.newIndex,
          });
        }
      },
      server_call (method, data) {
        this.$refs.kanban.errors = [];
        this.$refs.kanban.loading = true;
        const params = {
          pks: {id: this.resource.id},
          data,
        };
        axios.post(`/furet-ui/resource/${this.resource.id}/model/Model.FuretUI.Resource.Kanban/call/${method}`, params)
          .then((response) => {
            this.$refs.kanban.loading = false;
            if (response.data.length) {
                response.pks = this.received_pks
                this.api_formater(this.$refs.kanban, response)
            } else {
              this.$refs.kanban.loadAsyncData()
            }
          })
          .catch((error) => {
            this.$refs.kanban.loading = false;
            this.$refs.kanban.errors = error.response.data.errors;
          });
      },
      getBreadcrumbInfo() {
        return {label: this.$t(this.resource.title), icon: "columns"};
      },
      refresh() {
        this.$refs.kanban.loadAsyncData();
      },
    },
    provide: function () {
      return {
        partIsReadonly: true,
      }
    },
  },
});
resources.kanban = 'furet-ui-resource-kanban';
