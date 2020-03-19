import _ from 'underscore';
import Vue from 'vue';
import axios from 'axios';
import  {resources}  from './resources';
import { defineComponent } from '../factory';
import { debounce } from 'debounce';

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
      async_load_resource: debounce(function(id) {
        this.load_resource(id);
      }, 500),
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
    <div v-bind:style="{width: '100%'}">
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
      />
    </div>
  `,
  extend: ['furet-ui-resource-manager'],
  prototype: {
    props: ['value'],
    data () {
      const pks = {};
      if (this.value) {
        this.value.forEach(value => {
          _.each(_.keys(value), key => {
            if (pks[key] === undefined) pks[key] = []
            pks[key].push(value[key])
          });
        });
      }
      return {
        manager: {
            query: {additional_filter: pks},
          pks,
        },
      };
    },
    methods: {
      updateQueryString (query) {
        query.additional_filter = this.pks
        this.manager = Object.assign({}, this.manager, {query})
      },
      createData (data) {
        data
        // const query = Object.assign({}, this.$route.query);
        // axios.post('/furet-ui/crud', data)
        //   .then((response) => {
        //     this.$store.commit('CLEAR_CHANGE')
        //     query.pks = JSON.stringify(response.data.pks);
        //     this.updateQueryString(query)
        //   })
        //   .catch((error) => {
        //     this.errors = error.response.data.errors;
        //   });
      },
      updateData (data) {
        data
        // axios.patch('/furet-ui/crud', data)
        //   .then(() => {
        //     this.$refs.resource.saved();
        //   })
        //   .catch((error) => {
        //     this.errors = error.response.data.errors;
        //   });
      },
      deleteData (data) {
        data
        // axios.delete('/furet-ui/crud', {params: data})
        //   .then(() => {
        //     this.$store.commit('CLEAR_CHANGE')
        //     this.$store.commit('DELETE_DATA', data)
        //     this.updateQueryString({})  // replace it by breadscrumb
        //   })
        //   .catch((error) => {
        //     this.errors = error.response.data.errors;
        //   });
      },
      clearChange () {
        // this.$store.commit('CLEAR_CHANGE')
      },
    },
    mounted () {
      if (!this.resource) {
        this.async_load_resource(this.id);
      }
    },
  },
});
