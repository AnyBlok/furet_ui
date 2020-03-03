/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
// import _ from 'underscore';
import axios from 'axios';
import {defineComponent} from '../../factory'
import {fields} from '../fields';


defineComponent('furet-ui-list-field-many2one', {
  template: `
    <div>
      <span v-if="isInvisible" />
      <a v-else v-on:click.stop="onClick">{{$t(value)}}</a>
    </div>`,
  extend: ['furet-ui-list-field-common', 'furet-ui-list-field-relationship'],
    prototype: {
      computed: {
        value () {
          const value = this.data[this.config.name] || '';
          const model = this.config.model; 
          return this.format(this.config.display, this.$store.getters.get_entry(model, value));
        }
      },
      methods: {
        onClick () {
          this.addInBreadscrumb();
        },
      },
    },
})
fields.list.many2one = 'furet-ui-list-field-many2one'


// export const FieldThumbnailMany2One = Vue.component('furet-ui-thumbnail-field-many2one', {
//     props: ['model', 'spaceId', 'menuId', 'actionId', 'mode', 'display'],
//     mixins: [ThumbnailMixin, RelationShip],
//     template: `
//         <div v-if="isInvisible" />
//         <b-tooltip 
//             v-bind:label="getTooltip" 
//             v-bind:position="tooltipPosition"
//             v-else
//         >
//             <b-field 
//                 v-bind:label="this.label"
//                 v-bind:style="{'width': 'inherit'}"
//             >
//                 <a v-on:click.stop="onClick">{{value}}</a>
//             </b-field>
//         </b-tooltip>`,
//     computed: {
//         value () {
//             const value = this.data && this.data[this.name] || '';
//             return this.format(this.display, getRemoteValue(this.$store.state.data, this.model, value));
//         }
//     },
//     methods: {
//         onClick () {
//             this.addInBreadscrumb({
//                 spaceId: this.spaceId,
//                 menuId: this.menuId,
//                 actionId: this.actionId,
//                 dataId: this.data && this.data[this.name],
//                 mode: this.mode,
//             });
//         },
//     },
// })
// 
defineComponent('furet-ui-form-field-many2one', {
  template: `
    <div v-if="this.isInvisible" />
    <b-tooltip 
      v-bind:label="getTooltip" 
      v-bind:position="tooltipPosition"
      v-bind:style="{'width': '100%'}"
      v-else
    >
      <b-field 
        v-bind:label="$t(config.label)"
        v-bind:type="getType"
        v-bind:message="getMessage"
        v-bind:style="{'width': 'inherit'}"
      >
        <a v-if="isReadonly" v-on:click.stop="onClick">{{value}}</a>
        <div 
          v-else
          class="field has-addons" 
        >
          <p class="control is-expanded">
            <b-autocomplete
              v-bind:value="value"
              v-bind:data="choices"
              field="label"
              v-bind:placeholder="config.placeholder"
              icon-pack="fa"
              v-bind:icon="config.icon"
              v-on:typing="onChange"
              v-on:select="onSelect"
            />
          </p>
          <p class="control" v-if="value">
            <a v-on:click.stop="onClick" class="button">
              <b-icon icon="external-link-alt" />
            </a>
          </p>
        </div>
      </b-field>
    </b-tooltip>
  `,
  extend: ['furet-ui-form-field-common', 'furet-ui-list-field-relationship'],
  prototype: {
    data () {
        return {
            pks: [],
        };
    },
    computed: {
      value () {
        const value = this.data[this.config.name] || '';
        const model = this.config.model; 
        return this.format(this.config.display, this.$store.getters.get_entry(model, value));
      },
      choices () {
        const res = [];
        this.pks.forEach(pk => {
          res.push({
              pk,
              label: this.format(this.config.display, this.$store.getters.get_entry(this.config.model, pk)),
          })
        });
        return res
      },
    },
    methods: {
      onClick () {
        // add breadscrumb
      },
      onSelect (value) {
        this.updateValue(value.pk)
      },
      onChange (value) {
        const params = {
          model: this.config.model,
          fields: this.config.fields.toString(),
          limit: this.config.limit,
        }
        this.config.filter_by.forEach(filter => {
          params[`filter[${filter}][ilike]`] = value
        })
        axios.get('/furet-ui/crud', { params })
          .then((response) => {
            this.$dispatchAll(response.data.data);
            this.pks = response.data.pks
            this.loading = false;
          })
      },
    },
  },
})
fields.form.many2one = 'furet-ui-form-field-many2one'
