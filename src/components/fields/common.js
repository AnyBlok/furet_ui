/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import { debounce } from "debounce";
import {defineComponent} from '../factory'


export const safe_eval = (condition, fields) => {
    const now = Date.now(),
          toDate = (v) => new Date(v);
    fields  // lint
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
        return safe_eval(this.config.hidden, this.data || {});
      },
    },
  }
});


// defineComponent('furet-ui-thumbnail-field-common', {
//   template: `
//     <div v-if="this.isHidden" />
//     <b-tooltip 
//         v-bind:label="getTooltip" 
//         v-bind:position="tooltipPosition"
//         v-bind:style="{'width': '100%'}"
//         v-else
//     >
//         <b-field 
//             v-bind:label="this.config.label"
//             v-bind:style="{'width': 'inherit'}"
//         >
//             <span>{{value}}</span>
//         </b-field>
//     </b-tooltip>
//   `,
//   prototype: {
//     props: ['data', 'config'],
//     computed: {
//       value () {
//         return this.data && this.data[this.config.name] || '';
//       },
//       isHidden () {
//         return safe_eval(this.config.hidden, this.data || {});
//       },
//       getTooltip () {
//           return this.config.tooltip || '';
//       },
//       tooltipPosition () {
//           return this.config.tooltip_position || 'is-top';
//       },
//     },
//   }
// });


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
    props: ['data', 'config'],
    computed: {
      isHidden () {
        if (this.config.hidden === undefined) return false;
        return safe_eval(this.config.hidden, this.data || {});
      },
      getTooltip () {
        return this.$t(this.config.tooltip || '');
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
      v-bind:data="data"
      v-bind:config="config"
    >
      <b-field 
        v-bind:label="$t(config.label)"
        v-bind:type="getType"
        v-bind:message="getMessage"
        v-bind:style="{'width': 'inherit'}"
      >
        <slot />
      </b-field>
    </furet-ui-form-field-common-tooltip>`,
  prototype: {
    props: ['data', 'config'],
    computed: {
      value () {
        return this.data && this.data[this.config.name] || '';
      },
      isRequired () {
        return safe_eval(this.config.required, this.data || {});
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


defineComponent('furet-ui-form-field-common', {
  prototype: {
    props: ['resource', 'data', 'config'],
    computed: {
      value () {
        return this.data && this.data[this.config.name] || '';
      },
      isReadonly () {
        if (this.resource.readonly) return true;
        const readonlyParams = safe_eval(this.config.readonly, this.data || {});
        if (this.config.writable) {
          const writableParams = safe_eval(this.config.writable, this.data || {});
          return readonlyParams && ! writableParams
        }
        return readonlyParams;
      },
    },
    methods: {
      updateValue: debounce(function(value) {
        const action = {
          model: this.resource.model,
          pk: this.resource.pks,
          uuid: this.resource.uuid,
          fieldname: this.config.name,
          value,
        }
        this.$store.commit('UPDATE_CHANGE', action)
      }, 200),
    },
  }
});