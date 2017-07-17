/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import {FormMixin, ThumbnailMixin, ListMixin} from './common';
import _ from 'underscore';

export const FieldListSelection = Vue.component('furet-ui-list-field-selection', {
    mixins: [ListMixin],
    template: `
        <span v-if="isInvisible" />
        <span v-else>{{value}}</span>`,
    computed: {
        value () {
            const selections = this.header.selections || {};
            const value = this.row[this.header.name] || '';
            if (selections[value] == undefined) return ' --- ';
            return selections[value];
        },
    },
})

export const FieldThumbnailSelection = Vue.component('furet-ui-thumbnail-field-selection', {
    props: ['selections'],
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
                <span> {{value}} </span>
            </b-field>
        </b-tooltip>`,
    computed: {
        value () {
            const selections = this.selections || {};
            const value = this.data && this.data[this.name] || '';
            if (selections[value] == undefined) return ' --- ';
            return selections[value];
        },
    },
})

export const FieldFormSelection = Vue.component('furet-ui-form-field-selection', {
    props: ['placeholder', 'icon', 'selections'],
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
                <span v-if="isReadonly"> {{value}} </span>
                <b-select 
                    v-else 
                    v-bind:placeholder="placeholder"
                    icon-pack="fa"
                    v-bind:icon="icon"
                    v-model="data"
                    expanded
                    v-on:change="updateValue"
                >
                    <option 
                        v-for="option in getSelections"
                        v-bind:key="option.value"
                        v-bind:value="option.value"
                    >
                        {{ option.label }}
                    </option>
                </b-select>
            </b-field>
        </b-tooltip>`,
    computed: {
        value () {
            const selections = this.selections || {};
            const value = this.config && this.config.data && this.config.data[this.name] || '';
            if (selections[value] == undefined) return ' --- ';
            return selections[value];
        },
        getSelections () {
            return _.map(this.selections, (label, value) => ({value, label}));
        },
    },
})
