/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import {FormMixin, ThumbnailMixin, ListMixin} from './common';


export const FieldListUrl = Vue.component('furet-ui-list-field-url', {
    mixins: [ListMixin],
    template: `
        <span v-if="isInvisible" />
        <a v-else v-bind:href="value">{{value}}</a>`,
})

export const FieldThumbnailUrl = Vue.component('furet-ui-thumbnail-field-url', {
    mixins: [ThumbnailMixin],
    template: `
        <div v-if="this.isInvisible" />
        <b-tooltip 
            v-bind:label="getTooltip" 
            v-bind:position="tooltipPosition"
            v-else
        >
            <b-field 
                v-bind:label="this.label"
                v-bind:style="{'width': 'inherit'}"
            >
                <a v-bind:href="value" v-on:click.stop="onClick">{{value}}</a>
            </b-field>
        </b-tooltip>`,
    computed: {
        onClick: () => {},
    },
})

export const FieldFormUrl = Vue.component('furet-ui-form-field-url', {
    props: ['maxlength', 'placeholder', 'icon'],
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
                <a v-if="isReadonly" v-bind:href="data">{{data}}</a>
                <div 
                    v-else
                    class="field has-addons" 
                >
                    <p class="control is-expanded">
                        <b-input 
                            type="url"
                            v-bind:value="data" 
                            v-on:change="updateValue"
                            v-bind:maxlength="maxlength"
                            v-bind:placeholder="placeholder"
                            icon-pack="fa"
                            v-bind:icon="icon"
                        />
                    </p>
                    <p class="control" v-if="data">
                        <a class="button" v-bind:href="data">
                            <i class="fa fa-external-link"></i>
                        </a>
                    </p>
                </div>
            </b-field>
        </b-tooltip>`,
})
