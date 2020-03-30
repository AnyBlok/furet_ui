import _ from 'underscore';
import Vue from 'vue';
import axios from 'axios';
import  {resources}  from './resources';
import { defineComponent } from '../factory';

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
        getEntry: this.getEntry,
        getNewEntry: this.getNewEntry,
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
      getEntry (model, pk) {
        return this.$store.getters.get_entry(model, pk)
      },
      getNewEntry (model, uuid) {
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
    props: ['value', 'x2m_resource', 'isReadonly', 'add', 'update', 'delete', 'config'],
    data () {
      const pks = this.get_pks()
      return {
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
          _.each(_.keys(value), key => {
            if (pks[key] === undefined) pks[key] = []
            pks[key].push(value[key])
          });
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
      },
      createData (data) {
        this.add(data);
      },
      updateData (data) {
        this.update(data);
      },
      deleteData (data) {
        this.delete(data);
      },
      clearChange () {
      },
      updateChangeState (action) {
        console.log(action)
      },
      getEntry (model, pk) {
        return this.$store.getters.get_entry(model, pk)
      },
      getNewEntry (model, uuid) {
        return this.$store.getters.get_new_entry(model, uuid)
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
