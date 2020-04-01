/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
// import {json_post_dispatch_all} from '../../server-call';
// import _ from 'underscore';
import {defineComponent} from '../../factory';
import {pk2string} from '../../../store/modules/data';


const safe_eval = (style, fields) => {
  fields  // lint
  let res = {};
  try {
    res = eval(style)
  } catch (e) {
    console.warn(e)
  }
  return res;
}


defineComponent('furet-ui-list-field-relationship', {
  prototype: {
    inject: ['getEntry'],
    methods: {
      format (display, fields) {
        return safe_eval(display, fields);
      },
      getKey(value) {
        return pk2string(value.pk)
      },
      getStyle(value) {
        let style = '';
        if (this.config.style !== undefined) {
          const data =  this.getEntry(this.config.model, value.pk);
          style = safe_eval(this.config.style, data, {});
        }
        return style
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
        v-bind:key="getKey(value)"
        v-bind:style="getStyle(value)"
      >
        <a 
          v-on:click.stop="onClick(value.pk)">{{value.label}}
        </a>
      </span>
    </div>
  </div>`
