/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import {defineComponent} from '../../factory'
import {fields} from '../fields';
import {RelationShipX2MList} from './common';


defineComponent('furet-ui-list-field-one2many', {
  template: RelationShipX2MList,
  extend: ['furet-ui-list-field-common', 'furet-ui-list-field-relationship'],
  prototype: {
    computed: {
      values () {
        const res = [];
        const display = this.config.display;
        const model = this.config.model;
        this.value.forEach(pk => {
          res.push({
            pk,
            label: this.format(display, this.$store.getters.get_entry(model, pk)),
          });
        });
        return res;
      },
    },
    methods: {
      onClick () {
        this.addInBreadscrumb();
      },
    },
  },
})
fields.list.one2many = 'furet-ui-list-field-one2many'

// export const FieldThumbnailOne2Many = Vue.component('furet-ui-thumbnail-field-one2many', {
//     mixins: [ThumbnailMixin, RelationShip, RelationShipX2MThumbnail],
// })


defineComponent('furet-ui-form-field-one2many', {
  template: `
    <furet-ui-form-field-common-tooltip
      v-bind:resource="resource"
      v-bind:data="data"
      v-bind:config="config"
    >
      <furet-ui-form-field-resource-manager
        v-bind:id="config.resource"
        v-bind:value="value"
      />
    </furet-ui-form-field-common-tooltip>
  `,
  extend: ['furet-ui-list-field-common', 'furet-ui-list-field-relationship'],
  prototype: {
    computed: {
    },
    methods: {
    },
  },
})
fields.form.one2many = 'furet-ui-form-field-one2many'
// 
// export const FieldFormOne2Many = Vue.component('furet-ui-form-field-one2many', {
//     mixins: [FormMixin, RelationShip],
//     props: ['model', 'views', 'x2oField'],
//     template: `
//         <div v-if="this.isInvisible" />
//         <b-tooltip 
//             v-bind:label="getTooltip" 
//             v-bind:position="tooltipPosition"
//             v-bind:style="{'width': '100%'}"
//             v-else
//         >
//             <b-field 
//                 v-bind:label="label"
//                 v-bind:type="getType"
//                 v-bind:message="getMessage"
//                 v-bind:style="{'width': 'inherit'}"
//             >
//                 <div v-bind:style="{backgroundColor: '#f5f5f5', padding: '5px'}">
//                     <furet-ui-x2m-view 
//                         v-bind:model="model"
//                         v-bind:views="views"
//                         v-bind:viewId="viewId"
//                         v-bind:dataIds="dataIds"
//                         v-bind:dataId="dataId"
//                         v-bind:isReadonly="isReadonly"
//                         v-bind:x2oField="x2oField"
//                         v-bind:x2oFieldId="config.dataId"
//                         v-on:changeView="changeView"
//                         v-on:updateDataIds="updateDataIds"
//                     />
//                 </div>
//             </b-field>
//         </b-tooltip>`,
//     data () {
//         return {
//             viewId: this.views && this.views[0] && this.views[0].viewId,
//             dataId: null,
//         }
//     },
//     created () {
//         json_post_dispatch_all('/field/x2m/get/views', {viewIds: _.map(this.views, v => v.viewId)});
//     },
//     computed: {
//         dataIds () {
//             return this.config && this.config.data && this.config.data[this.name] || [];
//         },
//         view () {
//             return this.$store.state.data.view[this.viewId];
//         },
//     },
//     methods: {
//         changeView (viewId, dataId) {
//             this.viewId = viewId;
//             this.dataId = dataId;
//         },
//         updateDataIds (dataIds) {
//             this.updateValue(dataIds)
//         },
//     },
// })
