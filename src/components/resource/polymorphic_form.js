import axios from 'axios';
import _ from 'underscore';
import { resources } from './resources';
import { defineComponent } from '../factory';
import {pk2string} from '../../store/modules/data';


defineComponent('furet-ui-resource-polymorphic-form', {
  template : `
    <section>
      <b-loading v-bind:active.sync="loading"></b-loading>
      <furet-ui-page-errors v-bind:errors="errors"/>
      <component 
        ref="resource"
        v-if="subResource"
        v-bind:is="getResourceComponent" 
        v-bind:id="subResource.id" 
        v-bind:key="subResource.id" 
        v-bind:manager="manager" 

        v-on:update-query-string="updateQueryString"
        v-on:create-data="createData"
        v-on:update-data="updateData"
        v-on:delete-data="deleteData"
        v-on:revert-data="revertData"
        v-on:clear-change="clearChange"
        v-on:modify-state="modifyState"

        v-on:go-to-new="goToNew"
        v-on:go-to-list="goToList"
      />
    </section>
  `,
  extend: ['furet-ui-resource'],
  prototype: {
    props: ['manager'],
    inject: ['getEntry'],
    data () {
      return {
        errors: [],
        loading: false,
      };
    },
    computed: {
      subResource () {
        const resource_id = this.resource_id
        return this.getResource(resource_id)
      },
      resource_id () {
        if (this.manager.query.resource_id !== undefined) return this.manager.query.resource_id;
        let id = undefined;
        const entry = this.getEntry(this.resource.model, this.pks)
        const identifiers = {}
        _.forEach(this.resource.fields, field => {
          identifiers[field] = entry[field];
        });
        _.forEach(this.resource.forms, form => {
            if (pk2string(form.waiting_value) === pk2string(identifiers)) id = form.resource_id
        })
        return id;
      },
      getResourceComponent () {
        const resource = this.subResource;
        if (resource === undefined) return 'furet-ui-waiting-resource';
        if (resources[resource.type] !== undefined) return resources[resource.type];
        return 'furet-ui-resource-not-found';
      },
    },
    methods: {
      updateQueryString (query) {
        this.$emit('update-query-string', query);
      },
      goToNew () {
        this.$emit('go-to-new');
      },
      goToList () {
        this.$emit('go-to-list');
      },
      createData (data) {
        this.$emit('create-data', data);
      },
      updateData (data) {
        this.$emit('update-data', data);
      },
      deleteData (data) {
        this.$emit('delete-data', data);
      },
      revertData (row) {
        this.$emit('revert-data', row);
      },
      clearChange (data) {
        this.$emit('clear-change', data);
      },
      modifyState(state){
        this.$emit("modify-state", state);
      },
      getBreadcrumbInfo(){
        return this.$refs.resource.getBreadcrumbInfo();
      },
      refresh () {
        this.$refs.resource.refresh()
      },
      loadAsyncData() {
        // this.loading = true;
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
            if (pks != this.pks) {
              this.pks = pks
              this.loadAsyncData();
            }
          }
        }
      },
    },
    watch: {
      manager () {
        this.parse_query()
      },
    },
    created() {
      this.parse_query()
    },
  },
});
resources.polymorphicform = 'furet-ui-resource-polymorphic-form';
