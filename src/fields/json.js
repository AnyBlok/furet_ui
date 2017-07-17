/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import {FormMixin, ThumbnailMixin, ListMixin} from './common';

const format = (value) => {
    if (value)
        try {
            return JSON.stringify(JSON.parse(value), null, 2);
        } catch (e) {};
    return value;
}


export const FieldListJson = Vue.component('furet-ui-list-field-json', {
    mixins: [ListMixin],
    template: `
        <span v-if="isInvisible" />
        <pre 
            v-else
            v-bind:style="{width: '100%', padding: 2, backgroundColor: 'white'}"
        >{{value}}</pre>`,
    computed: {
        value () {
            return format(this.row[this.header.name] || '');
        },
    }
})

export const FieldThumbnailJson = Vue.component('furet-ui-thumbnail-field-json', {
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
                <pre
                    v-bind:style="{width: '100%', padding: 2, backgroundColor: 'white'}"
                >{{value}}</pre>
            </b-field>
        </b-tooltip>`,
    computed: {
        value () {
            return format(this.data && this.data[this.name] || '');
        },
    }
})

export const FieldFormJson = Vue.component('furet-ui-form-field-json', {
    props: ['placeholder'],
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
                <pre v-if="isReadonly"
                    v-bind:style="{width: '100%', padding: 2, backgroundColor: 'white'}"
                >{{data}}</pre>
                <textarea 
                    v-else 
                    class="textarea"
                    v-bind:value="data" 
                    v-on:change="updateValue"
                    v-bind:placeholder="placeholder"
                    v-bind:rows="getNbRow"
                    v-bind:style="{width: '100%', height: '100%', resize: 'none'}"
                />
            </b-field>
        </b-tooltip>`,
    computed: {
        data () {
            return format(this.config && this.config.data && this.config.data[this.name] || '');
        },
        getNbRow () {
            const value = this.config && this.config.data && this.config.data[this.name] || '';
            return value.split('\n').length;
        },
        isJsonInvalid () {
            if (!this.isReadonly) {
                const value = this.config && this.config.data && this.config.data[this.name] || '';
                try {
                    JSON.parse(value)
                } catch (e) {
                    return true;
                }
            }
            return false;
        },
        getType () {
            if (this.isRequired) {
                if (this.data) {
                    if (this.isJsonInvalid) return 'is-danger';
                    return 'is-info';
                }
                return 'is-danger';
            }
            if (this.isJsonInvalid) return 'is-danger';
            return '';
        },
        getMessage () {
            if (this.isRequired) {
                if (!this.data) {
                    if (this.isJsonInvalid) return this.$i18n.t('fields.json.invalid');
                    return this.$i18n.t('fields.common.required');
                }
            }
            if (this.isJsonInvalid) return this.$i18n.t('fields.json.invalid');
            return ''
        },
    },
    methods: {
        updateValue (e) {
            this.$store.commit(this.config.store_key, {
                model: this.config.view.model,
                dataId: this.config.dataId,
                fieldname: this.name,
                value: e.target.value,
            })
        }
    },
})
