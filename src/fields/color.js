/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import {FormMixin, ThumbnailMixin, ListMixin} from './common';

export const FieldListColor = Vue.component('furet-ui-list-field-color', {
    mixins: [ListMixin],
    template: `
        <span v-if="isInvisible" />
        <b-input 
            v-else-if="value"
            type="color"
            v-bind:value="value" 
            disabled
        />
        <span v-else />`,
})

export const FieldThumbnailColor = Vue.component('furet-ui-thumbnail-field-color', {
    mixins: [ThumbnailMixin],
    template: `
        <div v-if="this.isInvisible" />
        <b-tooltip 
            v-else
            v-bind:label="getTooltip" 
            v-bind:position="tooltipPosition"
            v-bind:style="{'width': '100%'}"
        >
            <b-field 
                v-bind:label="this.label"
                v-bind:style="{'width': 'inherit'}"
            >
                <b-input 
                    v-if="value"
                    type="color"
                    v-bind:value="value" 
                    disabled
                />
            </b-field>
        </b-tooltip>`,
})

export const FieldFormColor = Vue.component('furet-ui-form-field-color', {
    props: ['icon', 'placeholder'],
    mixins: [FormMixin],
    template: `
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
                <div 
                    class="field has-addons" 
                >
                    <p class="control is-expanded">
                        <b-input 
                            v-if="data || !isReadonly"
                            type="color"
                            v-bind:value="data" 
                            v-on:change="updateValue"
                            v-bind:disabled="isReadonly"
                        >
                        </b-input>
                    </p>
                    <p class="control is-expanded">
                        <b-input 
                            v-if="!isReadonly"
                            v-bind:value="data" 
                            v-on:change="updateValue"
                            v-bind:placeholder="placeholder"
                            icon-pack="fa"
                            v-bind:icon="icon"
                            pattern="#[A-Fa-f1-9]{6}"
                        />
                    </p>
                </div>
            </b-field>
        </b-tooltip>`,
})
