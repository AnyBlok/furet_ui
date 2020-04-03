/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
// import _ from 'underscore';
import axios from 'axios';
import {defineComponent} from '../../factory'
import {fields} from '../fields';


/**
 * furet-ui-field-many2one component is a mixin used to manage relationship many2one
 *
 * @mixin
 *
 * @param {Object} config - A config object to manage the behaviour of the component
 * @param {Object} data - An object that contains data to display. The key to use
 *                        in set in the `config.key`
 * @param {Object} resource - A resource object used to properly bind data with parents
 *                            tags and manage reactivity.
 *
 * ``config`` Object contains
 * @param {String} name - the key to use in the ``data`` object where is store the value
 * @param {String} model - A model name, needed to display the data
 * @param {String} display - An evaluate string to display the entry
 */
defineComponent('furet-ui-field-many2one-common', {
  prototype: {
    computed: {
      value () {
        const value = this.data[this.config.name] || '';
        if (value) {
          const model = this.config.model; 
          return this.format(this.config.display, this.getEntry(model, value));
        } else return ''
      }
    },
    methods: {
      onClick () {
        const value = this.data[this.config.name];
        if (value) this.openResource(value);
      },
    },
  },
})


/**
 * furet-ui-list-field-many2one component is used to manage relationship many2one on list
 * resource (``furet-ui-resource-list``).
 *
 * Extend Mixins:
 *  * @see ``furet-ui-list-field-common``
 *  * @see ``furet-ui-field-relationship``
 *  * @see ``furet-ui-field-many2one-common``
 *
 * @example
 *  <furet-ui-list-field-many2one
 *    :config="aConfigObject"
 *    :data="aDataObject"
 *    :resource="aResourceObject"/>
 *
 * @mixes <furet-ui-list-field-common>, <furet-ui-field-relationship>, <furet-ui-field-many2one-common>
 *
 * @param {Object} config - A config object to manage the behaviour of the component
 * @param {Object} data - An object that contains data to display. The key to use
 *                        in set in the `config.key`
 * @param {Object} resource - A resource object used to properly bind data with parents
 *                            tags and manage reactivity.
 *
 * ``config`` Object contains
 * @param {String} name - the key to use in the ``data`` object where is store the value
 * @param {String} model - A model name, needed to display the data
 * @param {String} display - An evaluate string to display the entry
 */
defineComponent('furet-ui-list-field-many2one', {
  template: `
    <div>
      <span v-if="isHidden" />
      <a v-else v-on:click.stop="onClick">{{value}}</a>
    </div>`,
  extend: [
    'furet-ui-list-field-common',
    'furet-ui-field-relationship',
    'furet-ui-field-many2one-common',
  ],
})
fields.list.many2one = 'furet-ui-list-field-many2one'


/**
 * furet-ui-form-field-many2one component is used to manage relationship many2one on form
 * resource (``furet-ui-resource-form``).
 *
 * Extend Mixins:
 *  * @see ``furet-ui-form-field-common``
 *  * @see ``furet-ui-field-relationship``
 *  * @see ``furet-ui-field-many2one-common``
 *
 * @example
 *  <furet-ui-form-field-many2one
 *    :config="aConfigObject"
 *    :data="aDataObject"
 *    :resource="aResourceObject"/>
 *
 * @mixes <furet-ui-form-field-common>, <furet-ui-field-relationship>, <furet-ui-field-many2one-common>
 *
 * @param {Object} config - A config object to manage the behaviour of the component
 * @param {Object} data - An object that contains data to display. The key to use
 *                        in set in the `config.key`
 * @param {Object} resource - A resource object used to properly bind data with parents
 *                            tags and manage reactivity.
 *
 * ``config`` Object contains
 * @param {String} name - the key to use in the ``data`` object where is store the value
 * @param {String?} icon - An icon to display on the left of the component
 * @param {String?} placeholder - A placeholder to help user to know what to collect
 * @param {String} model - A model name, needed to display the data
 * @param {Array[String]} fields - Names of field to get by api
 * @param {Array[String]} filter_by - Names of field used to create filter during call of the api
 * @param {String} display - An evaluate string to display the entry
 * @param {Integer} limit - Apply a limit in the api query
 */
defineComponent('furet-ui-form-field-many2one', {
  template: `
    <furet-ui-form-field-common-tooltip-field
      v-bind:resource="resource"
      v-bind:data="data"
      v-bind:config="config"
    >
      <a v-if="isReadonly" v-on:click.stop="onClick">{{value}}</a>
      <b-autocomplete
        v-else
        v-bind:value="value"
        v-bind:data="choices"
        field="label"
        v-bind:placeholder="config.placeholder"
        icon-pack="fa"
        v-bind:icon="config.icon"
        v-on:typing="onChange"
        v-on:select="onSelect"
      />
    </furet-ui-form-field-common-tooltip-field>
  `,
  extend: [
    'furet-ui-form-field-common',
    'furet-ui-field-relationship',
    'furet-ui-field-many2one-common',
  ],
  prototype: {
    data () {
        return {
            pks: [],
        };
    },
    computed: {
      choices () {
        const res = [];
        this.pks.forEach(pk => {
          res.push({
              pk,
              label: this.format(this.config.display, this.getEntry(this.config.model, pk)),
          })
        });
        return res
      },
    },
    methods: {
      onSelect (value) {
        this.updateValue(value.pk)
      },
      onChange (value) {
        if (this.value) this.updateValue(null)
        const params = {
          model: this.config.model,
          fields: this.config.fields.toString(),
          limit: this.config.limit,
        }
        this.config.filter_by.forEach(filter => {
          params[`filter[${filter}][ilike]`] = value
        })
        axios.get('/furet-ui/crud', { params })
          .then((response) => {
            this.$dispatchAll(response.data.data);
            this.pks = response.data.pks
            this.loading = false;
          })
      },
    },
  },
})
fields.form.many2one = 'furet-ui-form-field-many2one'
