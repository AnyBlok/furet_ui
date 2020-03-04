/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import _ from 'underscore';
import {defineComponent} from '../factory'
import {fields} from './fields';
import { listTemplate } from './common';


defineComponent('furet-ui-list-field-selection', {
  template: listTemplate,
  extend: ['furet-ui-list-field-common'],
  prototype: {
    computed: {
      value () {
          const selections = this.config.selections || {};
          const value = this.data[this.config.name] || '';
          if (selections[value] == undefined) return ' --- ';
          return selections[value];
      },
    },
  },
})
fields.list.selection = 'furet-ui-list-field-selection'


// 
// 
// export const FieldThumbnailSelection = Vue.component('furet-ui-thumbnail-field-selection', {
//     props: ['selections'],
//     mixins: [ThumbnailMixin],
//     computed: {
//         value () {
//             const selections = this.selections || {};
//             const value = this.data && this.data[this.name] || '';
//             if (selections[value] == undefined) return ' --- ';
//             return selections[value];
//         },
//     },
// })

defineComponent('furet-ui-form-field-selection', {
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
        <span v-if="isReadonly"> {{formated_value}} </span>
        <b-select 
          v-else 
          v-bind:placeholder="config.placeholder"
          icon-pack="fa"
          v-bind:icon="config.icon"
          v-bind:value="value"
          expanded
          v-on:input="updateValue"
        >
          <option 
            v-for="option in getSelections"
            v-bind:key="option.value"
            v-bind:value="option.value"
          >
            {{ option.label }}
          </option>
        </b-select>
      </b-field>
    </b-tooltip>`,
  extend: ['furet-ui-form-field-common'],
  prototype: {
    computed: {
      formated_value () {
        const selections = this.config.selections || {};
        if (selections[this.value] == undefined) return ' --- ';
        return this.$t(selections[this.value]);
      },
      getSelections () {
        return _.map(this.config.selections, (label, value) => ({value, label: this.$t(label)}));
      },
    },
  },
})
fields.form.selection = 'furet-ui-form-field-selection'
