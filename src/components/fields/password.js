/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import {defineComponent} from '../factory'
import {fields} from './fields';
import { listTemplate, thumbnailTemplate } from './common';
import _ from 'underscore';
import {safe_eval} from './common';


defineComponent('furet-ui-common-field-password', {
  prototype: {
    computed: {
      value () {
        const value = this.data[this.config.name] || null
        if (!value) return ''
        return _.map(value, () => '*').join('');
      },
    },
  },
})


defineComponent('furet-ui-list-field-password', {
  template: listTemplate,
  extend: ['furet-ui-list-field-common', 'furet-ui-common-field-password'],
})
fields.list.password = 'furet-ui-list-field-password'


defineComponent('furet-ui-thumbnail-field-password', {
  template: thumbnailTemplate,
  extend: ['furet-ui-thumbnail-field-common', 'furet-ui-common-field-password'],
})
fields.thumbnail.password = 'furet-ui-thumbnail-field-password'

defineComponent('furet-ui-form-field-password', {
  template: `
    <furet-ui-form-field-common-tooltip-field
      v-bind:resource="resource"
      v-bind:data="data"
      v-bind:config="config"
    >
      <div v-if="isReadonly">
        <component 
          v-if="config.slot" 
          v-bind:is="component_template"
          v-bind:config="config"
          v-bind:resource="resource"
          v-bind:data="data"
          v-bind:value="readonly_value"
        />
        <span v-else>{{ readonly_value }}</span>
      </div>
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
        v-bind:key="config.key"
      />
    </furet-ui-form-field-common-tooltip-field>
  `,
  extend: ['furet-ui-form-field-common'],
  prototype: {
    computed: {
      readonly_value () {
        const value = this.data[this.config.name] || null
        if (!value) return ''
        return _.map(value, () => '*').join('');
      },
      reveal () {
        return safe_eval(this.config.reveal, this.data, this.resource);
      },
    },
  }
})
fields.form.password = 'furet-ui-form-field-password'
