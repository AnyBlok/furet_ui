/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import {defineComponent} from '../../factory'
import {fields} from '../fields';
import {RelationShipX2MList} from './common';
import { pk2string } from "../../../store/modules/data";


/**
 * furet-ui-list-field-one2many component is used to manage relationship one2many on list
 * resource (``furet-ui-resource-list``).
 *
 * Extend Mixins:
 *  * @see ``furet-ui-list-field-common``
 *  * @see ``furet-ui-field-relationship``
 *
 * @example
 *  <furet-ui-list-field-one2many
 *    :config="aConfigObject"
 *    :data="aDataObject"
 *    :resource="aResourceObject"/>
 *
 * @mixes <furet-ui-list-field-common>, <furet-ui-field-relationship>
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
defineComponent('furet-ui-list-field-one2many', {
  template: RelationShipX2MList,
  extend: ['furet-ui-list-field-common', 'furet-ui-field-relationship'],
  prototype: {
    computed: {
      values () {
        const res = [];
        const display = this.config.display;
        const model = this.config.model;
        this.value.forEach(pk => {
          res.push({
            pk,
            label: this.format(display, this.getEntry(model, pk)),
          });
        });
        return res;
      },
    },
  },
})
fields.list.one2many = 'furet-ui-list-field-one2many'


/**
 * furet-ui-form-field-one2many component is used to manage relationship one2many on form
 * resource (``furet-ui-resource-form``).
 *
 * Extend Mixins:
 *  * @see ``furet-ui-list-field-common``
 *
 * @example
 *  <furet-ui-form-field-one2many
 *    :config="aConfigObject"
 *    :data="aDataObject"
 *    :resource="aResourceObject"/>
 *
 * @mixes <furet-ui-list-field-common>
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
 * @param {Integer} resource - Id of the resource to used
 */
defineComponent("furet-ui-form-field-one2many", {
  template: `
    <furet-ui-form-field-common-tooltip
      v-bind:resource="resource"
      v-bind:data="data"
      v-bind:config="config"
    >
      <furet-ui-form-field-resource-manager
        v-bind:id="config.resource"
        v-bind:x2m_resource="resource"
        v-bind:isReadonly="isReadonly"
        v-bind:config="config"

        v-on:add="o2m_add"
        v-on:update="o2m_update"
        v-on:delete="o2m_delete"
      />
    </furet-ui-form-field-common-tooltip>
  `,
  extend: ["furet-ui-form-field-common"],
  prototype: {
    methods: {
      addState(actions, state) {
        return [Object.assign({}, actions.pks, { __x2m_state: state})];
      },
      o2m_add(actions) {
        const newvalue = [];
        newvalue.push({ __x2m_state: "ADDED", uuid: actions.uuid });
        this.updateValue(newvalue, actions.changes);
      },
      o2m_update(actions) {
        this.updateValue(this.addState(actions, "UPDATED"), actions.changes);
      },
      o2m_delete(actions) {
        const data = {};
        data[actions.model] = {};
        const pks = pk2string(actions.pks);
        data[actions.model][pks] = Object.assign({__change_state: "delete"}, actions.pks);
        this.updateValue(this.addState(actions, "DELETED"), data);
      }
    }
  }
});
fields.form.one2many = "furet-ui-form-field-one2many";
