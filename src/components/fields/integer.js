/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import { defineComponent } from "../factory";
import { fields } from "./fields";
import { listTemplate, thumbnailTemplate } from "./common";

defineComponent("furet-ui-list-field-integer", {
  template: listTemplate,
  extend: ["furet-ui-list-field-common"]
});
fields.list.integer = "furet-ui-list-field-integer";

defineComponent("furet-ui-thumbnail-field-integer", {
  template: thumbnailTemplate,
  extend: ["furet-ui-thumbnail-field-common"]
});
fields.thumbnail.integer = "furet-ui-thumbnail-field-integer";
fields.kanban.integer = "furet-ui-thumbnail-field-integer";

/**
 * furet-ui-form-field-integer component is used to manage integer on form
 * resource (``furet-ui-resource-form``).
 *
 * @example
 *  <furet-ui-form-field-integer
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
 */
defineComponent("furet-ui-form-field-integer", {
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
      <b-numberinput 
        v-else
        step="1"
        controlsPosition="compact"
        expanded
        icon-pack="fa"
        v-bind:value="value" 
        v-on:input="updateValue"
        v-bind:min="format_min_max(config.min)"
        v-bind:max="format_min_max(config.max)"
        v-bind:key="config.key"
        v-bind:icon="config.icon"
        v-bind:placeholder="config.placeholder"
      />
    </furet-ui-form-field-common-tooltip-field>
  `,
  extend: ["furet-ui-form-field-common"],
  prototype: {
    methods: {
      format_min_max (value) {
        if (value === null) return undefined;
        return value;
      },
    },
  },
});
fields.form.integer = "furet-ui-form-field-integer";
