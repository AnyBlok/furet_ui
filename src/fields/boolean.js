// /**
// This file is a part of the FuretUI project
// 
//    Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>
// 
// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file,You can
// obtain one at http://mozilla.org/MPL/2.0/.
// **/
import Vue from 'vue';
import {FormMixin, ThumbnailMixin, ListMixin} from './common';
import _ from 'underscore';

export const FieldListBoolean = Vue.component('furet-ui-list-field-boolean', {
    mixins: [ListMixin],
    template: `
        <div>
            <span v-if="isInvisible" />
            <b-checkbox 
                v-else
                v-model="checked"
                disabled
            />
        </div>`,
    computed: {
        checked () {
            return eval(this.value) ? true : false;
        },
    }
})

export const FieldThumbnailBoolean = Vue.component('furet-ui-thumbnail-field-boolean', {
    mixins: [ThumbnailMixin],
    template: `
        <div v-if="this.isInvisible" />
        <b-tooltip 
            v-bind:label="getTooltip" 
            v-bind:position="tooltipPosition"
            v-else
        >
            <b-checkbox 
                v-model="value" 
                disabled
            >
                {{this.label}}
            </b-checkbox>
        </b-tooltip>`,
    computed: {
        value () {
            return eval(this.data[this.name]) ? true : false;
        },
    }
})

export const FieldFormBoolean = Vue.component('furet-ui-form-field-boolean', {
    mixins: [FormMixin],
    template: `
        <div v-if="this.isInvisible" />
        <b-tooltip 
            v-bind:label="getTooltip" 
            v-bind:position="tooltipPosition"
            v-else
        >
            <b-checkbox 
                v-model="data" 
                v-bind:disabled="isReadonly"
            >
                {{this.label}}
            </b-checkbox>
        </b-tooltip>`,
    computed: {
        data: {
            get () {
                const value = this.config && this.config.data && this.config.data[this.name] || '';
                return eval(value) ? true : false;
            },
            set (value) {
                this.updateValue (value);
            },
        },
    },
})
