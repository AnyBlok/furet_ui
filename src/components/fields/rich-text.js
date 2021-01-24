/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import { VueEditor } from 'vue2-editor'
import {defineComponent} from '../factory'
import {fields} from './fields';


defineComponent('furet-ui-list-field-rich-text', {
  template: `
    <div>
      <span v-if="isHidden" />
      <div 
        v-else 
        class="content is-small"
        v-html="value" 
        v-bind:style="{width: '100%'}"
      />
    </div>`,
  extend: ['furet-ui-list-field-common'],
})
fields.list.richtext = 'furet-ui-list-field-rich-text'

defineComponent('furet-ui-thumbnail-field-rich-text', {
  template: `
    <furet-ui-form-field-common-tooltip
      v-bind:resource="resource"
      v-bind:data="data"
      v-bind:config="config"
    >
      <div 
        class="content is-small"
        v-html="value" 
        v-bind:style="{width: '100%'}"
      />
    </furet-ui-form-field-common-tooltip>
  `,
  extend: ['furet-ui-thumbnail-field-common'],
})
fields.thumbnail.richtext = 'furet-ui-thumbnail-field-rich-text'

defineComponent('furet-ui-form-field-rich-text', {
  template: `
    <furet-ui-form-field-common-tooltip-field
      v-bind:resource="resource"
      v-bind:data="data"
      v-bind:config="config"
    >
      <div
        class="box content is-small"
        v-if="isReadonly"
        v-html="value"
      />
      <vue-editor 
        v-else
        v-bind:placeholder="config.placeholder"
        v-model="value"
      />
    </furet-ui-form-field-common-tooltip-field>
  `,
  extend: ['furet-ui-form-field-common'],
  prototype: {
    components: {
      VueEditor
    },
    computed: {
      value: {
        get: function () {
          return this.data[this.config.name] || null;
        },
        set: function (value) {
          this.updateValue(value);
        },
      },
    },
  },
})
fields.form.richtext = 'furet-ui-form-field-rich-text'
