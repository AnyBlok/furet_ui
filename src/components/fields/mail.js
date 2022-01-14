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


defineComponent('furet-ui-list-field-email', {
  template: listTemplate,
  extend: ['furet-ui-list-field-common'],
})
fields.list.email = 'furet-ui-list-field-email'

defineComponent('furet-ui-thumbnail-field-email', {
  template: thumbnailTemplate,
  extend: ['furet-ui-thumbnail-field-common'],
})
fields.thumbnail.email = 'furet-ui-thumbnail-field-email'
fields.kanban.email = 'furet-ui-thumbnail-field-email'


/**
 * furet-ui-form-field-email component is used to manage email on form
 * resource (``furet-ui-resource-form``).
 *
 * @example
 *  <furet-ui-form-field-email
 *    :config="aConfigObject"
 *    :data="aDataObject"
 *    :resource="aResourceObject"/>
 *
 * @param {Object} config - A config object to manage the behaviour of the component
 * @param {Object} data - An object that contains data to display. The key to use
 *                        in set in the `config.key`
 * @param {Object} resource - A resource object used to properly bind data with parents
 *                            tags and manage reactivity.
 *
 * ``config`` Object contains
 * @param {String} name - the key to use in the ``data`` object where is store the value
 * @param {String?} placeholder - A placeholder to help user to know what to collect
 * @param {String?} length - A max size
 * @param {String?} icon - A fontawesome icon name
 */
defineComponent('furet-ui-form-field-email', {
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
          v-bind:value="value"
        />
        <span v-else>{{ value }}</span>
      </div>
      <b-input 
        v-else
        type="email"
        v-bind:value="value" 
        v-on:input="updateValue"
        v-bind:maxlength="config.maxlength"
        v-bind:placeholder="config.placeholder"
        icon-pack="fa"
        v-bind:icon="config.icon"
        v-bind:key="config.key"
      />
    </furet-ui-form-field-common-tooltip-field>
  `,
  extend: ['furet-ui-form-field-common'],
})
fields.form.email = 'furet-ui-form-field-email'
