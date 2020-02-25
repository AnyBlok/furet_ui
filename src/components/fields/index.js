import { fields } from './fields';
import './common';
import './string';
import { defineComponent } from '../factory';

defineComponent('furet-ui-unknown-field', {
  template : `<div>Unknow Field <strong>{{config.type}}</strong></div>`,
  prototype: {
    props: ['config', 'data'],
  }
})

defineComponent('furet-ui-field', {
  template : `
    <component v-bind:is="component" v-bind:config="config" v-bind:data="data" />
  `,
  prototype: {
    props: ['resource', 'config', 'data'],
    computed: {
      component () {
        return (fields[this.resource.type] || {})[this.config.type] || 'furet-ui-unknown-field'
      },
    },
  }
})
