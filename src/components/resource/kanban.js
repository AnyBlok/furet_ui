// import axios from 'axios';
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
      v-bind:draganddrop="resource.draganddrop"
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
    inject: ['getEntry', 'getNewEntries', 'updateChangeState'],
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
          const action = {
            model: this.resource.model,
            pk: e.added.element.pks,
            uuid: e.added.element.uuid,
            fieldname: this.resource.field_identity,
            value: header.value,
          }
          this.updateChangeState(action);
          const action2 = {
            model: this.resource.model,
            pk: e.added.element.pks,
            uuid: e.added.element.uuid,
            fieldname: this.resource.field_order,
            value: e.added.newIndex,
          }
          this.updateChangeState(action2);
          this.save(e.added.element.pks, e.added.element.uuid);
        } else if (e.moved !== undefined) {
          const action2 = {
            model: this.resource.model,
            pk: e.moved.element.pks,
            uuid: e.moved.element.uuid,
            fieldname: this.resource.field_order,
            value: e.moved.newIndex,
          }
          this.updateChangeState(action2);
          this.save(e.moved.element.pks, e.moved.element.uuid);
        }
      },
      save (pks, uuid) {
        const model = this.resource.model;
        if (uuid) {
          this.$emit('create-data', {model, uuid})
        } else {
          this.$emit('update-data', {
            model, pks: Object.assign({}, pks),
          })
        }
      },
      getBreadcrumbInfo() {
        return {label: this.$t(this.resource.title), icon: "columns"};
      },
      refresh() {
        this.$refs.kanban.loadAsyncData();
      },
      goToPage(card, options) {
        const data = card.data;
        if(data.__change_state !== "delete") this.$emit('go-to-page', data, options);
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
