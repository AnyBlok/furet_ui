import { fields } from './fields';
import './common';
import './boolean';
import './datetime';
import './mail';
import './integer';
import './json';
import './float';
import './decimal';
import './password';
import './timestamp';
import './selection';
import './statusbar';
import './string';

import './relationship';

import { defineComponent } from '../factory';

defineComponent('furet-ui-unknown-field', {
  template : `<div>Unknown Field <strong>{{config.type}}</strong></div>`,
  prototype: {
    props: ['config', 'data'],
  }
})

defineComponent('furet-ui-field', {
  template : `
    <component 
      v-bind:is="component" 
      v-bind:resource="resource" 
      v-bind:config="config" 
      v-bind:data="data"
    />
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
