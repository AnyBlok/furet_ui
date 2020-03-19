/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import {defineComponent} from '../factory'
import {fields} from './fields';
import { listTemplate } from './common';
import _ from 'underscore';
import {safe_eval} from './common';


defineComponent('furet-ui-list-field-password', {
  template: listTemplate,
  extend: ['furet-ui-list-field-password'],
  prototype: {
    computed: {
      value () {
        return _.map(this.data[this.condif.name] || '', () => '*').join('');
      },
    },
  },
})
fields.list.password = 'furet-ui-list-field-password'

// export const FieldThumbnailPassword = Vue.component('furet-ui-thumbnail-field-password', {
//     mixins: [ThumbnailMixin],
//     computed: {
//         value () {
//             return _.map(this.data && this.data[this.name] || '', a => '*').join('');
//         },
//     },
// })

defineComponent('furet-ui-form-field-password', {
  template: `
    <furet-ui-form-field-common-tooltip-field
      v-bind:resource="resource"
      v-bind:data="data"
      v-bind:config="config"
    >
      <span v-if="isReadonly">{{ readonly_value }}</span>
      <b-input 
        v-else
        v-bind:value="value" 
        v-on:input="updateValue"
        v-bind:maxlength="config.maxlength"
        v-bind:placeholder="config.placeholder"
        icon-pack="fa"
        v-bind:icon="config.icon"
        type="password"
        v-bind:password-reveal="reveal"
      />
    </furet-ui-form-field-common-tooltip-field>
  `,
  extend: ['furet-ui-form-field-common'],
  prototype: {
    computed: {
      readonly_value () {
        return _.map(this.data[this.config.name] || '', () => '*').join('');
      },
      reveal () {
        if (this.isReadonly) return false;
        return safe_eval(this.config.reveal, this.data || {}, this.resource.selectors);
      },
    },
  }
})
fields.form.password = 'furet-ui-form-field-password'
