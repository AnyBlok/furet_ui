/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import {FormMixin, ThumbnailMixin, ListMixin} from './common';
import {i18n} from '../i18n';
import moment from 'moment';


export const FieldListDate = Vue.component('furet-ui-list-field-date', {
    mixins: [ListMixin],
    template: `
        <span v-if="isInvisible" />
        <span v-else>{{value}}</span>`,
    computed: {
        value () {
            moment.locale(i18n.locale);
            const value = this.row[this.header.name];
            if (value) return moment(value).format('LL');
            return '';
        },
    }
})

export const FieldThumbnailDate = Vue.component('furet-ui-thumbnail-field-date', {
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
            moment.locale(i18n.locale);
            const value = this.data && this.data[this.name];
            if (value) return moment(value).format('LL');
            return '';
        },
    }
})

export const FieldFormDate = Vue.component('furet-ui-form-field-date', {
    props: ['icon', 'min', 'max'],
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
                <b-input 
                    v-else 
                    type="date"
                    v-bind:value="data" 
                    v-on:change="updateValue"
                    v-bind:icon="icon"
                    v-bind:min="min"
                    v-bind:max="max"
                >
                </b-input>
            </b-field>
        </b-tooltip>`,
    computed: {
        value () {
            moment.locale(i18n.locale);
            const value = this.config && this.config.data && this.config.data[this.name];
            if (value) return moment(value).format('LL');
            return '';
        },
        data () {
            const value = this.config && this.config.data && this.config.data[this.name];
            if (value) {
                const date = new Date(Date.parse(value)).toISOString();
                return date.split('T')[0];
            }
            return '';
        }
    }
})
