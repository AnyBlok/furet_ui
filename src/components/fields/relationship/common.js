/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import axios from "axios";
import { defineComponent } from "../../factory";
import { pk2string } from "../../../store/modules/data";
import { debounce } from "debounce";

const safe_eval = (style, fields) => {
  fields; // lint
  return eval(style);
};

/**
 * furet-ui-field-relationship component is a mixin used to manage relationship to add
 * helper:
 *
 *   * format: function to display an entry of the relationship
 *   * openResource: strategie to open the resource as the main resource
 *   * getKey: transform primary key to string
 *   * getStyle: return a style string for ``a`` tag
 *
 * added injection:
 *   * getEntry
 *   * pushInBreadcrumb
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
defineComponent("furet-ui-field-relationship", {
  prototype: {
    inject: ["getEntry", "pushInBreadcrumb"],
    methods: {
      format(display, fields) {
        return safe_eval(display, fields);
      },
      getKey(value) {
        return pk2string(value.pk);
      },
      getStyle(value) {
        let style = "";
        if (this.config.style !== undefined) {
          const data = this.getEntry(this.config.model, value.pk);
          style = safe_eval(this.config.style, data, {});
        }
        return style;
      },
      openResource(value) {
        const params = { code: this.$route.params.code, menuId: 0, id: 0 };
        if (this.config.menu) params.menuId = this.config.menu;
        if (this.config.resource) {
          const query = { mode: "form", pks: JSON.stringify(value) };
          params.id = this.config.resource;
          this.pushInBreadcrumb();
          this.$router.push({ name: "resource", params, query });
        }
      },
    },
  },
});

export const RelationShipX2MList = `
  <div>
    <span v-if="isHidden" />
    <div v-else>
      <span 
        v-for="value in values"
        class="tag" 
        v-bind:key="getKey(value)"
        v-bind:style="getStyle(value)"
      >
        <a v-on:click.stop="openResource(value)">{{value.label}}</a>
      </span>
    </div>
  </div>`;

defineComponent("furet-ui-field-relationship-search", {
  prototype: {
    data() {
      return {
        pks: [],
      };
    },
    computed: {
      choices() {
        const res = [];
        this.pks.forEach((pk) => {
          res.push({
            pk,
            label: this.format(
              this.config.display,
              this.getEntry(this.config.model, pk)
            ),
          });
        });
        return res;
      },
    },
    methods: {
      beforeOnChange() {
        /** Method to overwrite in order to
         * clear current value before searching things.
         */
      },
      onChange: debounce(function(value) {
        this._onChange(value);
      }, 200),
      _onChange(value) {
        this.beforeOnChange();
        const params = {
          "context[model]": this.config.model,
          "context[fields]": this.config.fields.toString(),
          limit: this.config.limit,
        };
        this.config.filter_by.forEach((filter) => {
          params[`filter[${filter}][ilike]`] = value;
        });
        if (this.value && Array.isArray(this.value)) {
          // TODO: We needs to improuve in case of composite key
          const first_key = this.config.remote_columns[0];
          const key_values = this.value
            .map((key) => {
              return key[first_key];
            })
            .join(",");
          if (key_values) params[`~filter[${first_key}][in]`] = key_values;
        }
        axios
          .get(`/furet-ui/resource/${this.resource.id}/crud`, { params })
          .then((response) => {
            this.$dispatchAll(response.data.data);
            this.pks = response.data.pks;
            this.loading = false;
          });
      }
    },
  },
});
