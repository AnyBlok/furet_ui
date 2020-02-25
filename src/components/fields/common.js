/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
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
    <span v-if="isInvisible" />
    <span v-else>{{value}}</span>
  </div>
`


defineComponent('furet-ui-list-field-common', {
  prototype: {
    props: ['data', 'config'],
    computed: {
      value () {
        return this.data[this.config.name] || '';
      },
      isInvisible () {
        return safe_eval(this.config.invisible, this.data || {});
      },
    },
  }
});


defineComponent('furet-ui-thumbnail-field-common', {
  template: `
    <div v-if="this.isInvisible" />
    <b-tooltip 
        v-bind:label="getTooltip" 
        v-bind:position="tooltipPosition"
        v-bind:style="{'width': '100%'}"
        v-else
    >
        <b-field 
            v-bind:label="this.config.label"
            v-bind:style="{'width': 'inherit'}"
        >
            <span>{{value}}</span>
        </b-field>
    </b-tooltip>
  `,
  prototype: {
    props: ['data', 'config'],
    computed: {
      value () {
        return this.data && this.data[this.config.name] || '';
      },
      isInvisible () {
        return safe_eval(this.config.invisible, this.data || {});
      },
      getTooltip () {
          return this.config.tooltip || '';
      },
      tooltipPosition () {
          return this.config.tooltip_position || 'is-top';
      },
    },
  }
});


defineComponent('furet-ui-form-field-common', {
  prototype: {
    props: ['data', 'config'],
    computed: {
      value () {
        return this.data && this.data[this.config.name] || '';
      },
      isReadonly () {
        const readonlyParams = safe_eval(this.config.readonly, this.data || {});
        const readonly = this.config.mode == 'readonly';
        return readonly || readonlyParams;
      },
      isRequired () {
        return safe_eval(this.config.required, this.data || {});
      },
      isInvisible () {
        return safe_eval(this.config.invisible, this.data || {});
      },
      getTooltip () {
          return this.config.tooltip || '';
      },
      tooltipPosition () {
          return this.config.tooltip_position || 'is-top';
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
      // methods: {
      //   updateValue (value, fieldname) {
      //       this.$store.commit(this.config.store_key, {
      //           model: this.config.view.model,
      //           dataId: this.config.dataId,
      //           fieldname: fieldname || this.name,
      //           value
      //       })
      //   }
      // },
    },
  }
});
