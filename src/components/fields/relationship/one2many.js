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
import {pk2string} from '../../../store/modules/data';
import _ from 'underscore';


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


defineComponent('furet-ui-form-field-one2many', {
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
        v-bind:value="value"
        v-bind:config="config"

        v-on:add="o2m_add"
        v-on:update="o2m_update"
        v-on:delete="o2m_delete"
      />
    </furet-ui-form-field-common-tooltip>
  `,
  extend: ['furet-ui-form-field-common'],
  prototype: {
    methods: {
      addState(actions, state) {
        const pks = pk2string(actions.pks)
        const newvalue = _.map(this.value, value => {
          if (pk2string(value) === pks) {
            value.__x2m_state = state;
          }
          return value;
        })
        return newvalue;
      },
      o2m_add (actions) {
        const newvalue = _.map(this.value, value => value)
        if (!_.find(newvalue, value => value.uuid === actions.uuid)) {
          newvalue.push({__x2m_state: 'ADDED', uuid: actions.uuid})
        }
        this.updateValue(newvalue, actions.changes)
      },
      o2m_update (actions) {
        this.updateValue(this.addState(actions, 'UPDATED'), actions.changes)
      },
      o2m_delete (actions) {
        this.updateValue(this.addState(actions, 'DELETED'))
      },
    },
  }
})
fields.form.one2many = 'furet-ui-form-field-one2many'
