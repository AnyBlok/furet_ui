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
  extend: ['furet-ui-resource', 'i18n-translate'],
  prototype: {
    props: ['id', 'manager'],
    inject: ['getEntry', 'getNewEntries'],
    data () {
      return {
        data: [],
        templates: {},
      };
    },
    computed: {
      rest_api_url () {
        return `/furet-ui/resource/${this.id}/crud`;
      },
      api_params () {
        return {
          'context[model]': this.resource.model,
          'context[fields]': this.resource.fields.toString(),
        }
      },
      form_card_header_template () {
        return this.form_card('header_template');
      },
      form_card_body_template () {
        return this.form_card('body_template');
      },
      form_card_footer_template () {
        return this.form_card('footer_template');
      },
    },
    methods: {
      form_card (part) {
        if (this.templates[part] !== undefined) return this.templates[part];
        const template = {
          template: '<div></div>',
          name: `${part}_${this.resource.id}`,
          props: ['data', 'resource'],
        }
        if (this.resource[part]) {
            template.template = this.resource[part];
            this.templates[part] = template;
        }
        return template;
      },
      getBreadcrumbInfo() {
        return {label: this.$t(this.resource.title), icon: "th"};
      },
      revert_modification(row){
        this.$emit("revert-data", row)
      },
      api_formater (obj, data) {
        this.$dispatchAll(data.data);
        let res = [];
        if(data.pks === undefined) data.pks = [];
        if(data.total === undefined) data.total = 0;

        data.pks.forEach(pk => {
          res.push(this.getEntry(this.resource.model, pk))
        });
        const news = this.getNewEntries(this.resource.model);
        const total = data.total + news.length;
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
      updateQueryString (query) {
        this.$emit('update-query-string', query);
      },
      goToNew(choice) {
        this.$emit('go-to-new', choice);
      },
      goToPage(row, options) {
        if(row.__change_state !== "delete") this.$emit('go-to-page', row, options);
      },
      refresh() {
        this.$refs.thumbnail.loadAsyncData();
      },
    },
    provide: function () {
      return {
        partIsReadonly: true,
        // registryRefreshCallback: this.registryRefreshCallback,
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
        if (this.config.call)
          return {
            url: `/furet-ui/resource/${this.resource.id}/model/${this.resource.model}/call/${this.config.call}`,
            params: {pks: this.resource.pks},
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
        this.$parent.$parent.errors = [];
        this.$parent.$parent.loading = true;
        const {url, params} = this.get_call_information();
        axios.post(url, params)
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
