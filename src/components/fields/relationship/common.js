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
    inject: ['getEntry'],
    methods: {
     format (condition, fields) {
       fields
       return eval(condition);
     },
     getStyle(value) {
       if (this.config.color !== undefined) {
         const data =  this.getEntry(this.config.model, value);
         return safe_eval(this.config.color, data, {});
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
