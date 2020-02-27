/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import moment from 'moment';
import {defineComponent} from '../factory'
import {fields} from './fields';
import { listTemplate } from './common';
import {i18n} from '../../i18n';


defineComponent('furet-ui-list-field-datetime', {
  template: listTemplate,
  extend: ['furet-ui-list-field-common'],
  prototype: {
    computed: {
      value () {
        moment.locale(i18n.locale);
        const value = this.data[this.config.name];
        if (value) return moment(value).format('LLL');
        return '';
      },
    },
  },
})
fields.list.datetime = 'furet-ui-list-field-datetime'

// export const FieldThumbnailDateTime = Vue.component('furet-ui-thumbnail-field-datetime', {
//     mixins: [ThumbnailMixin],
//     computed: {
//         value () {
//             moment.locale(i18n.locale);
//             const value = this.data && this.data[this.name];
//             if (value) return moment(value).format('LLL');
//             return '';
//         },
//     }
// })
// 
// export const FieldFormDateTime = Vue.component('furet-ui-form-field-datetime', {
//     props: ['icon', 'min', 'max'],
//     mixins: [FormMixin],
//     template: `
//         <div v-if="this.isInvisible" />
//         <b-tooltip 
//             v-bind:label="getTooltip" 
//             v-bind:position="tooltipPosition"
//             v-bind:style="{'width': '100%'}"
//             v-else
//         >
//             <b-field 
//                 v-bind:label="this.label"
//                 v-bind:type="getType"
//                 v-bind:message="getMessage"
//                 v-bind:style="{'width': 'inherit'}"
//             >
//                 <span v-if="isReadonly"> {{value}} </span>
//                 <b-input 
//                     v-else 
//                     type="datetime-local"
//                     v-bind:value="data" 
//                     v-on:change="updateValue"
//                     icon-pack="fa"
//                     v-bind:icon="icon"
//                     v-bind:min="min"
//                     v-bind:max="max"
//                 >
//                 </b-input>
//             </b-field>
//         </b-tooltip>`,
//     computed: {
//         value () {
//             moment.locale(i18n.locale);
//             const value = this.config && this.config.data && this.config.data[this.name];
//             if (value) return moment(value).format('LLL');
//             return '';
//         },
//         data () {
//             const value = this.config && this.config.data && this.config.data[this.name];
//             if (value) {
//                 const date = new Date(Date.parse(value)).toISOString();
//                 return date.replace(/\.[0-9]{3}/, '').replace(/Z/, '');
//             }
//             return '';
//         }
//     }
// })
