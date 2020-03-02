import axios from 'axios';
import _ from 'underscore';
import { resources } from './resources';
import { defineComponent } from '../factory';


defineComponent('furet-ui-resource-form', {
  template : `
    <section>
      <furet-ui-page-errors v-bind:errors="errors"/>
      <b-loading v-bind:active.sync="loading"></b-loading>
      <furet-ui-header-page
        name="furet-ui-page"
        v-bind:title="resource.title"
        v-bind:can_go_to_new="manager.can_create"
        v-bind:can_modify="manager.can_modify"
        v-bind:can_delete="manager.can_delete"

        v-on:go-to-list="goToList"
        v-on:go-to-edit="goToEdit"
        v-on:go-to-page="goToPage"
        v-on:delete-entry="deleteEntry"
        v-bind:data="data"
      >
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
          v-bind:is="form_card" 
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
        data: {},
        loading: false,
        errors: [],
        readonly: true,  // RO, RW
        pks: {},
      };
    },
    computed: {
      resource () {
        return Object.assign(
          {
              readonly: this.readonly,
          },
          this.$store.state.global.resources[this.id]
        );
      },
      form_card () {
        if (this.resource.template) {
          return {
            template: this.resource.template,
            props: ['data', 'resource'],
          };
        }
        return {
            template: '<div></div>'
        };
      },
    },
    methods: {
      updateQueryString (query) {
        this.$emit('update-query-string', query);
      },
      goToList () {
      },
      goToEdit () {
      },
      goToPage () {
      },
      deleteEntry () {
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
            this.data = this.$store.getters.get_entry(this.resource.model, this.pks)
            this.loading = false;
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
            this.loading = false;
          });
      },
      parse_query() {
        console.log('plop', this.manager.query)
        if (this.manager.query && this.manager.query.pks) {
          this.pks = JSON.parse(this.manager.query.pks)
          this.loadAsyncData();
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
