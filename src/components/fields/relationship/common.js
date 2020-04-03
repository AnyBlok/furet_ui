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
  return  eval(style)
}


defineComponent('furet-ui-field-relationship', {
  prototype: {
    inject: ['getEntry', 'pushInBreadcrumb'],
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
      openResource (value) {
        const params = {code: this.$route.params.code, menuId: 0, id: 0}
        if (this.config.menu) params.menuId = this.config.menu;
        if (this.config.resource) {
          const query = {mode: 'form', pks: JSON.stringify(value)}
          params.id = this.config.resource;
          this.pushInBreadcrumb();
          this.$router.push({name: 'resource', params, query})
        }
      },
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
        <a v-on:click.stop="openResource(value)">{{value.label}}</a>
      </span>
    </div>
  </div>`
