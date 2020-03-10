/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
// import {json_post_dispatch_all} from '../../server-call';
// import _ from 'underscore';
import {defineComponent} from '../../factory'
import {safe_eval} from '../common'


defineComponent('furet-ui-list-field-relationship', {
  prototype: {
    methods: {
     format (condition, fields) {
       fields
       return eval(condition);
     },
     getStyle(value) {
       if (this.config.color !== undefined) {
         const data =  this.$store.getters.get_entry(this.config.model, value);
         return safe_eval(this.config.color, data);
       }
       return {}
     },
     // addInBreadscrumb (options) {
     //   addInBreadscrumb(this.$route, this.$store, options);
     // },
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
        v-bind:style="getStyle(value)"
      >
        <a 
          v-on:click.stop="onClick(value.pk)">{{value.label}}
        </a>
      </span>
    </div>
  </div>`

// export const addInBreadscrumb = (route, store, options) => {
//     const changes = Object.assign({}, store.state.data.changes);
//     const action = store.state.data.actions[String(route.params.actionId)];
//     store.commit('ADD_IN_BREADSCRUMB', {
//         path: route.path,
//         label: action.label,
//         changes,
//     });
//     const params = {
//         spaceId: options.spaceId || route.params.spaceId,
//         menuId: options.menuId,
//         dataId: options.dataId,
//         mode: options.mode || 'readonly',
//     }
//     json_post_dispatch_all('/action/' + options.actionId, params);
//     store.commit('CLEAR_CHANGE', {});
// };
// 
// export const RelationShipX2MList = {
//     computed: {
//         model () {
//             return this.header.model;
//         },
//         fieldcolor () {
//             return this.header.fieldcolor;
//         },
//     },
// 
// export const RelationShipX2MThumbnail = {
//     props: ['model', 'spaceId', 'menuId', 'actionId', 'mode', 'display', 'fieldcolor'],
//     template: `
//         <div v-if="this.isHidden" />
//         <b-tooltip 
//             v-bind:label="getTooltip" 
//             v-bind:position="tooltipPosition"
//             v-else
//         >
//             <b-field 
//                 v-bind:label="this.label"
//                 v-bind:style="{'width': 'inherit'}"
//             >
//                 <span 
//                     v-for="value in values"
//                     class="tag" 
//                     v-bind:style="getStyle(value.dataId)"
//                 >
//                     <a 
//                         v-on:click.stop="onClick(value.dataId)">{{value.label}}
//                     </a>
//                 </span>
//             </b-field>
//         </b-tooltip>`,
//     computed: {
//         values () {
//             const values = this.data && this.data[this.name] || '';
//             if (this.model) {
//                 let data = this.$store.state.data.data;
//                 if (data[this.model]) {
//                     data = data[this.model];
//                     return _.map(values, dataId => {
//                         return {dataId, label: this.format(this.display, data[String(dataId)])}
//                     })
//                 }
//             }
//             return [];
//         }
//     },
//     methods: {
//         onClick (dataId) {
//             this.addInBreadscrumb({
//                 spaceId: this.spaceId,
//                 menuId: this.menuId,
//                 actionId: this.actionId,
//                 dataId: dataId,
//                 mode: this.mode,
//             });
//         },
//     },
// }
// 
// export const RelationShipX2MForm = {
//     props: ['model', 'spaceId', 'menuId', 'actionId', 'mode', 'display', 'fieldcolor'],
//     computed: {
//         values () {
//             const values = this.config && this.config.data && this.config.data[this.name] || '';
//             if (this.model) {
//                 let data = this.$store.state.data.data;
//                 if (data[this.model]) {
//                     data = data[this.model];
//                     return _.map(values, dataId => {
//                         return {dataId, label: this.format(this.display, data[String(dataId)])}
//                     })
//                 }
//             }
//             return [];
//         }
//     },
//     methods: {
//         onClick (dataId) {
//             this.addInBreadscrumb({
//                 spaceId: this.spaceId,
//                 menuId: this.menuId,
//                 actionId: this.actionId,
//                 dataId: dataId,
//                 mode: this.mode,
//             });
//         },
//     },
// }
