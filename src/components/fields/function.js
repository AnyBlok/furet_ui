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


defineComponent('furet-ui-list-field-function', {
  template: listTemplate,
  extend: ['furet-ui-list-field-common'],
})
fields.list.function = 'furet-ui-list-field-function'


defineComponent('furet-ui-thumbnail-field-function', {
  template: thumbnailTemplate,
  extend: ['furet-ui-thumbnail-field-common'],
})
fields.thumbnail.function = 'furet-ui-thumbnail-field-function'


defineComponent('furet-ui-form-field-function', {
  template: `
    <furet-ui-form-field-common-tooltip-field
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
      <span v-else>{{ value }}</span>
    </furet-ui-form-field-common-tooltip-field>
  `,
  extend: ['furet-ui-form-field-common'],
})
fields.form.function = 'furet-ui-form-field-function'
