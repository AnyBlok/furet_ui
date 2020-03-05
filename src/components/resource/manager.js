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
  prototype: {
    props: ['id'],
    data () {
      return {
        manager: {},
        errors: [],
      };
    },
    computed: {
      resource () {
        return this.$store.state.global.resources[this.id];
      },
      resourceComponents () {
        if (this.resource === undefined) return 'furet-ui-waiting-resource';
        if (resources[this.resource.type] !== undefined) return resources[this.resource.type];
        return 'furet-ui-resource-not-found';
      },
    },
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
      this.manager.query = Object.assign({}, query);
      axios.get(`furet-ui/resource/${this.id}`).then((result) => {
        this.$dispatchAll(result.data);
      });
    }
  },
});
