/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import {defineComponent} from '../factory'
import {fields} from './fields';
import VueBarcode from 'vue-barcode';

defineComponent('furet-ui-list-field-barcode', {
  template:`
    <span v-if="isHidden" />
    <barcode v-else v-bind:value="value" v-bind="config.options">
      Can't generate the barcode
    </barcode>
  `,
  extend: ['furet-ui-list-field-common'],
  prototype: {
    components: {
      barcode: VueBarcode
    },
  },
})
fields.list.barcode = 'furet-ui-list-field-barcode'


defineComponent('furet-ui-form-field-barcode', {
  template: `
    <furet-ui-form-field-common-tooltip-field
      v-bind:resource="resource"
      v-bind:data="data"
      v-bind:config="config"
    >
      <barcode v-if="isReadonly" v-bind:value="value" v-bind="config.options">
        Can't generate the barcode
      </barcode>
      <b-input 
        v-else
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
  prototype: {
    components: {
      barcode: VueBarcode
    },
  },
})
fields.form.barcode = 'furet-ui-form-field-barcode'
