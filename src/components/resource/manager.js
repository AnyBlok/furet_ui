import _ from 'underscore';
import Vue from 'vue';
import axios from 'axios';
import  {resources}  from './resources';
import { defineComponent } from '../factory';
import { update_change_object } from "../../store/modules/data";

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
      /** This method should be implement in subclass to return
       * label and icon to be displayed in breadcrumb
       *
       * @return {Object} {label: "Label to display in breadcrumb", icon: "list"} -
       *    Where `label` and `icon` are String.
       *    `icon` is a https://fontawesome.com icon name
       */
      getBreadcrumbInfo() {
        throw new Error(
          `You must implement this method **getBreadcrumbInfo** in subclass,
          it should return a dict:
          {label: "Label to display in breadcrumb", icon: "list"}`
        );
      },
      getResource (id) {
        return this.$store.state.resource[id];
      },
      load_resource (id) {
        axios
          .get(`furet-ui/resource/${id}`).then((result) => {
            this.$dispatchAll(result.data);
          })
          .catch((error) => {
            console.error(error)
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
        getNewEntries: this.getNewEntriesWrapper,
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
        v-on:push-in-breadcrumb="pushInBreadcrumb"
      />
    </div>
  `,
  extend: ['furet-ui-resource-manager'],
  prototype: {
    methods: {
      updateQueryString (query) {
        this.$router.push({ query });
      },
      /** This method add an element to the breadcrumb
       *
       * It gets label and icon information on child resource component
       * calling ``getBreadcrumbInfo`` to know the icon and label to display
       * and commit the new element to vuex store with the current route.
      */
      pushInBreadcrumb (){
        const {label, icon} = this.$refs.resource.getBreadcrumbInfo();
        this.$store.commit(
          "PushBreadcrumb", {
          route: this.$route,
          label,
          icon
        });
      },
      createData (data) {
        const query = Object.assign({}, this.$route.query);
        data.changes = this.$store.state.data.changes;
        this.errors = [];
        axios.post(`/furet-ui/resource/${this.id}/crud`, data)
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
        this.errors = [];
        axios.patch(`/furet-ui/resource/${this.id}/crud`, data)
          .then(() => {
            this.$refs.resource.saved();
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
      },
      deleteData (data) {
        this.errors = [];
        axios.delete(`/furet-ui/resource/${this.id}/crud`, {params: data})
          .then(() => {
            this.$store.commit('CLEAR_CHANGE');
            this.$store.commit('DELETE_DATA', data);
            this.goToPreviousBreadcrumbElement();
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
      },
      clearChange () {
        this.$store.commit('CLEAR_CHANGE')
      },
      goToList() {
        this.goToPreviousBreadcrumbElement();
      },
      /**
       * Go back to the previous breadcrumb element. As if the user
       * clicked on the last element.
       *
       * If there is no previous element it clear the vue-router.
       */
      goToPreviousBreadcrumbElement() {
          const breadcrumb_lenght = this.$store.state.global.breadcrumb.length;
          let route;
          if (breadcrumb_lenght > 0){
            route = this.$store.state.global.breadcrumb[
              this.$store.state.global.breadcrumb.length - 1
            ].route;
          } else {
            route = {}
          }
          this.$router.push(route);
          this.$store.commit("PopBreadcrumb");
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
      getNewEntriesWrapper (model, uuid) {
        return this.$store.getters.get_new_entries(model, uuid)
      },
    },
    provide() {
      return {
        pushInBreadcrumb: this.pushInBreadcrumb
      }
    },
    mounted() {
      const query = this.$route.query;
      // this.manager.query = Object.assign({}, query);
      Vue.set(this.manager, 'query', Object.assign({}, query))
      this.load_resource(this.id)
    }
  },
});

defineComponent("furet-ui-form-field-resource-manager", {
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
          v-on:revert-data="revertData"
          v-on:clear-change="clearChange"
          v-on:go-to-list="goToList"
        />
    </div>
  `,
  extend: ["furet-ui-resource-manager"],
  prototype: {
    props: ["value", "x2m_resource", "isReadonly", "config"],
    inject: ["getEntry", "getNewEntry", "getNewEntries"],
    data() {
      return {
        changes: {},
        manager: {
          multi_header_component_name: this.config.multi_header_component_name,
          page_header_component_name: this.config.page_header_component_name,
          pagination_size: this.config.pagination_size,
          changed_rows: this.value || [],
          readonly: this.isReadonly,
          query: { additional_filter: this.build_additional_filter() },
          selectors: this.x2m_resource.selectors || {}
        }
      };
    },
    methods: {
      build_additional_filter() {
        let filters = {};
        if (this.config.remote_columns && this.config.local_columns) {
          _.each(
            _.zip(this.config.remote_columns, this.config.local_columns),
            cols => {
              filters[cols[0]] = this.x2m_resource.pks[cols[1]];
            }
          );
        }
        return filters;
      },
      updateQueryString(newquery) {
        const query = Object.assign({}, newquery);
        if (query.mode !== "form")
          query.additional_filter = this.build_additional_filter();
        this.manager = Object.assign({}, this.manager, { query });
      },
      goToList() {
        const query = {additional_filter: this.build_additional_filter()};
        this.manager = Object.assign({}, this.manager, { query });
        this.$refs.resource.$refs.resource.readonly = true;
        this.$refs.resource.mode = "multi";
        this.clearChange();
      },
      createData(data) {
        data.changes = this.changes;
        this.$emit("add", data);
        this.goToList();
      },
      updateData(data) {
        data.changes = this.changes;
        this.$emit("update", data);
        this.goToList();
      },
      deleteData(data) {
        this.$emit("delete", data);
        this.goToList();
      },
      revertData(data){
        this.$emit("revert", data);
      },
      clearChange(_data) {
        this.changes = {}; // clear the changes
      },
      updateChangeState(action) {
        this.changes = update_change_object(this.changes, action);
      },
      getEntryWrapper(model, pk) {
        return this.getEntry(model, pk);
      },
      getNewEntryWrapper(model, uuid) {
        return this.getNewEntry(model, uuid);
      },
      getNewEntriesWrapper(model) {
        return this.getNewEntries(model);
      }
    },
    watch: {
      isReadonly() {
        this.manager.readonly = this.isReadonly;
      },
      value() {
        const query = Object.assign({}, this.manager.query, {
          additional_filter: this.build_additional_filter()
        });
        this.manager = Object.assign({}, this.manager, { query, changed_rows: this.value });
      }
    },
    mounted() {
      this.load_resource(this.id);
    }
  }
});
