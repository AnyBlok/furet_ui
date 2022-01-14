/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import {defineComponent} from '../factory'
import {fields} from './fields';

defineComponent('furet-ui-list-field-color', {
  template:`
    <span v-if="isHidden" />
    <component 
      v-else-if="config.slot" 
      v-bind:is="component_template"
      v-bind:config="config"
      v-bind:resource="resource"
      v-bind:data="data"
      v-bind:value="value"
    />
    <b-input 
      v-else-if="value"
      type="color"
      v-bind:value="value" 
      disabled
    />
    <span v-else />
  `,
  extend: ['furet-ui-list-field-common'],
})
fields.list.color = 'furet-ui-list-field-color'

defineComponent('furet-ui-thumbnail-field-color', {
  template: `
    <furet-ui-thumbnail-field-common-tooltip-field
      v-bind:resource="resource"
      v-bind:data="data"
      v-bind:config="config"
    >
      <component 
        v-if="config.slot" 
        v-bind:is="component_template"
        v-bind:config="config"
        v-bind:resource="resource"
        v-bind:data="data"
        v-bind:value="value"
      />
      <b-input 
        v-else-if="value"
        type="color"
        v-bind:value="value" 
        disabled
      />
    </furet-ui-thumbnail-field-common-tooltip-field>
  `,
  extend: ['furet-ui-thumbnail-field-common'],
})
fields.thumbnail.color = 'furet-ui-thumbnail-field-color'
fields.kanban.color = 'furet-ui-thumbnail-field-color'

defineComponent('furet-ui-form-field-color', {
  template: `
    <furet-ui-form-field-common-tooltip-field
      v-bind:resource="resource"
      v-bind:data="data"
      v-bind:config="config"
    >
      <div class="field has-addons">
        <p v-if="isReadonly" class="control is-expanded">
          <component 
            v-if="config.slot" 
            v-bind:is="component_template"
            v-bind:config="config"
            v-bind:resource="resource"
            v-bind:data="data"
            v-bind:value="value"
          />
          <b-input 
            v-else-if="data"
            type="color"
            v-bind:value="value" 
            disabled
          >
          </b-input>
        </p>
        <p v-else class="control">
          <b-input 
            style="width: 100px"
            v-if="data || !isReadonly"
            type="color"
            v-bind:value="value" 
            v-on:input="updateValue"
            v-bind:disabled="isReadonly"
          >
          </b-input>
        </p>
        <p class="control is-expanded">
          <b-input 
            v-if="!isReadonly"
            v-bind:value="value" 
            v-on:input="updateValue"
            v-bind:placeholder="config.placeholder"
            icon-pack="fa"
            v-bind:icon="config.icon"
            pattern="#[A-Fa-f1-9]{6}"
          />
        </p>
      </div>
    </furet-ui-form-field-common-tooltip-field>
  `,
  extend: ['furet-ui-form-field-common'],
})
fields.form.color = 'furet-ui-form-field-color'
