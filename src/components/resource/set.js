import { resources } from './resources';
import { defineComponent } from '../factory';


defineComponent('furet-ui-resource-set', {
  template : `
    <keep-alive>
      <component 
        ref="resource"
        v-bind:is="getResourceComponent" 
        v-bind:id="subResource.id" 
        v-bind:key="subResource.id" 
        v-bind:type="subResource.type" 
        v-bind:manager="resourceManager" 

        v-on:update-query-string="updateQueryString"
        v-on:create-data="createData"
        v-on:update-data="updateData"
        v-on:delete-data="deleteData"
        v-on:revert-data="revertData"
        v-on:clear-change="clearChange"
        v-on:modify-state="modifyState"

        v-on:go-to-new="goToNew"
        v-on:go-to-page="goToPage"
        v-on:go-to-list="goToList"
      />
    </keep-alive>
  `,
  extend: ['furet-ui-resource'],
  prototype: {
    props: ['manager', 'config'],
    computed: {
      subResource () {
        return this.getResource(this.resource[this.manager.mode])
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
              'can_update': this.resource.can_update,
              'can_delete': this.resource.can_delete,
              'create_choices': this.resource.forms || [],
          }, 
          this.manager);
      },
    },
    methods: {
      updateQueryString (query) {
        this.$emit('update-query-string', query);
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
        const pks = {}
        this.resource.pks.forEach(pk => {
            pks[pk] = row[pk]
        })

        const action = {
          model: this.config.model,
          pks: pks,
          uuid: row.__uuid,
        }

        this.$emit('revert-data', action);
      },
      modifyState(state){
        this.$emit("modify-state", state);
      },
      clearChange (data) {
        this.$emit('clear-change', data);
      },
      goToNew (choice) {
        // add to breadscrumb
        const query = {mode: 'form'};
        if (choice !== undefined) {
            query.waiting_value = JSON.stringify(choice.waiting_value);
            query.resource_id = choice.resource_id;
        }
        this.$emit('push-in-breadcrumb');
        this.$emit('update-query-string', query);
      },
      goToPage (row) {
        if (! this.resource.can_read) return
        if (row.__uuid) {
          this.$emit('update-query-string', {mode: 'form', uuid: row.__uuid})
        } else {
          this.$emit('push-in-breadcrumb')
          const pks = {}
          this.resource.pks.forEach(pk => {
              pks[pk] = row[pk]
          })
          this.$emit('update-query-string', {mode: 'form', pks: JSON.stringify(pks)})
        }
      },
      saved() {
        this.$refs.resource.goToPage()
        this.$refs.resource.loadAsyncData()
      },
      getBreadcrumbInfo(){
        return this.$refs.resource.getBreadcrumbInfo();
      },
      refresh () {
        this.$refs.resource.refresh()
      },
    },
    watch: {
      manager () {
        const query = this.manager.query || {};
        if (query.mode !== undefined) this.manager.mode = query.mode;
        else this.manager.mode = 'multi';
      },
    },
    created () {
      const query = this.manager.query || {};
      if (query.mode !== undefined) this.manager.mode = query.mode;
      else this.manager.mode = 'multi';
    },
  },
});
resources.set = 'furet-ui-resource-set';
