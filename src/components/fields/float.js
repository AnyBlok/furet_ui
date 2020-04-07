/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import { defineComponent } from "../factory";
import { fields } from "./fields";
import { listTemplate } from "./common";


defineComponent("furet-ui-list-field-float", {
  template: listTemplate,
  extend: ["furet-ui-list-field-common"],
  prototype: {
    computed: {
      value () {
        const value =  this.data[this.config.name] || '';
        if (value) return Number(value).toFixed(this.config.rounded || 2)
        return '';
      },
    }
  }
});
fields.list.float = "furet-ui-list-field-float";

/**
 * furet-ui-form-fieldfloatinteger component is used to manage float on form
 * resource (``furet-ui-resource-form``).
 *
 * @example
 *  <furet-ui-form-field-float
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
 * @param {String?} icon - An icon to display on the left of the component
 * @param {String?} placeholder - A placeholder to help user to know what to collect
 * @param {Integer?} step - Incremental number step
 */
defineComponent("furet-ui-form-field-float", {
  template: `
    <furet-ui-form-field-common-tooltip-field
      v-bind:resource="resource"
      v-bind:data="data"
      v-bind:config="config"
    >
      <span v-if="isReadonly">{{ value }}</span>
      <b-input 
        v-else
        type="number"
        v-bind:step="step"
        icon-pack="fa"
        v-bind:value="rounded_value" 
        v-on:input="updateValue"
        v-bind:min="config.min"
        v-bind:max="config.max"
        v-bind:key="config.key"
        v-bind:icon="config.icon"
        v-bind:placeholder="config.placeholder"
      />
    </furet-ui-form-field-common-tooltip-field>
  `,
  extend: ["furet-ui-form-field-common"],
  prototype: {
    computed: {
      rounded () {
        return this.config.rounded || 2;
      },
      step () {
        return Math.pow(0.1, this.rounded).toFixed(this.rounded);
      },
      rounded_value () {
        return Number(this.value).toFixed(this.rounded);
      },
    },
  },
});
fields.form.float = "furet-ui-form-field-float";
