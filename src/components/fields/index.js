import { fields } from './fields';
import './common';
import './barcode';
import './boolean';
import './color';
import './date';
import './datetime';
import './mail';
import './integer';
import './function';
import './json';
import './float';
import './decimal';
import './password';
import './rich-text';
import './selection';
import './statusbar';
import './string';
import './timestamp';
import './url';

/* TO ADD
 * file
 * text
 * time
 */

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
        let type = this.resource.type;
        if (type === 'singleton') type = 'form';
        return (fields[type] || {})[this.config.type] || 'furet-ui-unknown-field'
      },
    },
  }
})
