import { resources } from './resources';
import { defineComponent } from '../factory';


defineComponent('furet-ui-resource-custom', {
  template : `
    <component 
      v-bind:is="resource.component" 
      v-bind:manager="manager" 
      v-on:update-query-string="updateQueryString"
      />
  `,
  extend: ['furet-ui-resource'],
  prototype: {
    props: ['id', 'manager'],
    methods: {
      updateQueryString (query) {
        this.$emit('update-query-string', query);
      }
    },
  },
});
resources.custom = 'furet-ui-resource-custom';
