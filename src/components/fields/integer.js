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
    <div v-if="this.isInvisible" />
    <b-tooltip 
      v-bind:label="getTooltip" 
      v-bind:position="tooltipPosition"
      v-bind:style="{'width': '100%'}"
      v-else
    >
      <b-field 
        v-bind:label="config.label"
        v-bind:type="getType"
        v-bind:message="getMessage"
        v-bind:style="{'width': 'inherit'}"
      >
        <span v-if="isReadonly"> {{value}} </span>
        <b-input 
          v-else 
          type="number"
          step="1"
          v-bind:value="value" 
          v-on:input="updateValue"
          v-bind:min="config.min"
          v-bind:max="config.max"
        />
      </b-field>
    </b-tooltip>`,
  extend: ['furet-ui-form-field-common'],
})
fields.form.integer = 'furet-ui-form-field-integer'
