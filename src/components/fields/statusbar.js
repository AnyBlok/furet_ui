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

defineComponent('furet-ui-form-field-statusbar', {
  template: `
    <furet-ui-form-field-common-tooltip
      v-bind:resource="resource"
      v-bind:data="data"
      v-bind:config="config"
    >
      <b-taglist attached>
        <b-tag type="is-dark" size="is-medium">{{ config.label }}</b-tag>
        <b-tag 
          v-for="state in getStates" 
          v-bind:type="state.type" 
          size="is-medium"
        >
          {{ state.label }}
        </b-tag>
      </b-taglist>
    </furet-ui-form-field-common-tooltip>
  `,
  extend: ['furet-ui-form-field-common'],
  prototype: {
    computed: {
      getStates () {
        const res = []
        console.log(this.resource, this.config)
        _.each(this.config.selections, (label, value) => {
          res.push({label, type: this.value == value ? 'is-success': ''})
        })
        return res
      },
      getSelections () {
        const colors = this.config.colors || {};
        const selections = [];
          if (!this.isRequired) selections.push({label: '', value: null, color: null});

        _.each(this.config.selections, (label, value) => {
          selections.push({value, label, color: colors[value]})
        });

        return selections;
      },
    },
  },
})
fields.form.statusbar = 'furet-ui-form-field-statusbar'
