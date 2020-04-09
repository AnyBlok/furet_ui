/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import {defineComponent} from '../factory'
import { debounce } from 'debounce';


/**
 * Eval a value (that could be anything String / integer / null / undefined / bool)
 * and cast as a boolean or null.
 *
 * @param {any} value - A value to cast to boolean
 * @returns {Boolean?} return one of those values [true, false, null]
 *
 * Have a look to tests/unit/fields/boolean.spec.js for a complet list of
 * use case.
 */
export const safe_eval_boolean = value => {
  if (value === null || value === undefined) {
    return null;
  }

  // if dev use new String("") or new Boolean(true) this give an object so
  // we convert to its primitive type
  if (
    typeof value === "object" &&
    ["[object String]", "[object Boolean]"].includes(toString.call(value))
  ) {
    value = value.valueOf();
  }

  if (typeof value === "string") {
    if (
      value.trim().toLowerCase() === "null" ||
      value.trim().toLowerCase() === "undefined"
    ) {
      return null;
    }
    return ["true", "t", "yes", "y", "on", "1"].includes(
      value.trim().toLowerCase()
    );
  }

  if (typeof value === "number") {
    return value === 1;
  }

  if (typeof value === "boolean") {
    return value;
  }

  return false;
};

export const safe_eval = (condition, fields, resource) => {
    const now = Date.now(),
          toDate = (v) => new Date(v),
          selectors = Object.assign((resource.manager || {}).selectors || {}, resource.selectors || {}),
          tabs = resource.tabs;
    fields  // lint
    selectors  // lint
    tabs  // lint
    now  // lint
    toDate  // lint
    let res = false;
    try {
        res = eval(condition) ? true : false;
    } catch (e) {
      console.log(e)
    }
    return res;
}

export const listTemplate = `
  <div>
    <span v-if="isHidden" />
    <span v-else>{{value}}</span>
  </div>
`


defineComponent('furet-ui-list-field-common', {
  prototype: {
    props: ['resource', 'data', 'config'],
    computed: {
      value () {
        return this.data[this.config.name] || '';
      },
      isHidden () {
        if (this.config.hidden === undefined) return false;
        return safe_eval(this.config.hidden, this.data || {}, this.resource);
      },
    },
  }
});


defineComponent('furet-ui-form-field-common-tooltip', {
  template: `
    <div v-if="isHidden" />
    <b-tooltip 
      v-bind:label="getTooltip" 
      v-bind:position="tooltipPosition"
      v-bind:style="{'width': '100%'}"
      v-else
    >
      <slot />
    </b-tooltip>`,
  prototype: {
    props: ['resource', 'data', 'config'],
    computed: {
      isHidden () {
        if (this.config.hidden === undefined) return false;
        return safe_eval(this.config.hidden, this.data || {}, this.resource);
      },
      getTooltip () {
        return this.config.tooltip || '';
      },
      tooltipPosition () {
        return this.config.tooltip_position || 'is-top';
      },
    },
  },
})


defineComponent('furet-ui-form-field-common-tooltip-field', {
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
        <slot />
      </b-field>
    </furet-ui-form-field-common-tooltip>`,
  prototype: {
    props: ['resource', 'data', 'config'],
    computed: {
      value () {
        return this.data && this.data[this.config.name] || '';
      },
      isRequired () {
        return safe_eval(this.config.required, this.data || {}, this.resource);
      },
      getType () {
        if (this.isRequired) {
          if (this.value) return 'is-info';
          return 'is-danger';
        }
        return '';
      },
      getMessage () {
        if (this.isRequired) {
          if (!this.value) return this.$i18n.t('fields.common.required');
        }
        return ''
      },
    },
  },
})


defineComponent('furet-ui-form-field-common-readonly', {
  prototype: {
    props: ['resource', 'data', 'config'],
    inject: ['partIsReadonly'],
    computed: {
      isReadonly () {
        if (this.resource.readonly) return true;
        if (this.partIsReadonly()) return true;
        const readonlyParams = safe_eval(this.config.readonly, this.data || {}, this.resource);
        if (this.config.writable) {
          const writableParams = safe_eval(this.config.writable, this.data || {}, this.resource);
          return readonlyParams && ! writableParams
        }
        return readonlyParams;
      },
    },
  },
})


defineComponent('furet-ui-form-field-common', {
  extend: ['furet-ui-form-field-common-readonly'],
  prototype: {
    inject: ['updateChangeState'],
    computed: {
      value () {
        return this.data && this.data[this.config.name] || null;
      },
    },
    methods: {
      updateValue: debounce(function(value, merge) {
        const action = {
          model: this.resource.model,
          pk: this.resource.pks,
          uuid: this.resource.uuid,
          fieldname: this.config.name,
          value,
          merge
        }
        this.updateChangeState(action);
      }, 200),
    },
  }
});
