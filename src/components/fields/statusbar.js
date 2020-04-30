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
          v-bind:key="state.value" 
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
        _.each(this.config.selections, (label, value) => {
          res.push({value, label, type: this.value == value ? 'is-success': ''})
        })
        return res
      },
    },
  },
})
fields.form.statusbar = 'furet-ui-form-field-statusbar'
