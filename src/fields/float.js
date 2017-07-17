/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import {FormMixin, ThumbnailMixin, ListMixin} from './common';


const round = (value, step) => {
    if (value != undefined) {
        return Math.round(eval(value) / eval(step || 0.01)) * eval(step || 0.01);
    }
    return '';
}


export const FieldListFloat = Vue.component('furet-ui-list-field-float', {
    mixins: [ListMixin],
    template: `
        <span v-if="isInvisible" />
        <span v-else>{{value}}</span>`,
    computed: {
        value () {
            return round(this.row[this.header.name], this.header.step);
        },
    }
})


export const FieldThumbnailFloat = Vue.component('furet-ui-thumbnail-field-float', {
    mixins: [ThumbnailMixin],
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
                v-bind:style="{'width': 'inherit'}"
            >
                <span> {{value}} </span>
            </b-field>
        </b-tooltip>`,
    computed: {
        value () {
            return round(this.data[this.name], this.step);
        },
    }
})

export const FieldFormFloat = Vue.component('furet-ui-form-field-float', {
    props: ['icon', 'placeholder', 'step', 'min', 'max'],
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
                <span v-if="isReadonly"> {{data}} </span>
                <b-input 
                    v-else 
                    type="number"
                    v-bind:step="getStep"
                    v-bind:value="data" 
                    v-on:change="updateValue"
                    v-bind:placeholder="placeholder"
                    icon-pack="fa"
                    v-bind:icon="icon"
                    v-bind:min="min"
                    v-bind:max="max"
                >
                </b-input>
            </b-field>
        </b-tooltip>`,
    computed: {
        getStep () {
            return this.step || '0.01';
        },
        data () {
            const value = this.config.data && this.config.data[this.name] || '';
            return round(value, this.step);
        },
    },
})
