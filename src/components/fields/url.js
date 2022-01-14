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


defineComponent('furet-ui-list-field-url', {
  template: listTemplate,
  extend: ['furet-ui-list-field-common'],
})
fields.list.url = 'furet-ui-list-field-url'


defineComponent('furet-ui-thumbnail-field-url', {
  template: thumbnailTemplate,
  extend: ['furet-ui-thumbnail-field-common'],
})
fields.thumbnail.url = 'furet-ui-thumbnail-field-url'
fields.kanban.url = 'furet-ui-thumbnail-field-url'


/**
 * furet-ui-form-field-url component is used to manage url/uri on form
 * resource (``furet-ui-resource-form``).
 *
 * @example
 *  <furet-ui-form-field-url
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
defineComponent('furet-ui-form-field-url', {
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
      <div 
        v-else
        class="field has-addons" 
      >
        <p class="control is-expanded">
          <b-input 
            v-bind:value="value" 
            v-on:input="updateValue"
            v-bind:maxlength="config.maxlength"
            v-bind:placeholder="config.placeholder"
            icon-pack="fa"
            v-bind:icon="config.icon"
            v-bind:key="config.key"
          />
        </p>
        <p class="control" v-if="value">
          <a class="button" v-bind:href="value" target="_blank">
            <b-icon icon="external-link-alt"></b-icon>
          </a>
        </p>
      </div>
    </furet-ui-form-field-common-tooltip-field>
  `,
  extend: ['furet-ui-form-field-common'],
})
fields.form.url = 'furet-ui-form-field-url'
