import axios from 'axios';
import _ from 'underscore';
import { v1 as uuidv1 } from 'uuid';
import { resources } from './resources';
import { defineComponent } from '../factory';


defineComponent('furet-ui-resource-form', {
  template : `
    <section>
      <b-loading v-bind:active.sync="loading"></b-loading>
      {{ resource.tabs }}
      <furet-ui-header-page
        name="furet-ui-page"
        v-bind:title="resource.title"
        v-bind:can_go_to_new="readonly && manager.can_create"
        v-bind:can_modify="readonly && manager.can_update"
        v-bind:can_delete="readonly && manager.can_delete"
        v-bind:can_save="!readonly"
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
        <keep-alive>
          <component 
            v-bind:is="form_card_header_template" 
            v-bind:resource="resource"
            v-bind:data="data"
          />
        </keep-alive>
        </template>
        <template slot="aftertitle" slot-scope="props">
          <slot name="aftertitle" v-bind:data="props.data" />
        </template>
        <template slot="head_actions" slot-scope="props">
          <slot name="head_actions" v-bind:data="props.data" />
        </template>
        <template slot="states" slot-scope="props">
          <slot name="states" v-bind:data="props.data" />
        </template>
      </furet-ui-header-page>
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
  extend: ['furet-ui-resource'],
  prototype: {
    props: ['manager'],
    data() {
      return {
        loading: false,
        errors: [],
        readonly: true,  // RO, RW
        pks: {},
        uuid: null,
        selectors: {},
        tabs: {},
        templates: {},
      };
    },
    computed: {
      data () {
        if (this.uuid) {
          return this.$store.getters.get_new_entry(this.resource.model, this.uuid)
        } else if (this.pks) {
          return this.$store.getters.get_entry(this.resource.model, this.pks)
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
      updateQueryString (query) {
        this.$emit('update-query-string', query);
      },
      goToList () {
        this.$emit('go-to-list');
      },
      goToNew () {
        this.updateQueryString({mode: 'form'})
      },
      goToEdit () {
        this.readonly = false;
      },
      goToPage () {
        this.$emit('clear-change', {pks: this.pks, uuid: this.uuid})
        if (this.uuid) this.goToList();
        else this.readonly = true;
      },
      deleteEntry () {
        this.$emit('delete-data', {
          model: this.resource.model,
          pks: Object.assign({}, this.pks),
        })
      },
      save () {
        if (this.uuid) {
          this.$emit('create-data', {
            model: this.resource.model,
            uuid: this.uuid,
          })
        } else {
          this.$emit('update-data', {
            model: this.resource.model,
            pks: Object.assign({}, this.pks),
          })
        }
      },
      loadAsyncData() {
        // this.loading = true;
        const params = {
          model: this.resource.model,
          fields: this.resource.fields.toString(),
        };
        _.each(_.keys(this.pks), pk => {
            params[`filter[${pk}][eq]`] = this.pks[pk];
        })
        axios.get('/furet-ui/crud', { params })
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
            this.pks = JSON.parse(this.manager.query.pks)
            this.loadAsyncData();
          } else {
            // new case
            this.readonly = false;
            this.uuid = uuidv1();
          }
        }
      },
      isReadonly () {
        return this.readonly
      },
    },
    provide: function () {
      return {
        partIsReadonly: this.isReadonly
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
