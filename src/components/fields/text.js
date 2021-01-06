/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import {FormMixin, ThumbnailMixin, ListMixin} from './common';

export const FieldListText = Vue.component('furet-ui-list-field-text', {
    mixins: [ListMixin],
})

export const FieldThumbnailText = Vue.component('furet-ui-thumbnail-field-text', {
    mixins: [ThumbnailMixin],
})

export const FieldFormText = Vue.component('furet-ui-form-field-text', {
    props: ['placeholder', 'maxlength'],
    mixins: [FormMixin],
    template: `
        <div>
            <div v-if="this.isInvisible" />
            <b-tooltip 
                v-bind:label="getTooltip" 
                v-bind:position="tooltipPosition"
                v-bind:style="{'width': '100%'}"
                v-else
            >
                <b-field 
                    v-bind:label="this.label"
                    v-bind:type="getType"
                    v-bind:message="getMessage"
                    v-bind:style="{'width': 'inherit'}"
                >
                    <span v-if="isReadonly"> {{data}} </span>
                    <b-input 
                        v-else 
                        type="textarea"
                        v-bind:value="data" 
                        v-on:change="updateValue"
                        v-bind:maxlength="maxlength"
                        v-bind:placeholder="placeholder"
                    >
                </b-input>
                </b-field>
            </b-tooltip>
        </div>`,
})
