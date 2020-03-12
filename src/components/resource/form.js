import axios from 'axios';
import _ from 'underscore';
import { v1 as uuidv1 } from 'uuid';
import { resources } from './resources';
import { defineComponent } from '../factory';


defineComponent('furet-ui-resource-form', {
  template : `
    <section>
      <b-loading v-bind:active.sync="loading"></b-loading>
      <furet-ui-header-page
        name="furet-ui-page"
        v-bind:title="resource.title"
        v-bind:can_go_to_new="readonly && manager.can_create"
        v-bind:can_modify="readonly && manager.can_update"
        v-bind:can_delete="readonly && manager.can_delete"
        v-bind:can_save="!readonly"

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
        <fieldset v-bind:disabled="readonly">
          <component 
            v-bind:is="form_card_body_template" 
            v-bind:resource="resource"
            v-bind:data="data"
          />
        </fieldset>
        <component 
          v-bind:is="form_card_footer_template" 
          v-bind:resource="resource"
          v-bind:data="data"
        />
      </div>
    </section>
  `,
  prototype: {
    props: ['id', 'manager'],
    data() {
      return {
        loading: false,
        errors: [],
        readonly: true,  // RO, RW
        pks: {},
        uuid: null,
        selectors: {},
        tags: {},
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
              tags: this.tags,
          },
          this.$store.state.global.resources[this.id]
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
        if (this.resource[part]) {
          return {
            template: this.resource[part],
            props: ['data', 'resource'],
          };
        }
        return {
            template: '<div></div>'
        };
      },
      updateQueryString (query) {
        this.$emit('update-query-string', query);
      },
      goToList () {
        // use breadcrumb
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
            changes: this.$store.state.data.changes,
          })
        } else {
          this.$emit('update-data', {
            model: this.resource.model,
            pks: Object.assign({}, this.pks),
            changes: this.$store.state.data.changes,
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
      }
    },
    watch: {
      manager () {
        this.parse_query();  // query is reactive
      },
    },
    mounted() {
      this.parse_query()
    },
  },
});
resources.form = 'furet-ui-resource-form';
