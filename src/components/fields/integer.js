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


defineComponent('furet-ui-list-field-integer', {
  template: listTemplate,
  extend: ['furet-ui-list-field-common'],
})
fields.list.integer = 'furet-ui-list-field-integer'


// export const FieldThumbnailInteger = Vue.component('furet-ui-thumbnail-field-integer', {
//     mixins: [ThumbnailMixin],
// })

defineComponent('furet-ui-form-field-integer', {
  template: `
    <furet-ui-form-field-common-tooltip-field
      v-bind:resource="resource"
      v-bind:data="data"
      v-bind:config="config"
    >
      <span v-if="isReadonly">{{ value }}</span>
      <b-input 
        v-else
        type="number"
        step="1"
        v-bind:value="value" 
        v-on:input="updateValue"
        v-bind:min="config.min"
        v-bind:max="config.max"
        v-bind:key="config.key"
      />
    </furet-ui-form-field-common-tooltip-field>
  `,
  extend: ['furet-ui-form-field-common'],
})
fields.form.integer = 'furet-ui-form-field-integer'
