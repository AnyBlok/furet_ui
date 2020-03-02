/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import {defineComponent} from '../factory'
import {fields} from './fields';
import { listTemplate } from './common';


defineComponent('furet-ui-list-field-string', {
  template: listTemplate,
  extend: ['furet-ui-list-field-common'],
})
fields.list.string = 'furet-ui-list-field-string'

// export const FieldThumbnailString = Vue.component('furet-ui-thumbnail-field-string', {
//     mixins: [ThumbnailMixin],
// })
// 

defineComponent('furet-ui-form-field-string', {
  template: `
    <div v-if="this.isInvisible" />
    <b-tooltip 
        v-bind:label="getTooltip" 
        v-bind:position="tooltipPosition"
        v-bind:style="{'width': '100%'}"
        v-else
    >
        <b-field 
            v-bind:label="config.label"
            v-bind:type="getType"
            v-bind:message="getMessage"
            v-bind:style="{'width': 'inherit'}"
        >
            <span v-if="isReadonly"> {{value}} </span>
            <b-input 
                v-else 
                v-bind:value="value" 
                v-on:change="updateValue"
                v-bind:maxlength="config.maxlength"
                v-bind:placeholder="config.placeholder"
                icon-pack="fa"
                v-bind:icon="config.icon"
            >
            </b-input>
        </b-field>
    </b-tooltip>
  `,
  extend: ['furet-ui-form-field-common'],
})
fields.form.string = 'furet-ui-form-field-string'
