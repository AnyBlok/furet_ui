/**
This file is a part of the FuretUI project

   Copyright (C) 2020 Pierre Verkest <pierrevekrest84@gmail.com>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import { defineComponent } from "../../factory";
import { fields } from "../fields";
import { RelationShipX2MList } from "./common";

/**
 * furet-ui-field-many2many-common component is a mixin used to manage relationship many2one
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
 * @param {String} model - A model name, needed to display the data
 * @param {String} display - An evaluate string to display the entry
 */
defineComponent("furet-ui-field-many2many-common", {
  prototype: {
    computed: {
      values() {
        const res = [];
        const display = this.config.display;
        const model = this.config.model;
        if (this.value === null) {
          return [];
        }
        this.value.forEach((pk) => {
          res.push({
            pk,
            label: this.format(display, this.getEntry(model, pk)),
          });
        });
        return res;
      },
    },
    methods: {
      openResource(value) {
        const params = { code: this.$route.params.code, menuId: 0, id: 0 };
        if (this.config.menu) params.menuId = this.config.menu;
        if (this.config.resource) {
          const query = { mode: "form", pks: JSON.stringify(value.pk) };
          params.id = this.config.resource;
          this.pushInBreadcrumb();
          this.$router.push({ name: "resource", params, query });
        }
      },
    },
  },
});

/**
 * furet-ui-list-field-many2many component is used to manage relationship many2many on list
 * resource (``furet-ui-resource-list``).
 *
 * Extend Mixins:
 *  * @see ``furet-ui-list-field-common``
 *  * @see ``furet-ui-field-relationship``
 *
 * @example
 *  <furet-ui-list-field-many2many
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
defineComponent("furet-ui-list-field-many2many", {
  template: RelationShipX2MList,
  extend: [
    "furet-ui-list-field-common",
    "furet-ui-field-relationship",
    "furet-ui-field-many2many-common",
  ],
  prototype: {
    computed: {},
    methods: {},
  },
});
fields.list.many2many = "furet-ui-list-field-many2many";

/**
 * furet-ui-form-field-many2many component is used to manage relationship many2many on form
 * resource (``furet-ui-resource-form``).
 *
 * Extend Mixins:
 *  * @see ``furet-ui-list-field-common``
 *
 * @example
 *  <furet-ui-form-field-many2many
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
defineComponent("furet-ui-form-field-many2many", {
  template: `
    <furet-ui-form-field-common-tooltip-field
      v-bind:resource="resource"
      v-bind:data="data"
      v-bind:config="config"
    >
      <div v-if="isReadonly" >
          <div class="buttons">
            <b-button 
              v-on:click.stop="openResource(record)"
              v-for="record in values"
              :key="getKey(record)"
              type="is-info"
              size="is-small"
              >
                {{ record.label }}
            </b-button>
        </div>
    </div>
    <b-taginput
        v-else
        v-bind:value="values"
        v-bind:data="choices"
        autocomplete
        ref="taginput"
        v-bind:placeholder="config.placeholder"
        v-bind:allow-new="false"
        v-bind:open-on-focus="false"
        icon-pack="fa"
        type="is-info"
        v-bind:icon="config.icon"
        v-on:typing="onChange"
        v-on:add="onSelect"
        v-on:remove="onUnSelect">
        <template slot="empty">
            No data found with current filter.
        </template>
        <!-- template to display search results -->
        <template slot-scope="searched">
            {{searched.option.label}}
        </template>
        <template slot="selected" slot-scope="props">
          <b-tag
            v-for="(tag, index) in props.tags"
                        :key="index"
                        :type="getType(tag)"
                        :tabstop="false"
                        :closable="isClosable(tag)"
                        @close="$refs.taginput.removeTag(index, $event)">
                        {{tag.label}}
                    </b-tag>
        </template>
      </b-taginput>
    </furet-ui-form-field-common-tooltip-field>
  `,
  extend: [
    "furet-ui-form-field-common",
    "furet-ui-field-relationship",
    "furet-ui-field-many2many-common",
    "furet-ui-field-relationship-search",
  ],
  prototype: {
    methods: {
      isClosable(value) {
        if (value.pk.__x2m_state && value.pk.__x2m_state === "UNLINKED") {
          return false;
        }
        return true;
      },
      getType(value) {
        if (value.pk.__x2m_state && value.pk.__x2m_state === "UNLINKED") {
          return "";
        }
        return "is-primary";
      },
      onUnSelect(value) {
        const data = {};
        // data[this.config.model] = {};
        // const pks = this.getKey(value);
        // data[this.config.model][pks] = Object.assign(
        //   { __change_state: "unlink" },
        //   value
        // );
        const values = Object.assign([], this.value);
        if (value.pk.__x2m_state && value.pk.__x2m_state === "LINKED") {
          // values.splice(values.indexOf(value), 1);
          Object.assign(values[values.indexOf(value.pk)], {
            __revert: true,
          });
        } else {
          Object.assign(values[values.indexOf(value.pk)], {
            __x2m_state: "UNLINKED",
          });
        }
        this.updateValue(values, data);
      },
      onSelect(value) {
        const data = {};
        // data[this.config.model] = {};
        // const pks = this.getKey(value);
        // data[this.config.model][pks] = Object.assign(
        //   { __change_state: "link" },
        //   value
        // );
        this.updateValue(
          this.value.concat([
            Object.assign({}, value.pk, { __x2m_state: "LINKED" }),
          ]),
          data
        );
      },
    },
  },
});
fields.form.many2many = "furet-ui-form-field-many2many";
