import axios from 'axios';
import _ from 'underscore';
import { v1 as uuidv1 } from 'uuid';
import { resources } from './resources';
import { defineComponent } from '../factory';
import { safe_eval } from '../fields/common';


defineComponent('furet-ui-resource-form', {
  template : `
    <section>
      <b-loading v-bind:active.sync="loading"></b-loading>
      <furet-ui-page-errors v-bind:errors="errors"/>
      <component
        v-bind:is="headerComponentName"
        name="furet-ui-page"
        v-bind:title="resource.title"
        v-bind:can_go_to_new="readonly && manager.can_create"
        v-bind:go_to_new_choices="manager.create_choices"
        v-bind:can_modify="readonly && manager.can_update"
        v-bind:can_delete="readonly && manager.can_delete"
        v-bind:show_save="!readonly"
        v-bind:can_save="manager.children_is_modified"
        v-bind:readonly="manager.readonly"

        v-on:go-to-list="goToList"
        v-on:go-to-edit="goToEdit"
        v-on:go-to-new="goToNew"
        v-on:go-to-page="goToPage"
        v-on:delete-entry="deleteEntry"
        v-on:save="save"

        v-bind:data="data"
      >
        <template slot="header" v-if="resource.header_template">
          <component 
            v-bind:is="form_card_header_template" 
            v-bind:resource="resource"
            v-bind:data="data"
          />
        </template>
      </component>
      <div class="section">
        <component 
          v-bind:is="form_card_body_template" 
          v-bind:resource="resource"
          v-bind:data="data"
          v-bind:key="'body_' + resource.id"
        />
      </div>
      <component 
        v-bind:is="form_card_footer_template" 
        v-bind:resource="resource"
        v-bind:data="data"
        v-bind:key="'footer_' + resource.id"
      />
    </section>
  `,
  extend: ['furet-ui-resource-with-ssr'],
  prototype: {
    inject: ['getEntry', 'getNewEntry', 'updateChangeState'],
    data() {
      return {
        loading: false,
        errors: [],
        readonly: true,  // RO, RW
        pks: {},
        uuid: null,
        selectors: {},
        tabs: {},
        refreshCallbacks: [],
        headerComponentName: this.manager.page_header_component_name || 'furet-ui-header-page',
      };
    },
    computed: {
      data () {
        if (this.uuid) {
          return this.getNewEntry(this.resource.model, this.uuid);
        } else if (this.pks) {
          return this.getEntry(this.resource.model, this.pks);
        }
      },
      resource () {
        return Object.assign(
          {
              readonly: this.readonly,
              pks: this.pks,
              uuid: this.uuid,
              selectors: this.selectors,
              tabs: this.tabs,
          },
          this.$store.state.resource[this.id]
        );
      },
    },
    methods: {
      getBreadcrumbInfo() {
        return {label: this.translate(this.resource.title || ''), icon: "newspaper"};
      },
      goToList () {
        this.uuid = null;
        this.$emit('modify-state', false);
        this.$emit('go-to-list');
      },
      goToNew (choice) {
        this.$emit('modify-state', false);
        const query = {mode: 'form'};
        if (choice !== undefined) {
            query.waiting_value = JSON.stringify(choice.waiting_value);
            query.resource_id = choice.resource_id;
        }
        this.updateQueryString(query);
      },
      goToEdit () {
        this.updateReadOnly(false);
      },
      goToPage () {
        this.$emit('clear-change', {pks: this.pks, uuid: this.uuid})
        this.updateReadOnly(true);
        if (this.uuid) this.goToList();
        this.refresh_fields()
      },
      updateReadOnly (readonly) {
        this.readonly = readonly;
        this.$emit('modify-state', !readonly);
      },
      getDefault() {
        if (this.manager.query.waiting_value !== undefined) {
          _.each(JSON.parse(this.manager.query.waiting_value), (value, fieldname) => {
              this.updateChangeState({
                model: this.resource.model,
                uuid: this.uuid,
                fieldname,
                value
              })
          })
        }
        this.errors = [];
        this.loading = true;
        const params = {data: {uuid: this.uuid}}
        axios.post(`/furet-ui/resource/${this.resource.id}/model/${this.resource.model}/call/default_values`, params)
          .then((response) => {
            this.$dispatchAll(response.data);
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
            this.errors = error.response.data.errors;
          });
      },
      deleteEntry () {
        this.$emit('modify-state', false);
        this.$emit('delete-data', {
          model: this.resource.model,
          pks: Object.assign({}, this.pks),
        })
      },
      save () {
        this.$emit('modify-state', false);
        if (this.uuid) {
          this.$emit('create-data', {
            model: this.resource.model,
            uuid: this.uuid,
          })
          this.uuid = null;
        } else {
          this.$emit('update-data', {
            model: this.resource.model,
            pks: Object.assign({}, this.pks),
          })
        }
      },
      refresh_fields () {
        this.$emit('clear-change', {pks: this.pks, uuid: this.uuid})
        this.updateReadOnly(true);
        this.refreshCallbacks.forEach(callback => {
          callback();
        });
      },
      refresh () {
        this.loadAsyncData();
        this.refresh_fields();
      },
      loadAsyncData() {
        this.loading = true;
        const params = {
          'context[model]': this.resource.model,
          'context[fields]': this.resource.fields.toString(),
        };
        _.each(_.keys(this.pks), pk => {
            params[`filter[${pk}][eq]`] = this.pks[pk];
        })
        this.errors = [];
        axios.get(`/furet-ui/resource/${this.id}/crud`, { params })
          .then((response) => {
            this.$dispatchAll(response.data.data);
            this.loading = false;
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
            this.loading = false;
          });
      },
      parse_query() {
        if (this.manager.query !== undefined) {
          if (this.manager.query.pks) {
            const pks = JSON.parse(this.manager.query.pks);
            if (JSON.stringify(pks) != JSON.stringify(this.pks)) {
              this.pks = pks
              this.uuid = null;
              this.loadAsyncData();
            }
          } else if (this.manager.query.uuid) {
            if (this.uuid != this.manager.query.uuid) {
              // new case
              this.updateReadOnly(false);
              this.uuid = this.manager.query.uuid;
              this.getDefault();
            }
          } else if (this.uuid !== null) {
              // nothing
          } else {
            // new case
            this.updateReadOnly(false);
            this.uuid = uuidv1();
            this.getDefault();
          }
        }
      },
      isReadonly () {
        return this.readonly
      },
      registryRefreshCallback (callback) {
        if (this.refreshCallbacks.indexOf(callback) === -1) {
          this.refreshCallbacks.push(callback)
        }
      },
    },
    provide: function () {
      return {
        partIsReadonly: this.isReadonly,
        registryRefreshCallback: this.registryRefreshCallback,
      }
    },
    watch: {
      manager () {
        this.parse_query();  // query is reactive
      },
    },
    created() {
      this.parse_query()
    },
  },
});
resources.form = 'furet-ui-resource-form';

defineComponent('furet-ui-form-button', {
  template: `
      <button 
        v-bind:disabled="isReadonly" 
        v-bind:class="getClass" 
        v-on:click="server_call"
        v-if="!isHidden"
      >
        <span class="icon" v-if="config.icon">
          <b-icon v-bind:icon="config.icon" />
        </span>
        <span>{{ translate(config.label) }}</span>
      </button>
  `,
  extend: ['furet-ui-helper-mixin', 'i18n-translate'],
  prototype: {
    inject: ['currentResource'],
    computed: {
      getClass () {
        if (this.config.class !== undefined)
          if (this.config.class.length != 0)
              return ['button', ...this.config.class];
        return ['button', 'is-primary', 'is-outlined'];
      },
      isHidden () {
        if (this.currentResource.uuid) return true;
        if (this.config.hidden == undefined) return false;
        return safe_eval(this.config.hidden, this.data || {}, this.resource);
      },
    },
    methods: {
      getIsReadonly () {
        if (!this.resource.readonly) return true; // button is clickable when resource is readonly
        if (!this.partIsReadonly()) return true; // button is clickable when resource is readonly
        const readonlyParams = safe_eval(this.config.readonly, this.data, this.resource);
        return readonlyParams ? true: false;
      },
      server_call () {
        this.currentResource.errors = [];
        this.currentResource.loading = true;
        const params = {pks: this.resource.pks}
        axios.post(`/furet-ui/resource/${this.resource.id}/model/${this.resource.model}/call/${this.config.call}`, params)
          .then((response) => {
            this.currentResource.loading = false;
            if (response.data.length) {
              this.$dispatchAll(response.data)
            } else {
              this.currentResource.loadAsyncData()
            }
          })
          .catch((error) => {
            this.currentResource.loading = false;
            this.currentResource.errors = error.response.data.errors;
          });
      },
    },
  },
})
