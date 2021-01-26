import { resources } from './resources';
import { defineComponent } from '../factory';
import axios from 'axios';


defineComponent('furet-ui-resource-thumbnail', {
  template : `
    <furet-ui-thumbnail
      ref="thumbnail"
      v-bind:title="resource.title"
      v-bind:default_filters="resource.filters || []"
      v-bind:default_tags="resource.tags || []"
      v-bind:default_header_component_name="manager.multi_header_component_name || null"
      v-bind:perpage="resource.perpage"
      v-bind:can_go_to_new="manager.can_create"
      v-bind:go_to_new_choices="manager.create_choices"
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
    </furet-ui-thumbnail>
  `,
  extend: ['furet-ui-resource-with-ssr', 'furet-ui-resource-with-search'],
  prototype: {
    inject: ['getEntry', 'getNewEntries'],
    methods: {
      getBreadcrumbInfo() {
        return {label: this.$t(this.resource.title), icon: "th"};
      },
      refresh() {
        this.$refs.thumbnail.loadAsyncData();
      },
    },
    provide: function () {
      return {
        partIsReadonly: true,
      }
    },
  },
});
resources.thumbnail = 'furet-ui-resource-thumbnail';

defineComponent('furet-ui-thumbnail-footer-button', {
  template: `
    <a v-bind:class="config.class" v-on:click="server_call">
      <span class="icon" v-if="config.icon">
        <b-icon v-bind:icon="config.icon" />
      </span>
      <span>{{ translate(config.label) }}</span>
    </a>
  `,
  extend: ['i18n-translate'],
  prototype: {
    props: ['resource', 'data', 'config'],
    methods: {
      get_call_information () {
        if (this.config.call) { 
          const pks = {}
          this.resource.pks.forEach(pk => {
              pks[pk] = this.data[pk]
          })
          return {
            url: `/furet-ui/resource/${this.resource.id}/model/${this.resource.model}/call/${this.config.call}`,
            params: {pks},
          }
        }
        if (this.config['open-resource']) {
          return {
            url: `/furet-ui/open/resource/${this.config['open-resource']}`,
            params: {
              route: this.$route.name,
              params: this.$route.params,
              resource_type: this.config['resource-type'],
            }
          }
        }
      },
      server_call () {
        this.$parent.$parent.$parent.errors = [];
        this.$parent.$parent.$parent.loading = true;
        const {url, params} = this.get_call_information();
        axios.post(url, params)
          .then((response) => {
            this.$parent.$parent.$parent.loading = false;
            if (response.data.length) {
              this.$dispatchAll(response.data)
            } else {
              this.$parent.$parent.$parent.loadAsyncData()
            }
          })
          .catch((error) => {
            this.$parent.$parent.$parent.loading = false;
            this.$parent.$parent.$parent.errors = error.response.data.errors;
          });
      },
    },
  },
})
