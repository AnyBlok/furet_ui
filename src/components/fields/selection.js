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
import {safe_eval} from './common';


defineComponent('furet-ui-list-field-selection', {
  template: `
    <div>
      <span v-if="isHidden" />
      <div v-else>
        <b-tag v-if="color !== undefined" v-bind:type="color">{{value}}</b-tag>
        <span v-else>{{value}}</span>
      </div>
    </div>
  `,
  extend: ['furet-ui-list-field-common'],
  prototype: {
    computed: {
      value () {
          const selections = this.config.selections || {};
          const value = this.data[this.config.name] || '';
          if (selections[value] == undefined) return ' --- ';
          return this.$t(selections[value]);
      },
      color () {
          const colors = this.config.colors || {};
          const value = this.data[this.config.name] || '';
          return colors[value];
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
    <furet-ui-form-field-common-tooltip-field
      v-bind:data="data"
      v-bind:config="config"
    >
      <div class="field has-addons">
        <p class="control" v-if="color">
          <a class="button">
            <b-icon icon="info-circle" v-bind:type="color"/>
          </a>
        </p>
        <b-select 
          v-bind:placeholder="config.placeholder"
          v-bind:disabled="isReadonly" 
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
      </div>
    </furet-ui-form-field-common-tooltip-field>
  `,
  extend: ['furet-ui-form-field-common'],
  prototype: {
    computed: {
      formated_value () {
        const selections = this.config.selections || {};
        if (selections[this.value] == undefined) return ' --- ';
        return this.$t(selections[this.value]);
      },
      isRequired () {
        return safe_eval(this.config.required, this.data || {});
      },
      getSelections () {
        const colors = this.config.colors || {};
        const selections = [];
          if (!this.isRequired) selections.push({label: '', value: null, color: null});

        _.each(this.config.selections, (label, value) => {
          selections.push({value, label: this.$t(label), color: colors[value]})
        });

        return selections;
      },
      color () {
        const colors = this.config.colors || {};
        return colors[this.value];
      },
    },
  },
})
fields.form.selection = 'furet-ui-form-field-selection'
