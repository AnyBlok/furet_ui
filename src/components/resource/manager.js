import _ from 'underscore';
import Vue from 'vue';
import axios from 'axios';
import  {resources}  from './resources';
import { defineComponent } from '../factory';
import {pk2string, update_change_object} from '../../store/modules/data';

defineComponent('furet-ui-waiting-resource', {
  template: `
    <div class="container"> 
        <strong>Waiting loading component</strong>
    </div>
  `,
});

defineComponent('furet-ui-resource-not-found', {
  template: `
    <div class="container"> 
        <strong>Resource type not found</strong>
    </div>
  `,
});

defineComponent('furet-ui-resource', {
  prototype: {
    props: ['id'],
    computed: {
      resource () {
        return this.getResource(this.id);
      },
    },
    methods: {
      getResource (id) {
        return this.$store.state.resource[id];
      },
      load_resource (id) {
        axios.get(`furet-ui/resource/${id}`).then((result) => {
          this.$dispatchAll(result.data);
        });
      },
    },
  },
});

defineComponent('furet-ui-resource-manager', {
  extend: ['furet-ui-resource'],
  prototype: {
    data () {
      return {
        manager: {},
        errors: [],
      };
    },
    computed: {
      resourceComponents () {
        if (this.resource === undefined) return 'furet-ui-waiting-resource';
        if (resources[this.resource.type] !== undefined) return resources[this.resource.type];
        return 'furet-ui-resource-not-found';
      },
    },
    provide: function () {
      return {
        updateChangeState: this.updateChangeState,
        getEntry: this.getEntryWrapper,
        getNewEntry: this.getNewEntryWrapper,
      }
    },
  },
});

defineComponent('furet-ui-space-resource-manager', {
  template: `
    <div>
      <furet-ui-page-errors v-bind:errors="errors"/>
      <component 
        ref="resource"
        v-bind:is="resourceComponents" 
        v-bind:id="id" 
        v-bind:manager="manager" 
        v-on:update-query-string="updateQueryString"
        v-on:create-data="createData"
        v-on:update-data="updateData"
        v-on:delete-data="deleteData"
        v-on:clear-change="clearChange"
        v-on:go-to-list="goToList"
      />
    </div>
  `,
  extend: ['furet-ui-resource-manager'],
  prototype: {
    methods: {
      updateQueryString (query) {
        this.$router.push({ query });
      },
      createData (data) {
        const query = Object.assign({}, this.$route.query);
        data.changes = this.$store.state.data.changes;
        axios.post('/furet-ui/crud', data)
          .then((response) => {
            this.$store.commit('CLEAR_CHANGE')
            query.pks = JSON.stringify(response.data.pks);
            this.updateQueryString(query)
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
      },
      updateData (data) {
        data.changes = this.$store.state.data.changes;
        axios.patch('/furet-ui/crud', data)
          .then(() => {
            this.$refs.resource.saved();
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
      },
      deleteData (data) {
        axios.delete('/furet-ui/crud', {params: data})
          .then(() => {
            this.$store.commit('CLEAR_CHANGE')
            this.$store.commit('DELETE_DATA', data)
            this.updateQueryString({})  // replace it by breadscrumb
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
      },
      clearChange () {
        this.$store.commit('CLEAR_CHANGE')
      },
      goToList () {
          // TODO
      },
      updateChangeState (action) {
        this.$store.commit('UPDATE_CHANGE', action)
      },
      getEntryWrapper (model, pk) {
        return this.$store.getters.get_entry(model, pk)
      },
      getNewEntryWrapper (model, uuid) {
        return this.$store.getters.get_new_entry(model, uuid)
      },
    },
    mounted() {
      const query = this.$route.query;
      // this.manager.query = Object.assign({}, query);
      Vue.set(this.manager, 'query', Object.assign({}, query))
      this.load_resource(this.id)
    }
  },
});

defineComponent('furet-ui-form-field-resource-manager', {
  template: `
    <div v-bind:style="{width: '100%'}" class="box">
        <furet-ui-page-errors v-bind:errors="errors"/>
        <component 
          ref="resource"
          v-bind:is="resourceComponents" 
          v-bind:id="id" 
          v-bind:config="config"
          v-bind:manager="manager" 
          v-on:update-query-string="updateQueryString"
          v-on:create-data="createData"
          v-on:update-data="updateData"
          v-on:delete-data="deleteData"
          v-on:clear-change="clearChange"
          v-on:go-to-list="goToList"
        />
    </div>
  `,
  extend: ['furet-ui-resource-manager'],
  prototype: {
    props: ['value', 'x2m_resource', 'isReadonly', 'config'],
    inject: ['getEntry', 'getNewEntry'],
    data () {
      const pks = this.get_pks()
      return {
        changes: {},
        manager: {
          readonly: this.isReadonly,
          query: {additional_filter: pks},
          pks,
        },
      };
    },
    methods: {
      get_pks () {
        if (!this.value) return null;
        const pks = {};
        this.value.forEach(value => {
          if (value.__x2m_state !== 'DELETED') {
            _.each(_.keys(value), key => {
              if (key !== '__x2m_state') {
                if (pks[key] === undefined) pks[key] = []
                pks[key].push(value[key])
              }
            });
          }
        });
        return pks
      },
      updateQueryString (newquery) {
        const query = Object.assign({}, newquery);
        if (query.mode !== 'form') query.additional_filter = this.pks
        this.manager = Object.assign({}, this.manager, {query})
      },
      goToList () {
        const query = {additional_filter: this.manager.pks}
        this.manager = Object.assign({}, this.manager, {query})
        this.$refs.resource.mode = 'multi';
        this.clearChange();
      },
      createData (data) {
        data.changes = this.changes
        this.$emit('add', data)
        this.clearChange() // because is an hard action
      },
      updateData (data) {
        data.changes = this.changes
        this.$emit('update', data)
        this.$refs.resource.saved();
      },
      deleteData (data) {
        this.$emit('delete', data)
        this.clearChange() // because is an hard action
        this.updateQueryString({})  // replace it by breadscrumb
      },
      clearChange () {
        this.changes = {}  // clear the changes
      },
      updateChangeState (action) {
        this.changes = update_change_object(this.changes, action)
      },
      getEntryWrapper (model, pk) {
        const key = pk2string(pk)
        const data = this.getEntry(model, pk)
        const change = (this.changes[model] || {})[key] || {};
        return Object.assign({}, data, change);
      },
      getNewEntryWrapper (model, uuid) {
        const data = this.getNewEntry(model, uuid)
        const change = ((this.changes[model] || {}).new || {})[uuid] || {};
        return Object.assign({}, data, change);
      },
    },
    watch: {
      isReadonly () {
        this.manager.readonly = this.isReadonly
      },
      value () {
        const pks = this.get_pks()
        const query = Object.assign({}, this.manager.query, {additional_filter: pks})
        this.manager = Object.assign({}, this.manager, {query, pks})
      },
    },
    mounted () {
      this.load_resource(this.id);
    },
  },
});
