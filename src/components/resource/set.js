import { resources } from './resources';
import { defineComponent } from '../factory';


defineComponent('furet-ui-resource-set', {
  template : `
    <component 
      ref="resource"
      v-bind:is="getResourceComponent" 
      v-bind:id="subResource.id" 
      v-bind:manager="resourceManager" 
      v-on:update-query-string="updateQueryString"
      v-on:create-data="createData"
      v-on:update-data="updateData"

      v-on:go-to-new="goToNew"
      v-on:go-to-page="goToPage"
      />
  `,
  prototype: {
    props: ['id', 'manager'],
    data () {
      return {
          mode: 'multi',
      }
    },
    computed: {
      resource () {
        return this.getResource(this.id);
      },
      subResource () {
        return this.getResource(this.resource[this.mode])
      },
      getResourceComponent () {
        const resource = this.subResource;
        if (resource === undefined) return 'furet-ui-waiting-resource';
        if (resources[resource.type] !== undefined) return resources[resource.type];
        return 'furet-ui-resource-not-found';
      },
      resourceManager () {
        return Object.assign(
          {
              'can_create': this.resource.can_create,
              'can_modify': this.resource.can_modify,
              'can_delete': this.resource.can_delete,
          }, 
          this.manager);
      },
    },
    methods: {
      getResource (id) {
        return this.$store.state.global.resources[id];
      },
      updateQueryString (query) {
        this.$emit('update-query-string', query);
      },
      createData (data) {
        this.$emit('create-data', data);
      },
      updateData (data) {
        this.$emit('update-data', data);
      },
      goToNew () {
        // add to breadscrumb
        this.$emit('update-query-string', {mode: 'form'})
      },
      goToPage (row) {
        // add to breadscrumb
        const pks = {}
        this.resource.pks.forEach(pk => {
            pks[pk] = row[pk]
        })
        this.$emit('update-query-string', {mode: 'form', pks: JSON.stringify(pks)})
      },
      saved() {
        this.$refs.resource.goToPage()
        this.$refs.resource.loadAsyncData()
      }
    },
    mounted () {
      const query = this.$route.query;
      if (query.mode !== undefined) this.mode = query.mode;
    },
  },
});
resources.set = 'furet-ui-resource-set';
