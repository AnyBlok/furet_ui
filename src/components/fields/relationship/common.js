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
    computed: {
      slot_fields() {
        const value = this.data[this.config.name] || "";
        return this.get_slot_fields_for(value);
      },
      component_template () {
        return {
          template: this.config.slot,
          props: ['resource', 'data', 'config', 'relation'],
        }
      }
    },
    methods: {
      get_slot_fields_for(value) {
        if (value) {
          const model = this.config.model;
          return this.getEntry(model, value);
        } else return {};
      },
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
        <a v-if="config.slot" v-on:click.stop="openResource(value)">
          <component 
            v-bind:is="component_template"
            v-bind:config="config"
            v-bind:resource="resource"
            v-bind:data="data"
            v-bind:relation="get_slot_fields_for(value.pk)"
          />
        </a>
        <a v-else v-on:click.stop="openResource(value)">{{value.label}}</a>
      </span>
    </div>
  </div>`;

defineComponent("furet-ui-field-relationship-search", {
  prototype: {
    data() {
      return {
        pks: [],
        page: 0,
        total: null,
        isFetching: false,
        tmp_value: null,
      };
    },
    computed: {
      choices() {
        const res = [];
        this.pks.forEach((pk) => {
          const relation = this.getEntry(this.config.model, pk);
          res.push({
            pk,
            label: this.format(this.config.display, relation),
            relation,
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
      getMoreAsyncData: debounce(function () {
        this._onChange(this.tmp_value)
      }, 250),
      _onChange(value) {
        this.beforeOnChange();
        if ((this.tmp_value !== value) || (!value.length)) {
          this.tmp_value = value;
          this.pks = [];
          this.page = 0;
          this.total = null;
        }
        if (this.total != null) {
          if (this.page * this.config.limit >= this.total) {
            return
          }
        }
        const params = {
          "context[model]": this.config.model,
          "context[fields]": this.config.fields.toString(),
          limit: this.config.limit,
          offset: this.page * this.config.limit,
        };
        this.config.filter_by.forEach((filter) => {
          params[`filter[${filter}][ilike]`] = value;
        });
        if (this.value && Array.isArray(this.value) && this.value.length > 0) {
          const pks = this.config.remote_columns.join(":");
          const values = this.value
            .map((val) => {
              return this.config.remote_columns.map(key => {
                return val[key]
              }).join(":");
            })
            .join(",");
          if (values) params[`~primary-keys[${pks}]`] = values;
        }
        this.isFetching = true
        axios
          .get(`/furet-ui/resource/${this.resource.id}/crud`, { params })
          .then((response) => {
            this.$dispatchAll(response.data.data);
            response.data.pks.forEach((item) => this.pks.push(item));
            this.page++;
            this.total = response.data.total;
          })
          .catch((/* error */) => {
            // console.error(error);
          })
          .finally(() => {
            this.isFetching = false
          });
      }
    },
  },
});
