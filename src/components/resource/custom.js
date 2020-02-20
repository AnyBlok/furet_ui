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
  prototype: {
    props: ['id', 'manager'],
    computed: {
      resource () {
        return this.$store.state.global.resources[this.id];
      },
    },
    methods: {
      updateQueryString (query) {
        this.$emit('update-query-string', query);
      }
    },
  },
});
resources.custom = 'furet-ui-resource-custom';
