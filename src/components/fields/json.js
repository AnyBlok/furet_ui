/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import {defineComponent} from '../factory'
import {fields} from './fields';

const format = (value) => {
  if (value)
    try {
        let parsed = value;
        if (typeof value === "string") {
            parsed = JSON.parse(value)
        }
      return JSON.stringify(parsed, null, 2);
    } catch (e) {
      // console.error('Fields.Json : parse json', e)
      return null
    }
  return value;
}


/**
 * furet-ui-list-field-json component is used to manage json/jsonb on list
 * resource (``furet-ui-resource-list``).
 *
 * @example
 *  <furet-ui-form-field-json
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
 */
defineComponent('furet-ui-list-field-json', {
  template: `
    <div>
      <span v-if="isHidden" />
      <pre 
        v-else
        v-bind:style="{width: '100%', padding: 2, backgroundColor: 'white'}"
      >{{value}}</pre>
    </div>`,
  extend: ['furet-ui-list-field-common'],
  prototype: {
    computed: {
      value () {
        const value = this.data[this.config.name] || '';
        return format(value)
      },
    },
  },
})
fields.list.json = 'furet-ui-list-field-json'
fields.list.jsonb = 'furet-ui-list-field-json'

defineComponent('furet-ui-thumbnail-field-json', {
  template: `
    <furet-ui-thumbnail-field-common-tooltip-field
      v-bind:resource="resource"
      v-bind:data="data"
      v-bind:config="config"
    >
      <pre 
        v-bind:style="{width: '100%', padding: 2, backgroundColor: 'white'}"
      >{{value}}</pre>
    </furet-ui-thumbnail-field-common-tooltip-field>
  `,
  extend: ['furet-ui-thumbnail-field-common'],
  prototype: {
    computed: {
      value () {
        const value = this.data[this.config.name] || '';
        return format(value)
      },
    },
  },
})
fields.thumbnail.json = 'furet-ui-thumbnail-field-json'
fields.thumbnail.jsonb = 'furet-ui-thumbnail-field-json'
fields.kanban.json = 'furet-ui-thumbnail-field-json'
fields.kanban.jsonb = 'furet-ui-thumbnail-field-json'

/**
 * furet-ui-form-field-json component is used to manage json/jsonb on form
 * resource (``furet-ui-resource-form``).
 *
 * @example
 *  <furet-ui-form-field-json
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
 */
defineComponent('furet-ui-form-field-json', {
  template: `
    <furet-ui-form-field-common-tooltip
      v-bind:resource="resource"
      v-bind:data="data"
      v-bind:config="config"
    >
      <b-field 
        v-bind:label="config.label"
        v-bind:type="getType"
        v-bind:message="getMessage"
        v-bind:style="{'width': 'inherit'}"
      >
        <pre v-if="isReadonly"
            v-bind:style="{width: '100%', padding: 2, backgroundColor: 'white'}"
        >{{value}}</pre>
        <b-input 
          type="textarea"
          v-else 
          v-bind:value="value" 
          v-on:input="updateValue"
          v-bind:placeholder="config.placeholder"
        />
      </b-field>
    </furet-ui-form-field-common-tooltip>
  `,
  extend: ['furet-ui-form-field-common', 'furet-ui-form-field-common-tooltip-field'],
  prototype: {
    computed: {
      raw_value () {
        return this.data[this.config.name] || '';
      },
      value () {
        return format(this.raw_value)
      },
      getType () {
        if (this.isRequired) {
          if (this.raw_value) {
            if (this.isJsonInvalid) return 'is-danger';
            return 'is-info';
          }
          return 'is-danger';
        }
        if (this.isJsonInvalid) return 'is-danger';
        return '';
      },
      getMessage () {
        if (this.isRequired) {
          if (!this.value) {
            if (this.isJsonInvalid) return this.$t('components.fields.json.invalid');
            return this.$i18n.t('components.fields.common.required');
          }
        }
        if (this.isJsonInvalid) return this.$t('components.fields.json.invalid');
        return ''
      },
      isJsonInvalid () {
        if (!this.isReadonly) {
          if (! this.raw_value) return false
          try {
            JSON.parse(this.raw_value)
          } catch (e) {
            // console.error(e, this.raw_value)
            return true;
          }
        }
        return false;
      },
    },
  },
})
fields.form.json = 'furet-ui-form-field-json'
fields.form.jsonb = 'furet-ui-form-field-json'
