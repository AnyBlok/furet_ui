// /**
// This file is a part of the FuretUI project
// 
//    Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>
// 
// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file,You can
// obtain one at http://mozilla.org/MPL/2.0/.
// **/
// import _ from 'underscore';
import {defineComponent} from '../factory'
import {fields} from './fields';
import { listTemplate } from './common';


defineComponent('furet-ui-list-field-boolean', {
  template: `
    <div>
      <span v-if="isHidden" />
      <b-checkbox 
        v-else
        v-model="checked"
        disabled
      />
    </div>`,
  extend: ['furet-ui-list-field-common'],
  prototype: {
    computed: {
      checked () {
        return eval(this.value) ? true : false;
      },
    },
  },
})
fields.list.boolean = 'furet-ui-list-field-boolean'


defineComponent('furet-ui-list-field-yesno', {
  template: listTemplate,
  extend: ['furet-ui-list-field-common'],
  prototype: {
    computed: {
      value () {
        const base = 'components.fields.yesno'
        return this.$t(eval(this.data[this.config.name] || '') ? `${base}.yes` : `${base}.no`);
      },
    },
  },
})
fields.list.yesno = 'furet-ui-list-field-yesno'

//export const FieldThumbnailBoolean = Vue.component('furet-ui-thumbnail-field-boolean', {
//    mixins: [ThumbnailMixin],
//    template: `
//        <div v-if="this.isHidden" />
//        <b-tooltip 
//            v-bind:label="getTooltip" 
//            v-bind:position="tooltipPosition"
//            v-else
//        >
//            <b-checkbox 
//                v-model="value" 
//                disabled
//            >
//                {{this.label}}
//            </b-checkbox>
//        </b-tooltip>`,
//    computed: {
//        value () {
//            return eval(this.data[this.name]) ? true : false;
//        },
//    }
//})


defineComponent('furet-ui-form-field-boolean', {
  template: `
    <furet-ui-form-field-common-tooltip
      v-bind:data="data"
      v-bind:config="config"
    >
      <b-checkbox 
        v-model="checked" 
        v-bind:disabled="isReadonly"
      >
        {{ $t(config.label) }}
      </b-checkbox>
    </furet-ui-form-field-common-tooltip>`,
  extend: ['furet-ui-form-field-common'],
  prototype: {
    computed: {
      checked: {
        get () {
          return eval(this.value) ? true : false;
        },
        set (value) {
          this.updateValue (value);
        },
      },
    },
  },
})
fields.form.boolean = 'furet-ui-form-field-boolean'
